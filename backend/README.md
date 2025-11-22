# EcoCampus Backend API

Flask 기반 백엔드 API 서버입니다.

## 설정 방법

1. 가상환경 활성화:
```bash
source venv/bin/activate  # macOS/Linux
# 또는
venv\Scripts\activate  # Windows
```

2. 의존성 설치:
```bash
pip install -r requirements.txt
```

3. 환경 변수 설정:
```bash
cp .env.example .env
# .env 파일을 편집하여 필요한 설정을 추가하세요
```

4. 서버 실행:
```bash
python app.py
```

서버는 기본적으로 `http://localhost:5000`에서 실행됩니다.

## API 엔드포인트

- `GET /` - API 상태 확인
- `GET /health` - 헬스 체크

## 개발

개발 모드에서는 자동 리로드가 활성화됩니다. 코드를 수정하면 서버가 자동으로 재시작됩니다.

