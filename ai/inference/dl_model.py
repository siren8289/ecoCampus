import random

class ValueJudgmentModel:
    def __init__(self):
        # Placeholder for PyTorch/TensorFlow model loading
        pass

    def evaluate(self, presence_status, usage_status, current_load, temperature):
        """
        Evaluates the 'value' of energy saving actions in the current context.
        
        Args:
           presence_status (str): "Occupied" / "Empty"
           usage_status (str): "Active" / "Idle" / "Overuse"
           current_load (float): 0-1 normalized
           temperature (float): Celsius
           
        Returns:
            dict: { 'value_zone': str, 'value_score': float }
        """
        
        score = 0.5 # Default Base
        
        # Logic:
        # High Value to save: When Overuse, or Empty but Active.
        # Risk: When saving might impact comfort (e.g. Extreme temps + Occupied)
        
        # 1. Base score from Usage Status
        if usage_status == "Overuse":
            score += 0.4  # High incentive to reduce
        elif usage_status == "Idle":
            score -= 0.1  # Drawing little anyway
            
        # 2. Context Modifier (Presence)
        if presence_status == "Empty":
            score += 0.3 # Huge value in cutting power to empty rooms
        
        # 3. Weather Modifier (Risk Check)
        # If very hot/cold and Occupied, risky to cut power (HVAC needed)
        is_extreme_weather = temperature > 28 or temperature < 5
        if presence_status == "Occupied" and is_extreme_weather:
            score -= 0.4 # Lower value/High risk to intervene
            
        # Clamp Score
        score = max(0.0, min(1.0, score))
        
        # Determine Zone
        if score >= 0.7:
            zone = "HIGH"
        elif score >= 0.4:
            zone = "MID"
        else:
            zone = "RISK" # Or LOW/Risk
            
        return {
            "value_zone": zone,
            "value_score": round(score, 2)
        }
