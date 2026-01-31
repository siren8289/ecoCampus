package com.ecocampus.api.rssilog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RssiLogService {
    private final RssiLogRepository rssiLogRepository;

    public List<RssiLogDto> getAllRssiLogs() {
        return rssiLogRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public RssiLogDto getRssiLog(Long rssiLogId) {
        RssiLog rssiLog = rssiLogRepository.findById(rssiLogId)
                .orElseThrow(() -> new IllegalArgumentException("RssiLog not found: " + rssiLogId));
        return toDto(rssiLog);
    }

    @Transactional
    public RssiLogDto createRssiLog(RssiLogDto dto) {
        RssiLog rssiLog = RssiLog.builder()
                .beaconUuid(dto.getBeaconUuid())
                .deviceId(dto.getDeviceId())
                .rssiValue(dto.getRssiValue())
                .recordedAt(dto.getRecordedAt())
                .build();
        return toDto(rssiLogRepository.save(rssiLog));
    }

    @Transactional
    public void deleteRssiLog(Long rssiLogId) {
        rssiLogRepository.deleteById(rssiLogId);
    }

    private RssiLogDto toDto(RssiLog rssiLog) {
        return RssiLogDto.builder()
                .rssiLogId(rssiLog.getRssiLogId())
                .beaconUuid(rssiLog.getBeaconUuid())
                .deviceId(rssiLog.getDeviceId())
                .rssiValue(rssiLog.getRssiValue())
                .recordedAt(rssiLog.getRecordedAt())
                .build();
    }
}
