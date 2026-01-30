package com.ecocampus.api.rssilog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RssiLogService {
    private final RssiLogRepository rssiLogRepository;
}
