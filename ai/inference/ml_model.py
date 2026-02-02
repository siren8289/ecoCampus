import random

class StatusClassifier:
    def __init__(self):
        # In a real scenario, we would load a trained model (e.g., sklearn, joblib)
        pass

    def predict(self, current_load, time_of_day, is_weekend):
        """
        Predicts occupancy and usage status based on load and time.
        
        Args:
            current_load (float): Normalized load (0-1) or actual kWh
            time_of_day (int): Hour 0-23
            is_weekend (bool): True if weekend
            
        Returns:
            dict: { 'presence_status': str, 'usage_status': str }
        """
        
        # Heuristic Logic (Simulating ML inference)
        
        # 1. Presence Logic
        if is_weekend:
             # Weekends: Occupied only if load is significantly high
            occupancy_threshold = 0.4
        elif 8 <= time_of_day <= 20: 
            # Weekdays business hours: Likely occupied
            occupancy_threshold = 0.2
        else:
            # Weekdays night: Low threshold
            occupancy_threshold = 0.3
            
        is_occupied = current_load > occupancy_threshold
        presence_status = "Occupied" if is_occupied else "Empty"
        
        # 2. Usage Status Logic
        # Active: Normal usage range
        # Idle: Very low usage
        # Overuse: Abnormally high for the context
        
        if current_load < 0.1:
            usage_status = "Idle"
        elif current_load > 0.8:
            usage_status = "Overuse"
        else:
            usage_status = "Active"
            
        # Refine Overuse: If Empty but load is high -> Overuse (Waste)
        if presence_status == "Empty" and current_load > 0.3:
            usage_status = "Overuse"
            
        return {
            "presence_status": presence_status,
            "usage_status": usage_status
        }
