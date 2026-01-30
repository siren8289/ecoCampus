package com.ecocampus.api.rssilog;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rssilogs")
@RequiredArgsConstructor
public class RssiLogController {
    private final RssiLogService rssiLogService;
}
