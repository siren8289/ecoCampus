package com.ecocampus.api.entrylog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EntryLogService {
    private final EntryLogRepository entryLogRepository;
}
