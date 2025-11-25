# EcoCampus Backend 구조

## 파일 배치 위치

### 루트 디렉토리 (`/backend/`)
- `app.py` - Flask 앱 초기화 및 설정
- `config.py` - Flask 설정 (DATABASE_URL, SECRET_KEY, DEBUG 등)
- `requirements.txt` - Python 패키지 의존성
- `.env` - 환경 변수 (이미 존재)
- `.gitignore` - Git 무시 파일 (이미 존재)

### 모델 (`/backend/models/`)
- `__init__.py` - 모델 패키지 초기화
- `user.py` - User 모델 (사용자 정보, 레벨, 포인트 등)
- `mission.py` - Mission 모델 (미션 정보, 상태, 보상 등)
- `point.py` - Point 모델 (포인트 거래 내역)
- `ranking.py` - Ranking 모델 (주간/월간 랭킹)

### 유틸리티 (`/backend/utils/`)
- `__init__.py` - 유틸리티 패키지 초기화
- `common.py` - 공통 함수 (success_response, error_response 등)

### 라우트 (`/backend/routes/`)
- `__init__.py` - 라우트 패키지 초기화
- `home.py` - 홈/미션 관련 라우트 (A 담당)
- `my.py` - 내정보 관련 라우트 (B 담당)
- `point.py` - 포인트 관련 라우트 (B 담당)
- `ranking.py` - 랭킹 관련 라우트 (C 담당)
- `settings.py` - 설정 관련 라우트 (C 담당)

## 디렉토리 구조

```
backend/
├── app.py
├── config.py
├── requirements.txt
├── .env
├── .gitignore
├── models/
│   ├── __init__.py
│   ├── user.py
│   ├── mission.py
│   ├── point.py
│   └── ranking.py
├── utils/
│   ├── __init__.py
│   └── common.py
└── routes/
    ├── __init__.py
    ├── home.py
    ├── my.py
    ├── point.py
    ├── ranking.py
    └── settings.py
```

## 주요 기능

### config.py
- 환경 변수 기반 설정 관리
- Development, Production, Testing 환경 분리
- DATABASE_URL, SECRET_KEY, DEBUG 등 설정

### app.py
- Flask 앱 팩토리 패턴 사용
- SQLAlchemy DB 초기화
- CORS 설정
- Blueprint 등록
- Health check 엔드포인트

### Models
- **User**: 사용자 정보, 레벨, 포인트, 통계
- **Mission**: 미션 정보, 상태, 보상, 시간
- **Point**: 포인트 거래 내역, 잔액 추적
- **Ranking**: 주간/월간/전체 랭킹

### Utils
- `success_response()`: 성공 응답 생성
- `error_response()`: 에러 응답 생성
- `validation_error()`: 검증 에러 응답
- `not_found_error()`: 404 에러 응답
- `unauthorized_error()`: 401 에러 응답
- `forbidden_error()`: 403 에러 응답

## 다음 단계

1. `requirements.txt`에 Flask-SQLAlchemy 추가됨 (이미 완료)
2. 각 담당자가 routes 파일에 API 엔드포인트 구현
3. `.env` 파일에 필요한 환경 변수 설정
4. 데이터베이스 마이그레이션 설정 (선택사항)


