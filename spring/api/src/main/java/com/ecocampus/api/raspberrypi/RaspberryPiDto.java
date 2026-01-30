package com.ecocampus.api.raspberrypi;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RaspberryPiDto {
    private String deviceId;
    private String ipAddress;
    private String statusLog;
    private LocalDateTime lastSeenAt;
}
