package com.ecocampus.api.aiinferencelog;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

import com.ecocampus.api.rssilog.RssiLog;
import com.ecocampus.api.space.Space;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ai_inference_log")
public class AiInferenceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inference_id")
    private Long inferenceId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rssi_log_id")
    private RssiLog rssiLog;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id")
    private Space space;

    @Column(name = "mission_id") // Optional link to mission if related
    private String missionId;

    @Column(name = "ml_occupied")
    private Boolean mlOccupied;

    @Column(name = "dl_anomaly_score")
    private Float dlAnomalyScore;

    @Column(name = "llm_feedback", columnDefinition = "TEXT")
    private String llmFeedback;

    @Column(name = "is_confirmed")
    private Boolean isConfirmed;

    @Column(name = "inferred_at")
    private LocalDateTime inferredAt;
}
