package com.ecocampus.api.raspberrypi;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/raspberrypis")
@RequiredArgsConstructor
public class RaspberryPiController {
    private final RaspberryPiService raspberryPiService;
}
