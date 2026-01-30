package com.ecocampus.api.beacon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BeaconDto {
    private String beaconUuid;
    private String spaceId;
    private Integer signalInterval;
}
