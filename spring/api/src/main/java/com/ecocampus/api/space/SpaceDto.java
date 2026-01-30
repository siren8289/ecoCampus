package com.ecocampus.api.space;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpaceDto {
    private String spaceId;
    private String locationCode;
    private Float occThreshold;
    private LocalDateTime updatedAt;
}
