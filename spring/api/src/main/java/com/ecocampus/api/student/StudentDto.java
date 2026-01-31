package com.ecocampus.api.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private String studentId;
    private Integer totalPoint;
    private Float rankScore;
    private Integer charLevel;
    private LocalDateTime createdAt;
}
