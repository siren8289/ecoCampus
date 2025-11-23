import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../../../widgets/common/top_snack_bar.dart';
import '../widgets/activity_card.dart';
import '../widgets/stat_badge.dart';
import '../../settings/view/settings_page.dart';
import '../../point/view/point_page.dart';

class MyPage extends StatefulWidget {
  final Function(TabItem)? onTabChanged;

  const MyPage({
    super.key,
    this.onTabChanged,
  });

  @override
  State<MyPage> createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  TabItem _currentTab = TabItem.my;

  // 사용자 정보
  String _userName = '나환경';
  String _department = '사무행정과';
  String _level = '나무 Lv.2';
  int _points = 1250;
  int _completedMissions = 42;
  int _ranking = 12;

  // 활동 내역
  final List<Map<String, dynamic>> _activities = [
    {
      'title': '절전 미션 성공',
      'timeAgo': '2시간 전',
      'points': '+50P',
      'isPositive': true,
      'backgroundColor': const Color(0xFFF0F9F1),
    },
    {
      'title': '절전 미션 성공',
      'timeAgo': '5시간 전',
      'points': '+30P',
      'isPositive': true,
      'backgroundColor': const Color(0xFFF0F9F1),
    },
    {
      'title': '포인트 기부',
      'timeAgo': '1일 전',
      'points': '-300P',
      'isPositive': false,
      'backgroundColor': const Color(0xFFFFF9E6),
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const TopBar0(title: '마이페이지'),
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
                    // 사용자 프로필 카드
                    _buildProfileCard(),
                    const SizedBox(height: 16),

                    // 나의 활동
                    _buildActivitySection(),
                    const SizedBox(height: 16),

                    // 계정 관리
                    _buildAccountSection(),
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
                if (widget.onTabChanged != null) {
                  widget.onTabChanged!(tab);
                }
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileCard() {
    return Container(
      padding: const EdgeInsets.all(24.718),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: const Color(0xFFD1D5DC),
          width: 0.718,
        ),
      ),
      child: Column(
        children: [
          // 프로필 정보
          Row(
            children: [
              // 프로필 아이콘
              Container(
                width: 70,
                height: 70,
                decoration: BoxDecoration(
                  color: const Color(0xFFF4F4F4),
                  shape: BoxShape.circle,
                ),
                child: const Center(
                  child: Icon(
                    Icons.person,
                    size: 40,
                    color: Color(0xFF0A0A0A),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              // 이름 및 학과
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _userName,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF333333),
                        fontFamily: 'Inter',
                        letterSpacing: -0.3125,
                        height: 24 / 16,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      _department,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF666666),
                        fontFamily: 'Inter',
                        letterSpacing: -0.1504,
                        height: 20 / 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    // 레벨 배지
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFF81D18A),
                        borderRadius: BorderRadius.circular(1000000),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(
                            Icons.eco,
                            size: 14,
                            color: Colors.white,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            _level,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.normal,
                              color: Colors.white,
                              fontFamily: 'Inter',
                              height: 16 / 14,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 40),
          // 통계 배지
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              StatBadge(
                type: StatBadgeType.points,
                value: '${_points.toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}P',
              ),
              StatBadge(
                type: StatBadgeType.missions,
                value: '$_completedMissions 개',
              ),
              StatBadge(
                type: StatBadgeType.ranking,
                value: '$_ranking위',
                hasBorder: true,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActivitySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              '나의 활동',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.normal,
                color: Color(0xFF101828),
                fontFamily: 'Inter',
                letterSpacing: -0.3125,
                height: 24 / 16,
              ),
            ),
            GestureDetector(
              onTap: () {
                // 포인트 페이지로 이동 (활동 내역 보기)
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => PointPage(
                          onTabChanged: widget.onTabChanged,
                        ),
                  ),
                );
              },
              behavior: HitTestBehavior.opaque,
              child: const Text(
                '전체보기',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF81D18A),
                  fontFamily: 'Inter',
                  letterSpacing: -0.1504,
                  height: 20 / 14,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ..._activities.map((activity) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: ActivityCard(
                title: activity['title'] as String,
                timeAgo: activity['timeAgo'] as String,
                points: activity['points'] as String,
                isPositive: activity['isPositive'] as bool,
                backgroundColor: activity['backgroundColor'] as Color,
              ),
            )),
      ],
    );
  }

  Widget _buildAccountSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '계정 관리',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.normal,
            color: Color(0xFF101828),
            fontFamily: 'Inter',
            letterSpacing: -0.3125,
            height: 24 / 16,
          ),
        ),
        const SizedBox(height: 8),
        // 내 정보 수정
        GestureDetector(
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => const SettingsPage(),
              ),
            );
          },
          behavior: HitTestBehavior.opaque,
          child: Container(
            height: 52,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  '내 정보 수정',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF1E2939),
                    fontFamily: 'Inter',
                    letterSpacing: -0.1504,
                    height: 20 / 14,
                  ),
                ),
                const Icon(
                  Icons.arrow_forward_ios,
                  size: 16,
                  color: Color(0xFF0A0A0A),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
        // 로그아웃
        GestureDetector(
          onTap: _handleLogout,
          behavior: HitTestBehavior.opaque,
          child: Container(
            height: 52,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  '로그아웃',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFFFB2C36),
                    fontFamily: 'Inter',
                    letterSpacing: -0.1504,
                    height: 20 / 14,
                  ),
                ),
                const Icon(
                  Icons.arrow_forward_ios,
                  size: 16,
                  color: Color(0xFF0A0A0A),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  void _handleLogout() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('로그아웃'),
        content: const Text('정말 로그아웃하시겠습니까?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('취소'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              TopSnackBar.showSuccess(context, '로그아웃되었습니다.');
              // TODO: 실제 로그아웃 로직 구현
            },
            child: const Text('로그아웃'),
          ),
        ],
      ),
    );
  }
}
