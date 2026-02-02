package com.ecocampus.api.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InferenceResponseDto {
    private String building_id;
    private LocalDateTime timestamp;
    private String presence_status;
    private String usage_status;
    private String value_zone;
    private Double value_score;
    private String explanation;
}
