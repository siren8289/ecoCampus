
# 📘 PRD v3.2 (Behavior + IoT + AI 통합 버전)

## EcoCampus+

**에너지 절약형 스마트 캠퍼스 & 참여형 ESG 플랫폼**

---

## 4️⃣ 전체 시스템 구성 (High-level Architecture) — 수정본

### 📌 *행동 중심* 시스템 구조

![Image](https://www.researchgate.net/publication/369047070/figure/fig1/AS%3A11431281125158345%401678219211367/oT-based-smart-campus.png)

```
[학생 행동]
 (강의실 이용 / 이동 / 체류 / 절약 행동)
        │
        ▼
[BLE Beacon]
 (공간 단위 신호 송출)
        │
        ▼
[Raspberry Pi]
 (RSSI 스캔 · 시간대 기록)
        │
        ▼
[Backend API Server]
        │
 ┌──────┼───────────────┐
 │      │               │
 ▼      ▼               ▼
ML Module        DL Module        LLM Module
(판별·추천)     (예측·이상탐지)  (설명·피드백)
        │
        ▼
[학생 App]        [관리자 Web]
(보상·추천)      (운영 판단)

```

👉 **Beacon + Raspberry Pi = ‘학생 행동을 자동으로 인식하는 센서 레이어’**

---

## 5️⃣ 행동 정의 재정의 (중요)

### 🔁 EcoCampus+에서의 “행동”이란?

| 구분 | 설명 |
| --- | --- |
| 👣 **물리적 행동** | 강의실 이용, 체류 시간, 이동 패턴 |
| 🌱 **절약 행동** | 비점유 공간 이탈, 집중 절약 시간대 참여 |
| 📲 **앱 행동** | 미션 참여, 확인, 보상 수령 |
| 📡 **센서 행동** | Beacon 신호 변화 (자동 인식) |

👉 **학생이 ‘누르지 않아도’ 발생하는 행동을Beacon + Raspberry Pi가 대신 기록**

---

## 6️⃣ Beacon & Raspberry Pi의 역할 (행동 관점)

### 6.1 BLE Beacon — *행동의 기준점*

- 공간 단위 고정 설치
- 지속적인 BLE 신호 송출
- “어디에서 행동이 일어났는지” 정의

📌 **Beacon은 ‘공간의 정체성’**

---

### 6.2 Raspberry Pi — *행동 감지기*

- Beacon RSSI 주기적 스캔
- 시간대별 신호 변화 기록
- 점유/비점유 **행동 패턴 원천 데이터 생성**

📌 **Raspberry Pi는 ‘행동 관찰자’**

---

## 7️⃣ 행동 → AI → UX 전환 흐름 (핵심)

### 📌 전체 행동 연동 플로우 (한 장)

![Image](https://www.researchgate.net/publication/390877082/figure/fig4/AS%3A11431281383514804%401744910810034/Software-and-Data-Transfer-Flow-Chart-Red-Beacon-module-sensor-and-BLE-data.tif)

```
[학생 행동]
   ↓
[Beacon 신호 변화]
   ↓
[Raspberry Pi RSSI 수집]
   ↓
[Backend 데이터 집계]
   ↓
ML: 점유 판별 / 추천 조건 생성
DL: 예측 / 이상 탐지
   ↓
LLM: 행동 의미 설명
   ↓
[학생 App UX]
 (추천 · 보너스 · 피드백)

```

---

## 8️⃣ AI 모듈별 ‘행동 해석’ 역할

### 8.1 ML — **행동 판별 & 추천**

- RSSI → 점유/비점유 판별
- “지금 행동하면 절약 효과 큼” 판단
- 추천 미션/보너스 조건 생성

📱 학생 App 반영

- 타이밍 미션 추천
- 고효율 미션 보너스

---

### 8.2 DL — **행동 맥락 이해 (예측·이상)**

- 평소와 다른 체류/사용 패턴 감지
- 낭비 가능성 높은 시간·공간 탐지

📱 학생 App 반영 (직접 노출 ❌)

- 🚨 집중 절약 챌린지
- 🕒 “지금 참여하면 의미 있음” 타이밍

---

### 8.3 LLM — **행동 의미 강화**

- 센서 + AI 결과를 자연어로 변환
- 학생에게 “왜 의미 있었는지” 설명

📱 예시

> “오늘 이 시간대는 평소보다 에너지 낭비 위험이 컸어요.
> 
> 
> 네 참여가 특히 도움이 됐어요 🌱”
> 

---

## 9️⃣ 학생 App에서의 ‘행동 기반 UX’ 정리

| 행동 발생 | 센서 | AI 처리 | UX 결과 |
| --- | --- | --- | --- |
| 강의실 체류 감소 | Beacon | ML | 절약 미션 인정 |
| 저녁 시간대 참여 | Beacon | DL | 보너스 +20P |
| 이상 사용 시간대 행동 | Beacon | DL+LLM | 의미 강화 피드백 |
| 반복 참여 | App 로그 | ML | 추천 정확도 상승 |

---

## 🔚 결론 (업데이트)

EcoCampus+는 단순 앱이 아니라,

> 학생의 ‘보이지 않는 행동’을센서(Beacon·Raspberry Pi)로 감지하고,AI로 해석해,UX(추천·보상·피드백)로 되돌려주는행동 기반 ESG 플랫폼이다.
> 
- Beacon/Raspberry Pi = **행동 감지**
- ML/DL = **행동 해석**
- LLM = **행동 의미 전달**
- App/Web = **행동의 결과 체험**

---

###
