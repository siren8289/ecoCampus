package com.ecocampus.api.ai;

import com.ecocampus.api.ai.dto.InferenceRequestDto;
import com.ecocampus.api.ai.dto.InferenceResponseDto;
import com.ecocampus.api.aiinferencelog.AiInferenceLog;
import com.ecocampus.api.aiinferencelog.AiInferenceLogRepository;
import com.ecocampus.api.space.Space;
import com.ecocampus.api.space.SpaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIService {

    private final AIClient aiClient;
    private final SpaceRepository spaceRepository;
    private final AiInferenceLogRepository aiInferenceLogRepository;

    @Transactional
    public AiInferenceLog triggerInference(String spaceId) {
        // 1. Fetch Context (Space)
        Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new IllegalArgumentException("Space not found: " + spaceId));

        // 2. Fetch Sensor Data (Mocked for now)
        // In real impl, inject SensorService and call getLatestData(spaceId)
        Double currentLoad = Math.random(); // 0.0 - 1.0 (Mock)
        Double temperature = 18.0 + (Math.random() * 10); // 18 - 28 C (Mock)

        InferenceRequestDto requestDto = InferenceRequestDto.builder()
                .building_id(spaceId) // Using SpaceID as BuildingID
                .current_load(currentLoad)
                .temperature(temperature)
                .timestamp(LocalDateTime.now())
                .build();

        // 3. Call AI API
        InferenceResponseDto response = aiClient.getInference(requestDto);

        // 4. Save Log
        AiInferenceLog logEntity = AiInferenceLog.builder()
                .space(space)
                .inferredAt(LocalDateTime.now())
                .mlOccupied("Occupied".equalsIgnoreCase(response.getPresence_status()))
                .usageStatus(response.getUsage_status())
                .valueZone(response.getValue_zone())
                .dlAnomalyScore(response.getValue_score() != null ? response.getValue_score().floatValue() : 0.0f)
                .llmFeedback(response.getExplanation())
                .isConfirmed(false) // Default
                .build();

        AiInferenceLog savedLog = aiInferenceLogRepository.save(logEntity);
        log.info("Saved AI Inference Log ID: {}", savedLog.getInferenceId());
        
        return savedLog;
    }
}
