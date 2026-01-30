package com.ecocampus.api.rssilog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RssiLogDto {
    private Long rssiLogId;
    private String beaconUuid;
    private String deviceId;
    private Float rssiValue;
    private LocalDateTime recordedAt;
}
