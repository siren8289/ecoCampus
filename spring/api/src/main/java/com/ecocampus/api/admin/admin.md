# Admin 모듈 구조 및 역할 설명

Spring Boot의 계층형 아키텍처(Layered Architecture)에 따라 Admin 모듈이 어떻게 구성되어 있는지 설명합니다.

## 📁 파일 구성 및 역할

### 1. **Presentation Layer (표현 계층)**
- **파일**: `AdminController.java`
- **역할**: 사용자의 요청(Request)을 가장 먼저 받는 곳입니다. 
- **하는 일**:
  - 클라이언트가 보내는 HTTP 요청(GET, POST 등)을 받습니다.
  - 요청 데이터를 검증하거나 필요한 형태로 가공합니다.
  - 어떤 비즈니스 로직을 수행할지 `Service`에게 일을 시킵니다.
  - 로직 수행 결과를 `DTO`에 담아 클라이언트에게 응답(Response)합니다.

### 2. **Business Logic Layer (비즈니스 계층)**
- **파일**: `AdminService.java`
- **역할**: 실제 업무 로직(비즈니스 로직)이 수행되는 "두뇌" 역할을 합니다.
- **하는 일**:
  - `Controller`로부터 요청을 전달받습니다.
  - "관리자를 생성한다", "권한을 확인한다"와 같은 구체적인 작업을 수행합니다.
  - 데이터 저장이 필요하면 `Repository`를 호출하여 DB 작업을 요청합니다.
  - 트랜잭션(@Transactional)을 관리하여 데이터의 무결성을 보장합니다.

### 3. **Data Access Layer (데이터 접근 계층)**
- **파일**: `AdminRepository.java`
- **역할**: 데이터베이스(DB)와 직접 대화하는 창구입니다.
- **하는 일**:
  - Spring Data JPA(`JpaRepository`)를 사용하여 복잡한 SQL 없이 DB 작업을 처리합니다.
  - `save()`(저장), `findById()`(조회), `delete()`(삭제) 같은 메서드를 자동으로 제공합니다.

### 4. **Domain/Entity (데이터 도메인)**
- **파일**: `Admin.java`
- **역할**: 데이터베이스의 테이블과 1:1로 매핑되는 핵심 데이터 객체입니다.
- **특징**:
  - `@Entity` 어노테이션이 붙어 있습니다.
  - DB 테이블의 각 컬럼(id, name, role 등)이 필드로 정의되어 있습니다.
  - 이 객체의 상태가 변하면 DB의 데이터도 변할 수 있으므로 신중하게 다뤄야 합니다.

### 5. **DTO (Data Transfer Object)**
- **파일**: `AdminDto.java`
- **역할**: 계층(Controller ↔ Service) 간에 데이터를 주고받을 때 사용하는 "택배 박스"입니다.
- **왜 쓰는가?**:
  - `Entity`는 DB와 강하게 연결되어 있어 함부로 외부에 노출하면 위험합니다.
  - 필요한 정보만 담아서 안전하게 전달하기 위해 `Entity` 대신 `DTO`를 사용합니다.

---

## 🔄 데이터 흐름 예시 (관리자 생성 요청 시)

1.  **사용자**가 `/api/admins`로 관리자 생성 요청(POST)을 보냅니다.
2.  **`AdminController`**가 요청을 받아 `AdminDto`에 데이터를 담습니다.
3.  **`AdminController`**는 `AdminService.createAdmin()`을 호출합니다.
4.  **`AdminService`**는 `AdminDto`의 내용을 보고 새로운 **`Admin`**(Entity) 객체를 만듭니다.
5.  **`AdminService`**는 `AdminRepository.save()`를 호출하여 DB 저장을 요청합니다.
6.  **`AdminRepository`**는 JPA를 통해 실제 DB에 `INSERT` 쿼리를 날립니다.
7.  저장이 완료되면 역순으로 결과가 반환되어 **사용자**에게 "생성 성공" 응답이 전달됩니다.
