import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../../../widgets/common/top_snack_bar.dart';
import '../widgets/point_header.dart';
import '../widgets/point_donate_button.dart';

class PointDonatePage extends StatefulWidget {
  final int currentPoints;
  final Function(int)? onPointsDonated;
  final Function(TabItem)? onTabChanged;

  const PointDonatePage({
    super.key,
    this.currentPoints = 850,
    this.onPointsDonated,
    this.onTabChanged,
  });

  @override
  State<PointDonatePage> createState() => _PointDonatePageState();
}

class _PointDonatePageState extends State<PointDonatePage> {
  TabItem _currentTab = TabItem.my;
  late int _currentPoints;

  final List<Map<String, dynamic>> _donations = [
    {
      'title': '책 물려받기',
      'points': 700,
      'icon': Icons.menu_book,
    },
    {
      'title': '장학금 포인트 기부',
      'points': 3000,
      'icon': Icons.school,
    },
    {
      'title': '봉사시간 전환',
      'points': 2500,
      'icon': Icons.volunteer_activism,
    },
  ];

  @override
  void initState() {
    super.initState();
    _currentPoints = widget.currentPoints;
  }

  void _handleDonate(int index) {
    final donation = _donations[index];
    final points = donation['points'] as int;

    if (_currentPoints < points) {
      TopSnackBar.showError(context, '포인트가 부족합니다.');
      return;
    }

    setState(() {
      _currentPoints -= points;
    });

    widget.onPointsDonated?.call(_currentPoints);

    TopSnackBar.showSuccess(context, '${donation['title']} 기부 완료!');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
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
                    PointHeader(
                      currentPoints: _currentPoints,
                      weeklyIncrease: 240,
                      weeklyMessage: '이번주 미션 완료로 +240 상승!',
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      'Point 교환권 🎁',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF0A0A0A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.3125,
                        height: 24 / 16,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Column(
                            children: [
                              PointDonateButton(
                                title: _donations[0]['title'] as String,
                                points: _donations[0]['points'] as int,
                                icon: _donations[0]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_donations[0]['points'] as int),
                                onTap: () => _handleDonate(0),
                              ),
                              const SizedBox(height: 16),
                              PointDonateButton(
                                title: _donations[1]['title'] as String,
                                points: _donations[1]['points'] as int,
                                icon: _donations[1]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_donations[1]['points'] as int),
                                onTap: () => _handleDonate(1),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: PointDonateButton(
                            title: _donations[2]['title'] as String,
                            points: _donations[2]['points'] as int,
                            icon: _donations[2]['icon'] as IconData,
                            isAvailable: _currentPoints >= (_donations[2]['points'] as int),
                            onTap: () => _handleDonate(2),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
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
}
