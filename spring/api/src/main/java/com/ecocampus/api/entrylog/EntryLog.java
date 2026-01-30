package com.ecocampus.api.entrylog;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

import com.ecocampus.api.aiinferencelog.AiInferenceLog;
import com.ecocampus.api.mission.Mission;
import com.ecocampus.api.student.Student;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "entry_log")
public class EntryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id")
    private Long entryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id")
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inference_id")
    private AiInferenceLog inferenceLog;

    @Column(name = "completion_type", length = 50)
    private String completionType;

    @Column(name = "earned_point")
    private Integer earnedPoint;

    @Column(name = "participated_at")
    private LocalDateTime participatedAt;
}
