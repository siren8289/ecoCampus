package com.ecocampus.api.aiinferencelog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiInferenceLogDto {
    private Long inferenceId;
    private String spaceId;
    private Boolean mlOccupied;
    private Float dlAnomalyScore;
    private String llmFeedback;
    private Boolean isConfirmed;
    private LocalDateTime inferredAt;
}
