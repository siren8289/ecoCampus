# Project Progress & Changelog

## 2026-01-30: NativeWind Removal & Home Page Refactor

### 🚀 Major Changes
1.  **NativeWind & TailwindCSS Completely Removed**
    - Uninstalled `nativewind`, `tailwindcss`, `clsx`, `tailwind-merge`.
    - Removed `tailwind.config.js`, `nativewind-env.d.ts`.
    - Reset `babel.config.js` and `metro.config.js` to Expo defaults.
    - Deleted `lib/utils.ts` (unused `cn` utility).

2.  **Home Page (`app/index.tsx`) Redesign**
    - Refactored to match "Capstone Design" layout.
    - **Header:** Implemented Green Profile Card with user stats (Name, Department, Points, Level).
    - **Smart Control Center:** Added AI Mission styling and IoT controls.
    - **Layout:** optimized spacing and styling using standard React Native `StyleSheet` / inline styles.
    - **Fix:** Removed nested `SafeAreaView` top padding to fix spacing issues.

3.  **Global Header Adjustment**
    - Restored global header in `app/_layout.tsx` to appear on all pages.

### 🛠 Refactoring Status
All `className` attributes have been converted to inline styles in:
- `app/_layout.tsx`
- `app/index.tsx` (Home)
- `app/mission.tsx`
- `app/points.tsx`
- `app/character.tsx`
- `app/quiz.tsx`
- `app/mypage.tsx`
- `app/ranking.tsx`
- `app/success.tsx`
- `features/**` components
- `components/ui/**` components

### ✅ Verification
- Application builds and runs without NativeWind dependencies.

## 🐛 트러블 슈팅 (Troubleshooting)

### 1. `react-native-reanimated` 충돌 및 앱 크래시
- **증상**: 앱 실행 시 즉시 종료되거나 "Worklet mismatch" 에러 발생.
- **원인**: Expo SDK 54와 NativeWind v4, Reanimated 간의 버전 호환성 문제 및 설정 충돌.
- **해결**:
    - `nativewind`, `tailwindcss`, `react-native-reanimated` 완전 삭제.
    - 스타일 시스템을 React Native 기본 `StyleSheet` 및 인라인 스타일로 전면 교체.

### 2. Metro Bundler 설정 오류 (`nativewind/metro`)
- **증상**: `npx expo start --clear` 실행 시 `Cannot find module 'nativewind/metro'` 에러 발생.
- **원인**: 패키지는 삭제했으나 `metro.config.js`에 NativeWind 설정 코드가 남아있었음.
- **해결**: `metro.config.js`를 Expo 기본 설정으로 초기화 (`getDefaultConfig`만 사용).

### 3. 중복 Import 구문 오류
- **증상**: `SyntaxError: Identifier 'React' has already been declared`.
- **원인**: `app/index.tsx` 수정 중 파일 내용을 덮어쓰지 않고 뒤에 추가되어 import 구문이 중복됨.
- **해결**: 중복된 코드를 제거하고 깔끔한 상태로 파일 재작성.

### 4. 헤더 중복 및 레이아웃 깨짐
- **증상**: 홈 화면 상단에 헤더가 두 개 뜨거나, 상단 여백이 너무 넓게 잡힘.
- **원인**:
    - `_layout.tsx`의 전역 헤더와 홈 화면의 커스텀 헤더가 겹침.
    - `index.tsx` 내부 `SafeAreaView`에 `top` 엣지가 적용되어 이중 패딩 발생.
- **해결**:
    - `index.tsx`의 `SafeAreaView`에서 `edges={['left', 'right']}`로 설정하여 상단 패딩 제거.
    - (참고) 전역 헤더는 사용자 요청으로 다시 복구함.
