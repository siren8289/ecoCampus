package com.ecocampus.api.space;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SpaceService {
    private final SpaceRepository spaceRepository;

    public List<SpaceDto> getAllSpaces() {
        return spaceRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public SpaceDto getSpace(String spaceId) {
        Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new IllegalArgumentException("Space not found: " + spaceId));
        return toDto(space);
    }

    @Transactional
    public SpaceDto createSpace(SpaceDto dto) {
        Space space = Space.builder()
                .spaceId(dto.getSpaceId())
                .locationCode(dto.getLocationCode())
                .occThreshold(dto.getOccThreshold())
                .updatedAt(LocalDateTime.now())
                .build();
        return toDto(spaceRepository.save(space));
    }

    @Transactional
    public void deleteSpace(String spaceId) {
        spaceRepository.deleteById(spaceId);
    }

    private SpaceDto toDto(Space space) {
        return SpaceDto.builder()
                .spaceId(space.getSpaceId())
                .locationCode(space.getLocationCode())
                .occThreshold(space.getOccThreshold())
                .updatedAt(space.getUpdatedAt())
                .build();
    }
}
