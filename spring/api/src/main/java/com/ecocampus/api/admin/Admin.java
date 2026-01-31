package com.ecocampus.api.admin;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

import com.ecocampus.api.space.Space;

@Entity // JPA가 관리하는 엔티티 객체임을 명시합니다. (DB 테이블과 매핑됨)
@Getter // Lombok: 모든 필드의 Getter 메서드를 자동 생성합니다.
@NoArgsConstructor // Lombok: 파라미터가 없는 기본 생성자를 생성합니다. (JPA 스펙상 필수)
@AllArgsConstructor // Lombok: 모든 필드를 파라미터로 받는 생성자를 생성합니다.
@Builder // Lombok: 빌더 패턴을 사용하여 객체를 생성할 수 있게 합니다.
@Table(name = "admin") // 매핑될 DB 테이블 이름을 "admin"으로 지정합니다.
public class Admin {

    @Id // 이 필드가 테이블의 기본 키(PK)임을 나타냅니다.
    @Column(name = "admin_id", length = 50) // DB 컬럼명은 "admin_id", 길이는 50으로 설정합니다.
    private String adminId;

    @Column(name = "role", length = 20) // 관리자 권한/역할을 저장하는 컬럼입니다.
    private String role;

    // N:1 관계 매핑. Admin(N) : Space(1)
    // FetchType.LAZY: 지연 로딩을 사용하여 필요할 때만 Space 데이터를 조회합니다. (성능 최적화)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "managed_space_id") // 외래 키(FK) 컬럼명을 지정합니다.
    private Space managedSpace;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
