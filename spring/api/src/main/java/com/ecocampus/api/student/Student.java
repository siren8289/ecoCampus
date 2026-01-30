package com.ecocampus.api.student;

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
@Table(name = "student")
public class Student {

    @Id
    @Column(name = "student_id", length = 50)
    private String studentId;

    @Column(name = "total_point")
    private Integer totalPoint;

    @Column(name = "rank_score")
    private Float rankScore;

    @Column(name = "char_level")
    private Integer charLevel;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.totalPoint == null) this.totalPoint = 0;
        if (this.charLevel == null) this.charLevel = 1;
        if (this.rankScore == null) this.rankScore = 0.0f;
    }
}
