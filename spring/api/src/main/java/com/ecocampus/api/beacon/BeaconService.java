package com.ecocampus.api.beacon;

import com.ecocampus.api.space.Space;
import com.ecocampus.api.space.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BeaconService {
    private final BeaconRepository beaconRepository;
    private final SpaceRepository spaceRepository;

    public List<BeaconDto> getAllBeacons() {
        return beaconRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public BeaconDto getBeacon(String beaconUuid) {
        Beacon beacon = beaconRepository.findById(beaconUuid)
                .orElseThrow(() -> new IllegalArgumentException("Beacon not found: " + beaconUuid));
        return toDto(beacon);
    }

    @Transactional
    public BeaconDto createBeacon(BeaconDto dto) {
        Space space = null;
        if (dto.getSpaceId() != null) {
            space = spaceRepository.findById(dto.getSpaceId())
                    .orElseThrow(() -> new IllegalArgumentException("Space not found: " + dto.getSpaceId()));
        }

        Beacon beacon = Beacon.builder()
                .beaconUuid(dto.getBeaconUuid())
                .space(space)
                .signalInterval(dto.getSignalInterval())
                .build();
        return toDto(beaconRepository.save(beacon));
    }

    @Transactional
    public void deleteBeacon(String beaconUuid) {
        beaconRepository.deleteById(beaconUuid);
    }

    private BeaconDto toDto(Beacon beacon) {
        return BeaconDto.builder()
                .beaconUuid(beacon.getBeaconUuid())
                .spaceId(beacon.getSpace() != null ? beacon.getSpace().getSpaceId() : null)
                .signalInterval(beacon.getSignalInterval())
                .build();
    }
}
