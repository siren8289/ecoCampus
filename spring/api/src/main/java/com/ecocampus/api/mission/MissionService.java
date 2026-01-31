package com.ecocampus.api.mission;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MissionService {
    private final MissionRepository missionRepository;

    public List<MissionDto> getAllMissions() {
        return missionRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public MissionDto getMission(String missionId) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("Mission not found: " + missionId));
        return toDto(mission);
    }

    @Transactional
    public MissionDto createMission(MissionDto dto) {
        Mission mission = Mission.builder()
                .missionId(dto.getMissionId())
                .missionType(dto.getMissionType())
                .basePoint(dto.getBasePoint())
                .bonusCondition(dto.getBonusCondition())
                .build();
        return toDto(missionRepository.save(mission));
    }

    @Transactional
    public void deleteMission(String missionId) {
        missionRepository.deleteById(missionId);
    }

    private MissionDto toDto(Mission mission) {
        return MissionDto.builder()
                .missionId(mission.getMissionId())
                .missionType(mission.getMissionType())
                .basePoint(mission.getBasePoint())
                .bonusCondition(mission.getBonusCondition())
                .build();
    }
}
