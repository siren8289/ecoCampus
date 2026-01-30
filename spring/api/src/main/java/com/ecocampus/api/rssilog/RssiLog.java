package com.ecocampus.api.rssilog;

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
@Table(name = "rssi_log")
public class RssiLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rssi_log_id")
    private Long rssiLogId;

    @Column(name = "beacon_uuid")
    private String beaconUuid;

    @Column(name = "device_id")
    private String deviceId;

    @Column(name = "rssi_value")
    private Float rssiValue;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;
}
