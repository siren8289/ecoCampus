package com.ecocampus.api.aiinferencelog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiInferenceLogService {
    private final AiInferenceLogRepository aiInferenceLogRepository;
}
