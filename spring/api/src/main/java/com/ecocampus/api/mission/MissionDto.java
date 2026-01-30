package com.ecocampus.api.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MissionDto {
    private String missionId;
    private String missionType;
    private Integer basePoint;
    private String bonusCondition;
}
