package com.ecocampus.api.raspberrypi;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RaspberryPiService {
    private final RaspberryPiRepository raspberryPiRepository;

    public List<RaspberryPiDto> getAllRaspberryPis() {
        return raspberryPiRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public RaspberryPiDto getRaspberryPi(String deviceId) {
        RaspberryPi pi = raspberryPiRepository.findById(deviceId)
                .orElseThrow(() -> new IllegalArgumentException("RaspberryPi not found: " + deviceId));
        return toDto(pi);
    }

    @Transactional
    public RaspberryPiDto createRaspberryPi(RaspberryPiDto dto) {
        RaspberryPi pi = RaspberryPi.builder()
                .deviceId(dto.getDeviceId())
                .ipAddress(dto.getIpAddress())
                .statusLog(dto.getStatusLog())
                .lastSeenAt(LocalDateTime.now())
                .build();
        return toDto(raspberryPiRepository.save(pi));
    }

    @Transactional
    public void deleteRaspberryPi(String deviceId) {
        raspberryPiRepository.deleteById(deviceId);
    }

    private RaspberryPiDto toDto(RaspberryPi pi) {
        return RaspberryPiDto.builder()
                .deviceId(pi.getDeviceId())
                .ipAddress(pi.getIpAddress())
                .statusLog(pi.getStatusLog())
                .lastSeenAt(pi.getLastSeenAt())
                .build();
    }
}
