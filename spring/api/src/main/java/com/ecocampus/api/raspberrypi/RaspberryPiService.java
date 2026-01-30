package com.ecocampus.api.raspberrypi;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RaspberryPiService {
    private final RaspberryPiRepository raspberryPiRepository;
}
