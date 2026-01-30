package com.ecocampus.api.beacon;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BeaconService {
    private final BeaconRepository beaconRepository;
}
