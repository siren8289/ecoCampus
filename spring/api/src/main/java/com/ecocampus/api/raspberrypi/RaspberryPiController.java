package com.ecocampus.api.raspberrypi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/raspberrypis")
@RequiredArgsConstructor
@Tag(name = "RaspberryPi", description = "라즈베리파이 기기 관리 API")
public class RaspberryPiController {
    private final RaspberryPiService raspberryPiService;

    @GetMapping
    @Operation(summary = "모든 라즈베리파이 조회")
    public ResponseEntity<List<RaspberryPiDto>> getAllRaspberryPis() {
        return ResponseEntity.ok(raspberryPiService.getAllRaspberryPis());
    }

    @GetMapping("/{deviceId}")
    @Operation(summary = "특정 라즈베리파이 조회")
    public ResponseEntity<RaspberryPiDto> getRaspberryPi(@PathVariable String deviceId) {
        return ResponseEntity.ok(raspberryPiService.getRaspberryPi(deviceId));
    }

    @PostMapping
    @Operation(summary = "라즈베리파이 생성")
    public ResponseEntity<RaspberryPiDto> createRaspberryPi(@RequestBody RaspberryPiDto dto) {
        return ResponseEntity.ok(raspberryPiService.createRaspberryPi(dto));
    }

    @DeleteMapping("/{deviceId}")
    @Operation(summary = "라즈베리파이 삭제")
    public ResponseEntity<Void> deleteRaspberryPi(@PathVariable String deviceId) {
        raspberryPiService.deleteRaspberryPi(deviceId);
        return ResponseEntity.ok().build();
    }
}
