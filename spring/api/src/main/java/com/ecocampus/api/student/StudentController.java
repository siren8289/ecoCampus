package com.ecocampus.api.student;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@Tag(name = "Student", description = "학생 관리 API")
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    @Operation(summary = "모든 학생 조회")
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{studentId}")
    @Operation(summary = "특정 학생 조회")
    public ResponseEntity<StudentDto> getStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(studentService.getStudent(studentId));
    }

    @PostMapping
    @Operation(summary = "학생 생성")
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto dto) {
        return ResponseEntity.ok(studentService.createStudent(dto));
    }

    @DeleteMapping("/{studentId}")
    @Operation(summary = "학생 삭제")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok().build();
    }
}
