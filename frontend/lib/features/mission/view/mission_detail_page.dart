import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../widgets/classroom_card.dart';
import '../widgets/device_control_card.dart';
import '../widgets/move_mission_card.dart';
import '../widgets/timer_card.dart';

class MissionDetailPage extends StatefulWidget {
  final String missionId;

  const MissionDetailPage({
    super.key,
    required this.missionId,
  });

  @override
  State<MissionDetailPage> createState() => _MissionDetailPageState();
}

class _MissionDetailPageState extends State<MissionDetailPage> {
  TabItem _currentTab = TabItem.mission;
  bool _lightOn = true;
  bool _hvacOn = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F7F7),
      appBar: const TopBar0(title: '미션 상세'),
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // 제어할 강의실 선택 섹션
                    const Center(
                      child: Column(
                        children: [
                          Text(
                            '제어할 강의실 선택',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF0A0A0A),
                              fontFamily: 'Inter',
                              letterSpacing: -0.3125,
                              height: 24 / 20,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'BLE 범위 내에서 감지된 강의실입니다',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.normal,
                              color: Color(0xFF04993A),
                              fontFamily: 'Inter',
                              letterSpacing: -0.1504,
                              height: 20 / 16,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),

                    // 강의실 카드들
                    Column(
                      children: [
                        ClassroomCard(
                          classroomName: '정보문화관 PC34실',
                          signalStrength: 'B',
                          status: '신호: 강함 | 25명 | 혼잡도: 보통',
                          onTap: () {
                            debugPrint('정보문화관 PC34실 선택');
                          },
                        ),
                        const SizedBox(height: 12),
                        ClassroomCard(
                          classroomName: '정보문화관 PC33실',
                          signalStrength: 'A',
                          status: '신호: 강함 | 3명 | 혼잡도: 여유',
                          onTap: () {
                            debugPrint('정보문화관 PC33실 선택');
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),

                    // IoT 기기 제어 카드들
                    DeviceControlCard(
                      deviceName: '전등',
                      deviceType: '전등(Light)',
                      info: '소비전력: 8W',
                      isOn: _lightOn,
                      onToggle: (value) {
                        setState(() {
                          _lightOn = value;
                        });
                      },
                      iconBackgroundColor: const Color(0xFFFFF8AE),
                    ),
                    const SizedBox(height: 12),
                    DeviceControlCard(
                      deviceName: '냉난방기',
                      deviceType: '냉난방기(HVAC)',
                      info: '실내온도: 22.8°C',
                      isOn: _hvacOn,
                      onToggle: (value) {
                        setState(() {
                          _hvacOn = value;
                        });
                      },
                      iconBackgroundColor: const Color(0xFFE3F2FD),
                    ),
                    const SizedBox(height: 24),

                    // 자리 이동 미션 카드
                    MoveMissionCard(
                      nearbyClassroom: '정보문화관 PC33실(3명 / 여유)',
                      onMove: () {
                        debugPrint('자리 이동하고 보상 받기');
                      },
                    ),
                    const SizedBox(height: 24),

                    // 타이머 카드
                    TimerCard(
                      remainingTime: '10:00',
                      message: '미션 시작을 위해 전원을 먼저 꺼주세요.',
                    ),
                    const SizedBox(height: 24),

                    // 하단 링크
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GestureDetector(
                          onTap: () {
                            debugPrint('IoT 미션 가이드');
                          },
                          child: const Text(
                            'IoT 미션 가이드',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.normal,
                              color: Color(0xFF4A5565),
                              fontFamily: 'Inter',
                              letterSpacing: -0.1504,
                              height: 20 / 16,
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        const Text(
                          '|',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.normal,
                            color: Color(0xFF4A5565),
                            fontFamily: 'Inter',
                            letterSpacing: -0.1504,
                            height: 20 / 14,
                          ),
                        ),
                        const SizedBox(width: 12),
                        GestureDetector(
                          onTap: () {
                            debugPrint('자세히 보기');
                          },
                          child: const Text(
                            '자세히 보기',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.normal,
                              color: Color(0xFF4A5565),
                              fontFamily: 'Inter',
                              letterSpacing: -0.1504,
                              height: 20 / 16,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            // 하단 탭바
            BottomTabBar(
              currentTab: _currentTab,
              onTabChanged: (tab) {
                setState(() {
                  _currentTab = tab;
                });
                // 탭 변경 시 네비게이션 처리
                if (tab != TabItem.mission) {
                  Navigator.of(context).popUntil((route) => route.isFirst);
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
