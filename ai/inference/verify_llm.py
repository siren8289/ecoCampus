from fastapi.testclient import TestClient
from ai.inference.api import app
import datetime

client = TestClient(app)

def test_inference_endpoint():
    # Payload
    payload = {
        "building_id": "test_bldg_llm",
        "current_load": 0.5, # Normal but maybe "active"
        "temperature": 25.0,
        "timestamp": "2025-06-01T14:00:00"
    }
    
    print("Sending request to /ai/infer...")
    response = client.post("/ai/infer", json=payload)
    
    if response.status_code == 200:
        data = response.json()
        print("Success!")
        print(f"Status: {data['presence_status']} / {data['usage_status']}")
        print(f"Value: {data['value_zone']} ({data['value_score']})")
        print(f"Explanation: {data['explanation']}")
    else:
        print(f"Failed: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_inference_endpoint()
