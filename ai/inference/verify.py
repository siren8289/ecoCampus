from ai.inference.api import predict, InferenceRequest
import datetime

# Test Case 1: Weekend, Low Load -> Empty/Idle
req1 = InferenceRequest(
    building_id="test_bldg",
    current_load=0.05,
    temperature=10.0,
    timestamp=datetime.datetime(2025, 1, 1, 10, 0, 0) # Wednesday, but using low load
)

# Test Case 2: Weekday Day, High Load -> Occupied/Active
req2 = InferenceRequest(
    building_id="test_bldg",
    current_load=0.6,
    temperature=20.0,
    timestamp=datetime.datetime(2025, 1, 2, 14, 0, 0) # Thursday 2PM
)

# Test Case 3: Empty but High Load -> Overuse / High Value
req3 = InferenceRequest(
    building_id="test_bldg",
    current_load=0.5, # High for night
    temperature=15.0,
    timestamp=datetime.datetime(2025, 1, 2, 3, 0, 0) # Thursday 3AM
)

print(f"Test 1 (Low Load): {predict(req1)}")
print(f"Test 2 (Normal): {predict(req2)}")
print(f"Test 3 (Overuse): {predict(req3)}")
