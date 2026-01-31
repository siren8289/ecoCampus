package com.ecocampus.api.mission;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
@Tag(name = "Mission", description = "미션 관리 API")
public class MissionController {
    private final MissionService missionService;

    @GetMapping
    @Operation(summary = "모든 미션 조회")
    public ResponseEntity<List<MissionDto>> getAllMissions() {
        return ResponseEntity.ok(missionService.getAllMissions());
    }

    @GetMapping("/{missionId}")
    @Operation(summary = "특정 미션 조회")
    public ResponseEntity<MissionDto> getMission(@PathVariable String missionId) {
        return ResponseEntity.ok(missionService.getMission(missionId));
    }

    @PostMapping
    @Operation(summary = "미션 생성")
    public ResponseEntity<MissionDto> createMission(@RequestBody MissionDto dto) {
        return ResponseEntity.ok(missionService.createMission(dto));
    }

    @DeleteMapping("/{missionId}")
    @Operation(summary = "미션 삭제")
    public ResponseEntity<Void> deleteMission(@PathVariable String missionId) {
        missionService.deleteMission(missionId);
        return ResponseEntity.ok().build();
    }
}
