package com.ecocampus.api.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data // Getter, Setter, ToString, EqualsAndHashCode 등을 자동 생성합니다.
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto {
    // DTO (Data Transfer Object): 계층 간 데이터 교환을 위해 사용하는 객체입니다.
    // Entity를 직접 노출하지 않고, 필요한 데이터만 담아서 클라이언트와 주고받습니다.
    private String adminId;
    private String role;
    private String managedSpaceId; // Entity 대신 ID값만 전달하여 결합도를 낮춤
    private LocalDateTime createdAt;
}
