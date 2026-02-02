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
public class InferenceRequestDto {
    private String building_id;
    private Double current_load;
    private Double temperature;
    private LocalDateTime timestamp;
}
