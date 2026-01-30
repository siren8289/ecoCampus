package com.ecocampus.api.entrylog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EntryLogDto {
    private Long entryId;
    private String studentId;
    private String missionId;
    private Long inferenceId;
    private String completionType;
    private Integer earnedPoint;
    private LocalDateTime participatedAt;
}
