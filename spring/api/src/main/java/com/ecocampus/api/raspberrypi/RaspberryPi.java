package com.ecocampus.api.raspberrypi;

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
@Table(name = "raspberry_pi")
public class RaspberryPi {

    @Id
    @Column(name = "device_id", length = 50)
    private String deviceId;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "status_log", columnDefinition = "TEXT")
    private String statusLog;

    @Column(name = "last_seen_at")
    private LocalDateTime lastSeenAt;
}
