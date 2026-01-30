package com.ecocampus.api.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto {
    private String adminId;
    private String role;
    private String managedSpaceId;
    private LocalDateTime createdAt;
}
