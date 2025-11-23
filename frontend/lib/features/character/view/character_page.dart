import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../../../widgets/common/top_snack_bar.dart';
import '../widget/status_card.dart' show StatusCard, StatusCardType;
import '../widget/check_button.dart';
import '../widget/growth_button_0.dart';
import '../widget/growth_button_1.dart';
import '../widget/tree_character.dart';
import '../../point/view/point_page.dart';
import '../../mission/view/mission_page.dart';

class CharacterPage extends StatefulWidget {
  final Function(TabItem)? onTabChanged;

  const CharacterPage({
    super.key,
    this.onTabChanged,
  });

  @override
  State<CharacterPage> createState() => _CharacterPageState();
}

class _CharacterPageState extends State<CharacterPage> {
  TabItem _currentTab = TabItem.character;

  // 동적 데이터
  int _currentLevel = 2;
  int _nextLevel = 3;
  int _missionsToNextLevel = 13;
  double _progressPercentage = 0.35; // 35%
  
  // 오늘의 성장 데이터
  int _completedMissionsToday = 2;
  double _todayGrowthPercentage = 40.0; // +40%
  int _earnedPointsToday = 100;
  
  // 연속 미션 완료
  int _consecutiveDays = 3;
  
  // 주간 체크 상태 (7일) - 오늘 포함
  final List<bool> _weeklyCheckStatus = [true, true, true, false, false, false, false];

  // 미션 완료 시 호출
  void onMissionCompleted() {
    setState(() {
      _completedMissionsToday++;
      _earnedPointsToday += 50; // 미션당 50포인트
      _todayGrowthPercentage += 10.0; // 미션당 10% 증가
      
      // 다음 레벨까지 미션 수 감소
      if (_missionsToNextLevel > 0) {
        _missionsToNextLevel--;
      }
      
      // 진행률 업데이트 (13개 미션으로 0%에서 100%까지)
      _progressPercentage = ((13 - _missionsToNextLevel) / 13).clamp(0.0, 1.0);
      
      // 레벨업 체크
      if (_missionsToNextLevel == 0 && _currentLevel < _nextLevel) {
        _levelUp();
      }
    });
  }

  // 테스트용: 미션 완료 시뮬레이션
  void _simulateMissionComplete() {
    onMissionCompleted();
    updateConsecutiveDays();
  }

  // 레벨업 처리
  void _levelUp() {
    setState(() {
      _currentLevel = _nextLevel;
      _nextLevel++;
      _missionsToNextLevel = 13; // 다음 레벨까지 13개
      _progressPercentage = 0.0;
    });
    
    // 레벨업 알림 (상단에 표시)
    TopSnackBar.showSuccess(
      context,
      '축하합니다! Lv.$_currentLevel 달성!',
    );
  }

  // 연속 미션 완료 업데이트
  void updateConsecutiveDays() {
    setState(() {
      _consecutiveDays++;
      // 주간 체크 상태 업데이트
      if (_consecutiveDays <= 7) {
        _weeklyCheckStatus[_consecutiveDays - 1] = true;
      }
    });
  }

  // 미션 페이지로 이동
  void _navigateToMissionPage() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => MissionPage(
          onTabChanged: widget.onTabChanged,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const TopBar0(title: '성장'),
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // Lv.3 달성까지 배너
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF4F4F4),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: RichText(
                        textAlign: TextAlign.center,
                        text: TextSpan(
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.normal,
                            color: Color(0xFF0A0A0A),
                            fontFamily: 'Inter',
                            letterSpacing: -0.1504,
                            height: 20 / 16,
                          ),
                          children: [
                            TextSpan(
                              text: 'Lv.$_nextLevel',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF6BBF76),
                              ),
                            ),
                            const TextSpan(text: ' 달성까지 미션 '),
                            TextSpan(
                              text: '$_missionsToNextLevel개',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF6BBF76),
                              ),
                            ),
                            const TextSpan(text: ' 남았어요!'),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // 나무 캐릭터 - CustomPainter로 그린 나무
                    TreeCharacter(
                      level: _currentLevel,
                      progress: _progressPercentage,
                    ),
                    const SizedBox(height: 24),

                    // 레벨 정보 및 진행 바
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Lv.$_currentLevel 나무',
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.normal,
                                  color: Color(0xFF0A0A0A),
                                  fontFamily: 'Inter',
                                  letterSpacing: -0.4492,
                                  height: 28 / 24,
                                ),
                              ),
                              Text(
                                '${(_progressPercentage * 100).toStringAsFixed(0)}%',
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.w500,
                                  color: Color(0xFF0A0A0A),
                                  fontFamily: 'Inter',
                                  letterSpacing: -0.4492,
                                  height: 28 / 24,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          // 진행 바 - Figma 스타일
                          ClipRRect(
                            borderRadius: BorderRadius.circular(1000000),
                            child: LinearProgressIndicator(
                              value: _progressPercentage,
                              minHeight: 12,
                              backgroundColor: const Color(0xFF030213).withValues(alpha: 0.2),
                              valueColor: const AlwaysStoppedAnimation<Color>(
                                Color(0xFF6BBF76),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),

                    // 버튼들
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GrowthButton1(
                          text: '꾸미기',
                          onPressed: () {
                            TopSnackBar.showInfo(
                              context,
                              '꾸미기 기능은 준비 중입니다.',
                            );
                          },
                        ),
                        const SizedBox(width: 16),
                        GrowthButton0(
                          text: '미션하기',
                          onPressed: _navigateToMissionPage,
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    // 테스트용 버튼 (개발 중에만 사용)
                    TextButton(
                      onPressed: _simulateMissionComplete,
                      child: const Text(
                        '테스트: 미션 완료 시뮬레이션',
                        style: TextStyle(
                          fontSize: 12,
                          color: Color(0xFF6BBF76),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // 오늘의 성장 섹션
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: const Text(
                          '🌱 오늘의 성장',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.normal,
                            color: Color(0xFF0A0A0A),
                            fontFamily: 'Inter',
                            letterSpacing: -0.3125,
                            height: 24 / 16,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),

                    // StatusCard 3개 - Figma 디자인에 맞게 정확한 크기 (89.088px 각각, 8px 간격)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          StatusCard(
                            type: StatusCardType.missionComplete,
                            value: '$_completedMissionsToday개',
                          ),
                          const SizedBox(width: 8),
                          StatusCard(
                            type: StatusCardType.todayGrowth,
                            value: '+${_todayGrowthPercentage.toStringAsFixed(0)}% 증가',
                          ),
                          const SizedBox(width: 8),
                          GestureDetector(
                            onTap: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (context) => PointPage(
                                    onTabChanged: widget.onTabChanged,
                                  ),
                                ),
                              );
                            },
                            child: StatusCard(
                              type: StatusCardType.points,
                              value: '+${_earnedPointsToday}P',
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    // 연속 미션 완료 메시지
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Text(
                          '🔥 $_consecutiveDays일 연속 미션 완료했어요!',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.normal,
                            color: Color(0xFF0A0A0A),
                            fontFamily: 'Inter',
                            letterSpacing: -0.3125,
                            height: 24 / 16,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),

                    // 체크 버튼들 (7개) - 동적 상태
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Row(
                        children: List.generate(
                          7,
                          (index) => Padding(
                            padding: EdgeInsets.only(
                              right: index < 6 ? 8 : 0,
                            ),
                            child: CheckButton(
                              isChecked: _weeklyCheckStatus[index],
                            ),
                          ),
                        ),
                      ),
                    ),
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
}
