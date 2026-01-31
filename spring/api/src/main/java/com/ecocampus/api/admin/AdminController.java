package com.ecocampus.api.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // @Controller + @ResponseBody. JSON 형태로 객체 데이터를 반환하는 REST API용 컨트롤러입니다.
@RequestMapping("/api/admins") // 이 컨트롤러의 모든 API는 "/api/admins" 경로로 시작합니다.
@RequiredArgsConstructor // Service 의존성을 주입받기 위한 생성자를 자동 생성합니다.
@io.swagger.v3.oas.annotations.tags.Tag(name = "Admin", description = "관리자 관리 API")
public class AdminController {
    private final AdminService adminService;

    @org.springframework.web.bind.annotation.GetMapping
    @io.swagger.v3.oas.annotations.Operation(summary = "모든 관리자 조회")
    public org.springframework.http.ResponseEntity<java.util.List<AdminDto>> getAllAdmins() {
        return org.springframework.http.ResponseEntity.ok(adminService.getAllAdmins());
    }

    @org.springframework.web.bind.annotation.GetMapping("/{adminId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 관리자 조회")
    public org.springframework.http.ResponseEntity<AdminDto> getAdmin(@org.springframework.web.bind.annotation.PathVariable String adminId) {
        return org.springframework.http.ResponseEntity.ok(adminService.getAdmin(adminId));
    }

    @org.springframework.web.bind.annotation.PostMapping
    @io.swagger.v3.oas.annotations.Operation(summary = "관리자 생성")
    public org.springframework.http.ResponseEntity<AdminDto> createAdmin(@org.springframework.web.bind.annotation.RequestBody AdminDto dto) {
        return org.springframework.http.ResponseEntity.ok(adminService.createAdmin(dto));
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{adminId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "관리자 삭제")
    public org.springframework.http.ResponseEntity<Void> deleteAdmin(@org.springframework.web.bind.annotation.PathVariable String adminId) {
        adminService.deleteAdmin(adminId);
        return org.springframework.http.ResponseEntity.ok().build();
    }
}
