package com.ecocampus.api.ai;

import com.ecocampus.api.ai.dto.InferenceRequestDto;
import com.ecocampus.api.ai.dto.InferenceResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class AIClient {

    private final RestTemplate restTemplate;

    @Value("${ai.api.url:http://localhost:8000}")
    private String aiApiUrl;

    public InferenceResponseDto getInference(InferenceRequestDto requestDto) {
        String url = aiApiUrl + "/ai/infer";
        log.info("Requesting AI Inference to: {}", url);
        
        try {
            return restTemplate.postForObject(url, requestDto, InferenceResponseDto.class);
        } catch (Exception e) {
            log.error("Failed to call AI API", e);
            // In case of error, you might want to return null or throw a custom exception
            // For now, logging and returning null or rethrowing
            throw new RuntimeException("AI API call failed", e);
        }
    }
}
