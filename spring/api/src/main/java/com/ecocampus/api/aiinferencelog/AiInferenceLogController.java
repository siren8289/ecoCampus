package com.ecocampus.api.aiinferencelog;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai-inference-logs")
@RequiredArgsConstructor
@Tag(name = "AiInferenceLog", description = "AI 추론 로그 관리 API")
public class AiInferenceLogController {
    private final AiInferenceLogService aiInferenceLogService;

    @GetMapping
    @Operation(summary = "모든 AI 추론 로그 조회")
    public ResponseEntity<List<AiInferenceLogDto>> getAllAiInferenceLogs() {
        return ResponseEntity.ok(aiInferenceLogService.getAllAiInferenceLogs());
    }

    @GetMapping("/{inferenceId}")
    @Operation(summary = "특정 AI 추론 로그 조회")
    public ResponseEntity<AiInferenceLogDto> getAiInferenceLog(@PathVariable Long inferenceId) {
        return ResponseEntity.ok(aiInferenceLogService.getAiInferenceLog(inferenceId));
    }

    @PostMapping
    @Operation(summary = "AI 추론 로그 생성")
    public ResponseEntity<AiInferenceLogDto> createAiInferenceLog(@RequestBody AiInferenceLogDto dto) {
        return ResponseEntity.ok(aiInferenceLogService.createAiInferenceLog(dto));
    }

    @DeleteMapping("/{inferenceId}")
    @Operation(summary = "AI 추론 로그 삭제")
    public ResponseEntity<Void> deleteAiInferenceLog(@PathVariable Long inferenceId) {
        aiInferenceLogService.deleteAiInferenceLog(inferenceId);
        return ResponseEntity.ok().build();
    }
}
