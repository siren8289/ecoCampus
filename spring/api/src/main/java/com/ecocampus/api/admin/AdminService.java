package com.ecocampus.api.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service // 비즈니스 로직을 처리하는 서비스 계층임을 명시하며, 스프링 빈으로 등록됩니다.
@RequiredArgsConstructor // final이 붙은 필드에 대한 생성자를 자동으로 생성하여 의존성을 주입(DI)받습니다.
@org.springframework.transaction.annotation.Transactional(readOnly = true)
public class AdminService {
    // 생성자 주입을 통해 AdminRepository의 구현체를 주입받습니다.
    private final AdminRepository adminRepository;
    private final com.ecocampus.api.space.SpaceRepository spaceRepository;

    public java.util.List<AdminDto> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(this::toDto)
                .collect(java.util.stream.Collectors.toList());
    }

    public AdminDto getAdmin(String adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found: " + adminId));
        return toDto(admin);
    }

    @org.springframework.transaction.annotation.Transactional
    public AdminDto createAdmin(AdminDto dto) {
        com.ecocampus.api.space.Space space = null;
        if (dto.getManagedSpaceId() != null) {
            space = spaceRepository.findById(dto.getManagedSpaceId())
                    .orElseThrow(() -> new IllegalArgumentException("Space not found: " + dto.getManagedSpaceId()));
        }

        Admin admin = Admin.builder()
                .adminId(dto.getAdminId())
                .role(dto.getRole())
                .managedSpace(space)
                .createdAt(java.time.LocalDateTime.now())
                .build();
        return toDto(adminRepository.save(admin));
    }

    @org.springframework.transaction.annotation.Transactional
    public void deleteAdmin(String adminId) {
        adminRepository.deleteById(adminId);
    }

    private AdminDto toDto(Admin admin) {
        return AdminDto.builder()
                .adminId(admin.getAdminId())
                .role(admin.getRole())
                .managedSpaceId(admin.getManagedSpace() != null ? admin.getManagedSpace().getSpaceId() : null)
                .createdAt(admin.getCreatedAt())
                .build();
    }
}
