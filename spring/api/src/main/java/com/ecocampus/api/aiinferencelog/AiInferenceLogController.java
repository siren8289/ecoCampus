package com.ecocampus.api.aiinferencelog;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/aiinferencelogs")
@RequiredArgsConstructor
public class AiInferenceLogController {
    private final AiInferenceLogService aiInferenceLogService;
}
