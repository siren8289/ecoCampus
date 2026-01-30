package com.ecocampus.api.admin;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

import com.ecocampus.api.space.Space;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "admin")
public class Admin {

    @Id
    @Column(name = "admin_id", length = 50)
    private String adminId;

    @Column(name = "role", length = 20)
    private String role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "managed_space_id")
    private Space managedSpace;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
