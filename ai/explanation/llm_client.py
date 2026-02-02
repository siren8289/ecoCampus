import os
import random

class LLMClient:
    def __init__(self, provider="mock", api_key=None, endpoint=None):
        self.provider = provider
        self.api_key = api_key
        self.endpoint = endpoint

    def generate_explanation(self, context: dict) -> str:
        """
        Generates a natural language explanation based on the context.
        
        Args:
            context (dict): {
                'building_id': str,
                'timestamp': datetime,
                'presence_status': str, # Occupied/Empty
                'usage_status': str,    # Active/Idle/Overuse
                'value_zone': str,      # HIGH/MID/RISK
                'value_score': float,
                'current_load': float,
                'temperature': float
            }
        """
        
        # Construct Prompt (Concept)
        prompt = f"""
        Role: Energy Management AI.
        Task: Explain the energy status and simple action guide.
        Context:
        - Time: {context.get('timestamp')}
        - Status: {context.get('presence_status')} & {context.get('usage_status')}
        - Load: {context.get('current_load')} (Normalized)
        - Value to Save: {context.get('value_zone')} ({context.get('value_score')})
        
        Explain why the value is {context.get('value_zone')} and what to do in 1 sentence.
        """
        
        if self.provider == "mock":
            return self._mock_response(context)
        elif self.provider == "openai_compatible":
            # Placeholder for actual API call (e.g. Qwen/Local)
            return f"[LLM] Based on {context.get('usage_status')}, you should check the AC."
            
        return "Explanation unavailable."

    def _mock_response(self, context):
        zone = context.get('value_zone')
        usage = context.get('usage_status')
        presence = context.get('presence_status')
        
        explanations = []
        
        if zone == "HIGH":
            explanations.append("지금이 절약 골든타임입니다!")
            if usage == "Overuse":
                explanations.append("아무도 없는데 전력이 낭비되고 있어요. 즉시 꺼주세요.")
            elif presence == "Empty":
                explanations.append("빈 강의실입니다. 조명과 냉난방을 확인해주세요.")
                
        elif zone == "MID":
            explanations.append("에너지 절약이 가능합니다.")
            if usage == "Active":
                explanations.append("사용 중이지만 불필요한 기기는 없는지 확인해보세요.")
                
        elif zone == "RISK":
            explanations.append("절약보다는 쾌적한 환경 유지가 중요합니다.")
            if presence == "Occupied":
                explanations.append("현재 수업 중이거나 재실 인원이 많아 무리한 절약은 권장하지 않습니다.")
                
        if not explanations:
            explanations.append(f"현재 상태는 {usage}이며, 절약 가치는 {zone}입니다.")
            
        return " ".join(explanations)
