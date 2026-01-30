package com.ecocampus.api.mission;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mission")
public class Mission {

    @Id
    @Column(name = "mission_id", length = 50)
    private String missionId;

    @Column(name = "mission_type", length = 50)
    private String missionType;

    @Column(name = "base_point")
    private Integer basePoint;

    @Column(name = "bonus_condition", columnDefinition = "TEXT")
    private String bonusCondition;
}
