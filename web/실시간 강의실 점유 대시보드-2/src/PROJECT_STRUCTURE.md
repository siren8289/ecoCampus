# 📐 프로젝트 구조 (3단 계층 아키텍처)

## 🎯 구조 기준: 역할 기준 분리

### 1️⃣ **UI Layer** (`/components`)
재사용 가능한 기본 UI 컴포넌트

```
/components/
├── ui/                    # shadcn/ui 기반 기본 UI 컴포넌트
│   ├── button.tsx
│   ├── card.tsx
│   ├── table.tsx
│   └── ...
├── common/                # 프로젝트 공통 컴포넌트
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Table.tsx
│   ├── SearchInput.tsx
│   ├── StatusCard.tsx
│   └── ...
└── figma/                 # Figma 전용 컴포넌트
    └── ImageWithFallback.tsx
```

**역할**: 앱 전체에서 재사용되는 순수 UI 컴포넌트

---

### 2️⃣ **Feature Layer** (`/features`)
기능별 비즈니스 로직이 포함된 모듈

```
/features/
├── dashboard/             # 대시보드 기능 모듈
│   ├── AIInsightCard.tsx
│   ├── AnomalyAlert.tsx
│   ├── RoomCard.tsx
│   └── SystemStatusPanel.tsx
│
├── room-detail/           # 강의실 상세 기능 모듈
│   ├── AIAnalysisPanel.tsx
│   ├── BeaconInfoPanel.tsx
│   ├── EventLogTable.tsx
│   ├── RSSIGraph.tsx
│   └── ThresholdSettings.tsx
│
├── system-monitor/        # 시스템 모니터 기능 모듈
│   ├── BeaconListTable.tsx
│   ├── ScannerStatusList.tsx
│   └── SystemStatusPanel.tsx
│
└── admin/                 # 관리자 기능 모듈
    ├── ChangeHistoryTable.tsx
    ├── RoomManagement.tsx
    ├── ThresholdManagement.tsx
    └── UserPermission.tsx
```

**역할**: 특정 기능에 특화된 컴포넌트 + 비즈니스 로직

---

### 3️⃣ **Page Layer** (`/pages`)
라우팅 페이지 (Feature 조합)

```
/pages/
├── dashboard/
│   └── Dashboard.tsx           # Feature: dashboard 사용
│
├── room-detail/
│   └── RoomDetail.tsx          # Feature: room-detail 사용
│
├── system-monitor/
│   └── SystemMonitor.tsx       # Feature: system-monitor 사용
│
├── admin/
│   └── Admin.tsx               # Feature: admin 사용
│
├── admin-settings/
│   └── AdminSettings.tsx       # Feature: admin 사용
│
└── not-found/
    └── NotFound.tsx
```

**역할**: React Router와 연결되는 페이지 레벨 컴포넌트

---

## 📊 Import 규칙

### ✅ 올바른 의존성 방향
```
Page → Feature → UI
```

### 예시:

```tsx
// ❌ 잘못된 예: Feature에서 다른 Feature 직접 import
// /features/dashboard/RoomCard.tsx
import { AIAnalysisPanel } from '../room-detail/AIAnalysisPanel'; // ❌

// ✅ 올바른 예: Page에서 Feature 조합
// /pages/dashboard/Dashboard.tsx
import { RoomCard } from '../../features/dashboard/RoomCard';
import { AIInsightCard } from '../../features/dashboard/AIInsightCard';
```

---

## 🗂️ 기타 구조

```
/
├── App.tsx                  # 엔트리포인트
├── routes.ts                # React Router 설정
├── utils/                   # 유틸리티 함수
│   └── mockData.ts
├── styles/                  # 전역 스타일
│   └── globals.css
└── components/Layout.tsx    # 레이아웃 컴포넌트
```

---

## 🔧 유지보수 가이드

### Feature 추가 시:
1. `/features/새기능명/` 폴더 생성
2. 필요한 컴포넌트 작성
3. `/pages/` 에서 조합하여 사용

### 컴포넌트 분류 기준:
- **UI**: 어디서든 재사용 가능한 순수 UI (버튼, 카드, 인풋 등)
- **Feature**: 특정 도메인 로직이 포함된 컴포넌트 (대시보드 카드, 분석 패널 등)
- **Page**: URL과 1:1 매칭되는 라우팅 페이지

---

## 📦 현재 구조 요약

| Layer    | 경로                  | 개수 | 역할                          |
|----------|----------------------|------|------------------------------|
| **UI**   | `/components`        | 30+  | 재사용 UI 컴포넌트            |
| **Feature** | `/features`       | 13   | 기능별 비즈니스 로직          |
| **Page** | `/pages`             | 6    | 라우팅 페이지                |

---

## ✨ 장점

✅ **명확한 책임 분리**: 각 레이어가 명확한 역할을 가짐  
✅ **유지보수 용이**: 기능별로 파일이 모여있어 찾기 쉬움  
✅ **확장성**: 새 기능 추가 시 독립적으로 개발 가능  
✅ **테스트 용이**: Feature 단위로 독립적 테스트 가능  
✅ **재사용성**: UI 레이어는 프로젝트 전체에서 재사용  
