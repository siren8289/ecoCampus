package com.ecocampus.api.ai;

import com.ecocampus.api.aiinferencelog.AiInferenceLog;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/infer/{spaceId}")
    public ResponseEntity<AiInferenceLog> triggerInference(@PathVariable String spaceId) {
        AiInferenceLog log = aiService.triggerInference(spaceId);
        return ResponseEntity.ok(log);
    }
}
