from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .ml_model import StatusClassifier
from .dl_model import ValueJudgmentModel
import datetime
import datetime

app = FastAPI(title="EcoCampus AI Inference API")

# Initialize models
ml_model = StatusClassifier()
dl_model = ValueJudgmentModel()

class InferenceRequest(BaseModel):
    building_id: str
    current_load: float # Normalized 0-1 or raw
    temperature: float
    timestamp: datetime.datetime
    
class InferenceResponse(BaseModel):
    building_id: str
    timestamp: datetime.datetime
    presence_status: str
    usage_status: str
    value_zone: str
    value_score: float

@app.post("/predict", response_model=InferenceResponse)
def predict(req: InferenceRequest):
    # 1. Feature Engineering
    time_of_day = req.timestamp.hour
    day_of_week = req.timestamp.weekday()
    is_weekend = day_of_week >= 5
    
    # 2. ML Inference (Status)
    ml_result = ml_model.predict(
        current_load=req.current_load,
        time_of_day=time_of_day,
        is_weekend=is_weekend
    )
    
    # 3. DL Inference (Value)
    dl_result = dl_model.evaluate(
        presence_status=ml_result['presence_status'],
        usage_status=ml_result['usage_status'],
        current_load=req.current_load,
        temperature=req.temperature
    )
    
    return {
        "building_id": req.building_id,
        "timestamp": req.timestamp,
        "presence_status": ml_result['presence_status'],
        "usage_status": ml_result['usage_status'],
        "value_zone": dl_result['value_zone'],
        "value_score": dl_result['value_score']
    }

@app.get("/health")
def health():
    return {"status": "ok"}

# --- LLM Integration ---
from ai.explanation.llm_client import LLMClient
llm_client = LLMClient(provider="mock") # Switch to "openai_compatible" for real API

class AIInferResponse(InferenceResponse):
    explanation: str

@app.post("/ai/infer", response_model=AIInferResponse)
def infer(req: InferenceRequest):
    # 1. Reuse existing logic (Code duplication for clarity, or refactor)
    # Using the same logic as predict()
    
    time_of_day = req.timestamp.hour
    day_of_week = req.timestamp.weekday()
    is_weekend = day_of_week >= 5
    
    ml_result = ml_model.predict(
        current_load=req.current_load,
        time_of_day=time_of_day,
        is_weekend=is_weekend
    )
    
    dl_result = dl_model.evaluate(
        presence_status=ml_result['presence_status'],
        usage_status=ml_result['usage_status'],
        current_load=req.current_load,
        temperature=req.temperature
    )
    
    # 2. Context for LLM
    context = {
        'building_id': req.building_id,
        'timestamp': req.timestamp,
        'presence_status': ml_result['presence_status'],
        'usage_status': ml_result['usage_status'],
        'value_zone': dl_result['value_zone'],
        'value_score': dl_result['value_score'],
        'current_load': req.current_load,
        'temperature': req.temperature
    }
    
    # 3. Generate Explanation
    explanation = llm_client.generate_explanation(context)
    
    return {
        "building_id": req.building_id,
        "timestamp": req.timestamp,
        "presence_status": ml_result['presence_status'],
        "usage_status": ml_result['usage_status'],
        "value_zone": dl_result['value_zone'],
        "value_score": dl_result['value_score'],
        "explanation": explanation
    }

