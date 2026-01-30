package com.ecocampus.api.entrylog;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/entrylogs")
@RequiredArgsConstructor
public class EntryLogController {
    private final EntryLogService entryLogService;
}
