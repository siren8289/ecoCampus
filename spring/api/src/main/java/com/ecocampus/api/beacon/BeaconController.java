package com.ecocampus.api.beacon;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beacons")
@RequiredArgsConstructor
@Tag(name = "Beacon", description = "비콘 관리 API")
public class BeaconController {
    private final BeaconService beaconService;

    @GetMapping
    @Operation(summary = "모든 비콘 조회")
    public ResponseEntity<List<BeaconDto>> getAllBeacons() {
        return ResponseEntity.ok(beaconService.getAllBeacons());
    }

    @GetMapping("/{beaconUuid}")
    @Operation(summary = "특정 비콘 조회")
    public ResponseEntity<BeaconDto> getBeacon(@PathVariable String beaconUuid) {
        return ResponseEntity.ok(beaconService.getBeacon(beaconUuid));
    }

    @PostMapping
    @Operation(summary = "비콘 생성")
    public ResponseEntity<BeaconDto> createBeacon(@RequestBody BeaconDto dto) {
        return ResponseEntity.ok(beaconService.createBeacon(dto));
    }

    @DeleteMapping("/{beaconUuid}")
    @Operation(summary = "비콘 삭제")
    public ResponseEntity<Void> deleteBeacon(@PathVariable String beaconUuid) {
        beaconService.deleteBeacon(beaconUuid);
        return ResponseEntity.ok().build();
    }
}
