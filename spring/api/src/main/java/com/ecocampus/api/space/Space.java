package com.ecocampus.api.space;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "space")
public class Space {

    @Id
    @Column(name = "space_id", length = 50)
    private String spaceId; // e.g., RM-101

    @Column(name = "location_code", length = 50)
    private String locationCode;

    @Column(name = "occ_threshold")
    private Float occThreshold;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
