package com.ecocampus.api.entrylog;

import com.ecocampus.api.mission.Mission;
import com.ecocampus.api.mission.MissionRepository;
import com.ecocampus.api.student.Student;
import com.ecocampus.api.student.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EntryLogService {
    private final EntryLogRepository entryLogRepository;
    private final StudentRepository studentRepository;
    private final MissionRepository missionRepository;

    public List<EntryLogDto> getAllEntryLogs() {
        return entryLogRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public EntryLogDto getEntryLog(Long entryId) {
        EntryLog entryLog = entryLogRepository.findById(entryId)
                .orElseThrow(() -> new IllegalArgumentException("EntryLog not found: " + entryId));
        return toDto(entryLog);
    }

    @Transactional
    public EntryLogDto createEntryLog(EntryLogDto dto) {
        Student student = null;
        if (dto.getStudentId() != null) {
            student = studentRepository.findById(dto.getStudentId())
                    .orElseThrow(() -> new IllegalArgumentException("Student not found: " + dto.getStudentId()));
        }

        Mission mission = null;
        if (dto.getMissionId() != null) {
            mission = missionRepository.findById(dto.getMissionId())
                    .orElseThrow(() -> new IllegalArgumentException("Mission not found: " + dto.getMissionId()));
        }

        EntryLog entryLog = EntryLog.builder()
                .student(student)
                .mission(mission)
                // InferenceLog ignored for simple CRUD testability for now
                .completionType(dto.getCompletionType())
                .earnedPoint(dto.getEarnedPoint())
                .participatedAt(dto.getParticipatedAt())
                .build();
        return toDto(entryLogRepository.save(entryLog));
    }

    @Transactional
    public void deleteEntryLog(Long entryId) {
        entryLogRepository.deleteById(entryId);
    }

    private EntryLogDto toDto(EntryLog entryLog) {
        return EntryLogDto.builder()
                .entryId(entryLog.getEntryId())
                .studentId(entryLog.getStudent() != null ? entryLog.getStudent().getStudentId() : null)
                .missionId(entryLog.getMission() != null ? entryLog.getMission().getMissionId() : null)
                .inferenceId(entryLog.getInferenceLog() != null ? entryLog.getInferenceLog().getInferenceId() : null)
                .completionType(entryLog.getCompletionType())
                .earnedPoint(entryLog.getEarnedPoint())
                .participatedAt(entryLog.getParticipatedAt())
                .build();
    }
}
