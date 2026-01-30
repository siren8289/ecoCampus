package com.ecocampus.api.beacon;

import com.ecocampus.api.space.Space;

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
@Table(name = "beacon")
public class Beacon {

    @Id
    @Column(name = "beacon_uuid", length = 100)
    private String beaconUuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id")
    private Space space;

    @Column(name = "signal_interval")
    private Integer signalInterval;
}
