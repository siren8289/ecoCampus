# EcoCampus AI 모듈

에너지 데이터를 씹고 뜯고 맛보고 즐겨서, AI 판단과 친절한 설명까지 해주는 모듈입니다.

## 📌 한눈에 보기
이 모듈은 크게 3단계로 돌아갑니다.

1.  **데이터 전처리 (Data Prep)**
    - 월별로 뭉뚱그려진 공공데이터를 **시간대별 기준 패턴(Baseline)**으로 쪼갭니다.
    - 정규화 싹 하고, 계절/요일 태그 붙이고, 건물 타입에 맞춰서 보정까지 끝냅니다.
    - 결과물: DB에 `baseline_energy_pattern` 테이블로 저장됨.

2.  **AI 판단 (Inference)**
    - **ML 모델 (상태 판별)**: 지금 방이 `사람 있음/없음`, 전기를 `쓰는 중/낭비 중`인지 판단합니다.
    - **DL 모델 (가치 판단)**: 지금 전기를 아끼면 얼마나 이득인지 **가치 점수(0~1)**와 **등급(HIGH/MID/RISK)**을 매깁니다.

3.  **LLM 설명 (Explanation)**
    - AI가 판단한 결과를 **사람이 이해하기 쉬운 말**로 바꿔줍니다.
    - *왜* 아껴야 하는지, *지금 당장 뭘* 해야 하는지 한 줄로 딱 알려줍니다.

---

## 📂 폴더 구조

```text
ai/
├── preprocessing/          # 1단계: 데이터 전처리
│   ├── baseline_builder.py # 월별 데이터를 시간별 패턴으로 변환
│   ├── schema.sql          # DB 테이블 스키마
│   └── run.sh              # 실행 스크립트
│
├── inference/              # 2, 3단계: AI 모델 & API
│   ├── ml_model.py         # 상태 분류기 (ML)
│   ├── dl_model.py         # 가치 판단기 (DL)
│   ├── api.py              # FastAPI 서버 (통합 엔드포인트)
│   └── verify.py           # 테스트용 스크립트
│
├── explanation/            # 3단계: LLM
│   └── llm_client.py       # LLM 연동 클라이언트 (Mock/API)
│
└── data/                   # 원본 CSV 데이터 파일들
```

---

## � Spring Boot 연동 (Backend)
Spring 서버(`:api`)가 Python AI 서버를 호출해서 결과를 DB에 저장합니다.

- **AIClient**: `RestTemplate`으로 `/ai/infer` 찌릅니다.
- **AIService**: 공간 정보랑 센서 데이터 합쳐서 AI한테 물어보고, 결과(`AiInferenceLog`)를 저장합니다.
- **AIController**: 테스트용으로 `POST /api/ai/infer/{spaceId}` 만들어뒀습니다.

---

## �🚀 돌려보기

### 1. 데이터 준비 (DB 초기화)
기준 패턴을 생성해서 PostgreSQL에 때려 넣습니다.

```bash
# 그냥 테스트만 해보기 (DB 저장 안 함)
./ai/preprocessing/run.sh --dry-run

# 진짜로 실행 (DB 저장)
./ai/preprocessing/run.sh
```

### 2. AI 서버 띄우기
FastAPI 서버를 켜서 AI 판단이랑 설명을 받아봅니다.

```bash
# 가상환경 켜고
source ai/venv/bin/activate

# 서버 시작
uvicorn ai.inference.api:app --reload
```

---

## ⚡ API 사용법

### 요청: `POST /ai/infer`
판단 결과랑 설명을 한방에 받습니다.

**보낼 때:**
```json
{
    "building_id": "lib_101",
    "current_load": 0.8,
    "temperature": 25.0,
    "timestamp": "2025-06-01T14:00:00"
}
```

**받을 때:**
```json
{
    "building_id": "lib_101",
    "timestamp": "2025-06-01T14:00:00",
    "presence_status": "Occupied",
    "usage_status": "Active",
    "value_zone": "MID",
    "value_score": 0.5,
    "explanation": "에너지 절약이 가능합니다. 사용 중이지만 불필요한 기기는 없는지 확인해보세요."
}
```

---

## 🛠 테스트
서버 안 띄우고 로직만 잘 도나 확인할 때 씁니다.

```bash
# 기본 모델 로직 테스트
python -m ai.inference.verify

# LLM 엔드포인트 테스트
python -m ai.inference.verify_llm
```
