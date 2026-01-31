package com.ecocampus.api.space;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spaces")
@RequiredArgsConstructor
@Tag(name = "Space", description = "공간 관리 API")
public class SpaceController {
    private final SpaceService spaceService;

    @GetMapping
    @Operation(summary = "모든 공간 조회")
    public ResponseEntity<List<SpaceDto>> getAllSpaces() {
        return ResponseEntity.ok(spaceService.getAllSpaces());
    }

    @GetMapping("/{spaceId}")
    @Operation(summary = "특정 공간 조회")
    public ResponseEntity<SpaceDto> getSpace(@PathVariable String spaceId) {
        return ResponseEntity.ok(spaceService.getSpace(spaceId));
    }

    @PostMapping
    @Operation(summary = "공간 생성")
    public ResponseEntity<SpaceDto> createSpace(@RequestBody SpaceDto dto) {
        return ResponseEntity.ok(spaceService.createSpace(dto));
    }

    @DeleteMapping("/{spaceId}")
    @Operation(summary = "공간 삭제")
    public ResponseEntity<Void> deleteSpace(@PathVariable String spaceId) {
        spaceService.deleteSpace(spaceId);
        return ResponseEntity.ok().build();
    }
}
