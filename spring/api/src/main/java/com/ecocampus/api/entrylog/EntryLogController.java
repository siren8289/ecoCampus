package com.ecocampus.api.entrylog;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entrylogs")
@RequiredArgsConstructor
@Tag(name = "EntryLog", description = "출입 기록 관리 API")
public class EntryLogController {
    private final EntryLogService entryLogService;

    @GetMapping
    @Operation(summary = "모든 출입 기록 조회")
    public ResponseEntity<List<EntryLogDto>> getAllEntryLogs() {
        return ResponseEntity.ok(entryLogService.getAllEntryLogs());
    }

    @GetMapping("/{entryId}")
    @Operation(summary = "특정 출입 기록 조회")
    public ResponseEntity<EntryLogDto> getEntryLog(@PathVariable Long entryId) {
        return ResponseEntity.ok(entryLogService.getEntryLog(entryId));
    }

    @PostMapping
    @Operation(summary = "출입 기록 생성")
    public ResponseEntity<EntryLogDto> createEntryLog(@RequestBody EntryLogDto dto) {
        return ResponseEntity.ok(entryLogService.createEntryLog(dto));
    }

    @DeleteMapping("/{entryId}")
    @Operation(summary = "출입 기록 삭제")
    public ResponseEntity<Void> deleteEntryLog(@PathVariable Long entryId) {
        entryLogService.deleteEntryLog(entryId);
        return ResponseEntity.ok().build();
    }
}
