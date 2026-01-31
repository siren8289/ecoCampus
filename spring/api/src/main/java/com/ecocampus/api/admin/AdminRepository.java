package com.ecocampus.api.admin;

import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<Entity타입, ID타입>을 상속받으면 기본적인 CRUD 메서드(save, findById, findAll, delete 등)가 자동으로 구현됩니다.
// @Repository 어노테이션이 없어도 자동으로 빈으로 등록됩니다.
public interface AdminRepository extends JpaRepository<Admin, String> {
}
