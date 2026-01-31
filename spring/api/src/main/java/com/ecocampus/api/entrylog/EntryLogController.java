package com.ecocampus.api.entrylog;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/entrylogs")
@RequiredArgsConstructor
@Tag(name = "EntryLog", description = "출입 기록 관리 API")
public class EntryLogController {
    private final EntryLogService entryLogService;

    @org.springframework.web.bind.annotation.GetMapping
    @Operation(summary = "테스트 엔드포인트", description = "Swagger UI 작동 확인을 위한 임시 API입니다.")
    public String hello() {
        return "Hello Swagger!";
    }
}
