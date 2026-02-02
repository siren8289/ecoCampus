CREATE TABLE IF NOT EXISTS baseline_energy_pattern (
    id SERIAL PRIMARY KEY,
    time_slot TIMESTAMP NOT NULL,
    building_id VARCHAR(255),
    building_type VARCHAR(50),  -- e.g. 'University', 'Office', etc.
    day_type VARCHAR(20),       -- 'Weekday', 'Weekend'
    season VARCHAR(20),         -- 'Spring', 'Summer', 'Fall', 'Winter'
    semester VARCHAR(20),       -- 'Term', 'Vacation'
    expected_load NUMERIC(10, 2),
    normalized_load NUMERIC(5, 4), -- 0.0 to 1.0 (or slightly higher if peak)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_baseline_time_slot ON baseline_energy_pattern(time_slot);
CREATE INDEX idx_baseline_building_id ON baseline_energy_pattern(building_id);
