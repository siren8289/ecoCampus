import pandas as pd
import numpy as np
import datetime
import calendar
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import argparse

# Load environment variables
load_dotenv()

# Configuration
DB_URL = os.getenv("DATABASE_URL", "postgresql://localhost:5432/ecocampus") # Default or from env
DATA_FILE = "ai/data/국토교통부_건물:전기에너지.csv"

def get_season(month):
    if 3 <= month <= 5:
        return 'Spring'
    elif 6 <= month <= 8:
        return 'Summer'
    elif 9 <= month <= 11:
        return 'Fall'
    else:
        return 'Winter'

def get_semester(month):
    # March-June, Sept-Dec = Term
    # July-Aug, Jan-Feb = Vacation
    if month in [3, 4, 5, 6, 9, 10, 11, 12]:
        return 'Term'
    else:
        return 'Vacation'

def generate_hourly_profile(day_type):
    # Simple heuristic profile (0-23 hours)
    # Weekday: Low at night, ramp up 7-9, peak 14-16, down 18-22
    # Weekend: Lower overall, flatter peak
    
    hours = np.arange(24)
    if day_type == 'Weekday':
        # Gaussian-ish peak around 14:00 (2pm)
        profile = 0.2 + 0.8 * np.exp(-(hours - 14)**2 / (2 * 4**2))
    else: # Weekend
        profile = 0.2 + 0.4 * np.exp(-(hours - 14)**2 / (2 * 5**2))
    
    return profile

def process_data(csv_path, dry_run=False):
    print(f"Loading data from {csv_path}...")
    try:
        df = pd.read_csv(csv_path)
    except FileNotFoundError:
        print(f"Error: File {csv_path} not found.")
        return

    # Expected columns based on header inspection:
    # 도로명대지위치 (Address/Building), 사용년월 (YYYYMM), 사용량(KWh)
    
    # Map columns if necessary (handling potential whitespace/encoding issues)
    # Based on `head` output: "도로명대지위치", "사용년월", "사용량(KWh)"
    
    # Rename for easier access
    df.rename(columns={
        '도로명대지위치': 'building_id',
        '사용년월': 'usage_ym',
        '사용량(KWh)': 'usage_kwh'
    }, inplace=True)

    result_rows = []

    print("Generating baseline patterns...")
    
    for _, row in df.iterrows():
        building_id = row['building_id']
        usage_ym = str(row['usage_ym']) # 202501
        usage_kwh = row['usage_kwh']
        
        if pd.isna(usage_ym) or str(usage_ym).strip() == '':
            continue

        year = int(usage_ym[:4])
        month = int(usage_ym[4:6])
        
        # Determine days in month
        _, num_days = calendar.monthrange(year, month)
        
        # Monthly total -> split into hourly slots
        # We need a distribution strategy. 
        # Strategy: 
        # 1. Generate all hours for the month.
        # 2. Assign DayType, Season, Semester.
        # 3. Assign Base Weight based on DayType/Hour.
        # 4. Normalize weights so sum matches Monthly Usage.
        
        month_slots = []
        total_weight = 0
        
        for day in range(1, num_days + 1):
            date_obj = datetime.date(year, month, day)
            day_of_week = date_obj.weekday() # 0=Mon, 6=Sun
            
            day_type = 'Weekend' if day_of_week >= 5 else 'Weekday'
            season = get_season(month)
            semester = get_semester(month)
            
            daily_profile = generate_hourly_profile(day_type)
            
            for hour in range(24):
                slot_timestamp = datetime.datetime(year, month, day, hour, 0, 0)
                weight = daily_profile[hour]
                
                # Temperature correction heuristic (very rough)
                # Summer/Winter needs more HVAC
                hvac_factor = 1.0
                if season == 'Summer' and 10 <= hour <= 18:
                    hvac_factor = 1.3
                elif season == 'Winter' and 8 <= hour <= 20: 
                    hvac_factor = 1.2
                
                final_weight = weight * hvac_factor
                total_weight += final_weight
                
                month_slots.append({
                    'time_slot': slot_timestamp,
                    'building_id': building_id,
                    'day_type': day_type,
                    'season': season,
                    'semester': semester,
                    'weight': final_weight
                })
        
        # Normalize and calculate expected load
        factor = usage_kwh / total_weight if total_weight > 0 else 0
        
        for slot in month_slots:
            expected_load = slot['weight'] * factor
            # Normalized load: just the raw usage relative to max possible? 
            # Or simplified 0-1 based on the profile?
            # Let's use the profile value as normalized_load for now (0-1 scale approx)
            normalized_val = slot['weight'] # This is arbitrary unit.
            
            # Re-normalize to 0-1 for the "system" capacity? 
            # Or just store the calculated load.
            
            result_rows.append({
                'time_slot': slot['time_slot'],
                'building_id': slot['building_id'],
                'building_type': 'University', # Default for this dataset
                'day_type': slot['day_type'],
                'season': slot['season'],
                'semester': slot['semester'],
                'expected_load': round(expected_load, 2),
                'normalized_load': round(slot['weight'], 4) # Keeping weight as 'shape'
            })
            
    result_df = pd.DataFrame(result_rows)
    
    print(f"Generated {len(result_df)} hourly slots.")
    
    if dry_run:
        print("Dry Run: Displaying top 10 rows:")
        print(result_df.head(10))
    else:
        print(f"Saving to Database ({DB_URL})...")
        engine = create_engine(DB_URL)
        result_df.to_sql('baseline_energy_pattern', engine, if_exists='append', index=False)
        print("Done.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="Print output instead of saving to DB")
    args = parser.parse_args()
    
    process_data(DATA_FILE, dry_run=args.dry_run)
