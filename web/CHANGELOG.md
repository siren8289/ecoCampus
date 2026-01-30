# Web Project Progress & Changelog

## 0: Design Porting & TroubleShooting

### 🚀 Major Changes
1.  **Design Reference Source**
    - The `web` project served as the design authority for the App refactor.
    - Key designs (Home Page, Smart Control Center) were ported to the React Native App.

## 🐛 트러블 슈팅 (Troubleshooting)

### 1. 웹-앱 디자인 일관성 동기화
- **이슈**: 웹 버전(`캡스톤 디자인`)의 화려한 UI(그라디언트, 그림자, 유리모피즘)를 앱으로 그대로 가져오기 어려움.
- **해결**:
    - React Native의 `View` 스타일과 `shadow` 속성을 활용해 유사한 느낌 구현.
    - CSS `backdrop-filter` 대신 투명도(`rgba`)와 레이어 겹치기를 통해 유리 효과(Glassmorphism) 흉내.
    - `lucide-react` 아이콘을 `lucide-react-native`로 대체 매핑.

### 2. TailwindCSS 의존성 제거
- **이슈**: 웹에서는 TailwindCSS가 잘 작동하지만, 앱(Expo Native)에서는 설정 및 버전 충돌로 인해 불안정함.
- **결정**: 앱 안정성을 위해 앱 프로젝트에서는 Tailwind/NativeWind를 제거하고, 웹의 디자인 토큰(색상, 간격)을 수동으로 인라인 스타일에 적용하는 방식을 택함.
