# 1. Build Stage
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Gradle Wrapper 복사 (캐시 활용을 위해 먼저 복사)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY api/build.gradle api/
COPY sensor/build.gradle sensor/

# 권한 설정
RUN chmod +x ./gradlew

# 의존성 다운로드 (소스코드 복사 전)
# --no-daemon: 데몬 프로세스 사용 안 함 (CI/CD 환경 최적화)
RUN ./gradlew dependencies --no-daemon

# 소스코드 복사 및 빌드
COPY . .
RUN ./gradlew :api:bootJar --no-daemon -x test

# 2. Run Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 빌드 결과물(jar)만 복사
COPY --from=builder /app/api/build/libs/*-SNAPSHOT.jar app.jar

# 기본 포트 노출
EXPOSE 8080

# 애플리케이션 실행
# prod 프로파일 활성화를 위해 -Dspring.profiles.active=prod 옵션 추가 가능
ENTRYPOINT ["java", "-jar", "app.jar"]
