package com.ecocampus.api.aiinferencelog;

import com.ecocampus.api.rssilog.RssiLog;
import com.ecocampus.api.rssilog.RssiLogRepository;
import com.ecocampus.api.space.Space;
import com.ecocampus.api.space.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AiInferenceLogService {
    private final AiInferenceLogRepository aiInferenceLogRepository;
    private final RssiLogRepository rssiLogRepository; // For linking if needed (usually log triggers inference)
    private final SpaceRepository spaceRepository;

    public List<AiInferenceLogDto> getAllAiInferenceLogs() {
        return aiInferenceLogRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public AiInferenceLogDto getAiInferenceLog(Long inferenceId) {
        AiInferenceLog log = aiInferenceLogRepository.findById(inferenceId)
                .orElseThrow(() -> new IllegalArgumentException("Inference Log not found: " + inferenceId));
        return toDto(log);
    }

    @Transactional
    public AiInferenceLogDto createAiInferenceLog(AiInferenceLogDto dto) {
        Space space = null;
        if (dto.getSpaceId() != null) {
            space = spaceRepository.findById(dto.getSpaceId())
                    .orElseThrow(() -> new IllegalArgumentException("Space not found: " + dto.getSpaceId()));
        }

        // Note: Linking RssiLog directly via DTO is complex if DTO doesn't carry RssiLogId (it doesn't in current DTO).
        // Ignoring RssiLog link for simple CRUD testability.

        AiInferenceLog log = AiInferenceLog.builder()
                .space(space)
                .mlOccupied(dto.getMlOccupied())
                .dlAnomalyScore(dto.getDlAnomalyScore())
                .llmFeedback(dto.getLlmFeedback())
                .isConfirmed(dto.getIsConfirmed())
                .inferredAt(dto.getInferredAt())
                .build();
        return toDto(aiInferenceLogRepository.save(log));
    }

    @Transactional
    public void deleteAiInferenceLog(Long inferenceId) {
        aiInferenceLogRepository.deleteById(inferenceId);
    }

    private AiInferenceLogDto toDto(AiInferenceLog log) {
        return AiInferenceLogDto.builder()
                .inferenceId(log.getInferenceId())
                .spaceId(log.getSpace() != null ? log.getSpace().getSpaceId() : null)
                .mlOccupied(log.getMlOccupied())
                .dlAnomalyScore(log.getDlAnomalyScore())
                .llmFeedback(log.getLlmFeedback())
                .isConfirmed(log.getIsConfirmed())
                .inferredAt(log.getInferredAt())
                .build();
    }
}
