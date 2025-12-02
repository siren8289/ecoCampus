import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../widgets/point_header.dart';
import '../widgets/weekly_activity_card.dart';
import '../widgets/point_history_item.dart';
import 'point_use_page.dart';
import 'point_donate_page.dart';

class PointPage extends StatefulWidget {
  final Function(TabItem)? onTabChanged;

  const PointPage({
    super.key,
    this.onTabChanged,
  });

  @override
  State<PointPage> createState() => _PointPageState();
}

class _PointPageState extends State<PointPage> {
  TabItem _currentTab = TabItem.my;
  int _currentPoints = 850;
  final int _weeklyIncrease = 240;

  // 이번주 활동 데이터
  final Map<String, int> _dailyPoints = {
    '월': 50,
    '화': 50,
    '수': 0,
    '목': 0,
    '금': 0,
  };

  final List<Map<String, dynamic>> _weeklyActivities = [
    {'emoji': '💡', 'title': '전등 끄기', 'points': 50},
    {'emoji': '❄️', 'title': '냉난방기 끄기', 'points': 50},
  ];

  final int _usedPoints = 300;

  // 최근 활동 데이터
  final List<Map<String, dynamic>> _recentActivities = [
    {
      'emoji': '🍽️',
      'title': '절전 미션 성공!',
      'date': '2025.11.10 09:43',
      'points': 50,
    },
    {
      'emoji': '🌍',
      'title': '공모전 미션 성공!',
      'date': '2025.11.09 14:22',
      'points': 100,
    },
    {
      'emoji': '⏰',
      'title': '콘센트 사용 미션 성공!',
      'date': '2025.11.08 11:15',
      'points': 20,
    },
    {
      'emoji': '♻️',
      'title': '재활용 미션 성공!',
      'date': '2025.11.07 16:30',
      'points': 20,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F7F7),
      appBar: const TopBar0(title: '포인트'),
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
                    // 포인트 헤더
                    PointHeader(
                      currentPoints: _currentPoints,
                      weeklyIncrease: _weeklyIncrease,
                      weeklyMessage: '이번주 미션 완료로 +$_weeklyIncrease 상승!',
                    ),
                    const SizedBox(height: 16),

                    // 사용하기/기부하기 버튼
                    Row(
                      children: [
                        Expanded(
                          child: GestureDetector(
                            onTap: _handleUsePoints,
                            behavior: HitTestBehavior.opaque,
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              decoration: BoxDecoration(
                                color: const Color(0xFFEBEBEB),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Center(
                                child: Text(
                                  '사용하기',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                    color: Color(0xFF030213),
                                    fontFamily: 'Inter',
                                    letterSpacing: -0.1504,
                                    height: 20 / 14,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: GestureDetector(
                            onTap: _handleDonatePoints,
                            behavior: HitTestBehavior.opaque,
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              decoration: BoxDecoration(
                                color: const Color(0xFFEBEBEB),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Center(
                                child: Text(
                                  '기부하기',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                    color: Color(0xFF030213),
                                    fontFamily: 'Inter',
                                    letterSpacing: -0.1504,
                                    height: 20 / 14,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),

                    // 이번주 활동
                    const Text(
                      '이번주 활동',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF0A0A0A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.4395,
                        height: 28 / 18,
                      ),
                    ),
                    const SizedBox(height: 16),
                    WeeklyActivityCard(
                      isActive: true,
                      dailyPoints: _dailyPoints,
                      usedPoints: _usedPoints,
                      activities: _weeklyActivities,
                    ),
                    const SizedBox(height: 24),

                    // 최근 활동
                    const Text(
                      '최근 활동',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF0A0A0A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.4395,
                        height: 28 / 18,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ..._recentActivities.map((activity) => Padding(
                          padding: const EdgeInsets.only(bottom: 12.0),
                          child: PointHistoryItem(
                            emoji: activity['emoji'] as String,
                            title: activity['title'] as String,
                            date: activity['date'] as String,
                            points: activity['points'] as int,
                          ),
                        )),
                    const SizedBox(height: 16), // 하단 여백 추가
                  ],
                ),
              ),
            ),
            // 하단 탭바
            BottomTabBar(
              currentTab: _currentTab,
              onTabChanged: (tab) {
                if (widget.onTabChanged != null) {
                  widget.onTabChanged!(tab);
                } else {
                  setState(() {
                    _currentTab = tab;
                  });
                }
              },
            ),
          ],
        ),
      ),
    );
  }

  void _handleUsePoints() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => PointUsePage(
          currentPoints: _currentPoints,
          onPointsUsed: (newPoints) {
            setState(() {
              _currentPoints = newPoints;
            });
          },
          onTabChanged: widget.onTabChanged,
        ),
      ),
    );
  }

  void _handleDonatePoints() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => PointDonatePage(
          currentPoints: _currentPoints,
          onPointsDonated: (newPoints) {
            setState(() {
              _currentPoints = newPoints;
            });
          },
          onTabChanged: widget.onTabChanged,
        ),
      ),
    );
  }
}

