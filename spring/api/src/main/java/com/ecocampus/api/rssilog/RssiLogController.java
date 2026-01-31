package com.ecocampus.api.rssilog;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rssilogs")
@RequiredArgsConstructor
@Tag(name = "RssiLog", description = "RSSI 로그 관리 API")
public class RssiLogController {
    private final RssiLogService rssiLogService;

    @GetMapping
    @Operation(summary = "모든 RSSI 로그 조회")
    public ResponseEntity<List<RssiLogDto>> getAllRssiLogs() {
        return ResponseEntity.ok(rssiLogService.getAllRssiLogs());
    }

    @GetMapping("/{rssiLogId}")
    @Operation(summary = "특정 RSSI 로그 조회")
    public ResponseEntity<RssiLogDto> getRssiLog(@PathVariable Long rssiLogId) {
        return ResponseEntity.ok(rssiLogService.getRssiLog(rssiLogId));
    }

    @PostMapping
    @Operation(summary = "RSSI 로그 생성")
    public ResponseEntity<RssiLogDto> createRssiLog(@RequestBody RssiLogDto dto) {
        return ResponseEntity.ok(rssiLogService.createRssiLog(dto));
    }

    @DeleteMapping("/{rssiLogId}")
    @Operation(summary = "RSSI 로그 삭제")
    public ResponseEntity<Void> deleteRssiLog(@PathVariable Long rssiLogId) {
        rssiLogService.deleteRssiLog(rssiLogId);
        return ResponseEntity.ok().build();
    }
}
