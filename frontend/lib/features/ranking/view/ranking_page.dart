import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../widgets/my_ranking_card.dart';
import '../widgets/ranking_tab_list.dart';
import '../widgets/period_selector.dart';

class RankingPage extends StatefulWidget {
  final Function(TabItem)? onTabChanged;

  const RankingPage({
    super.key,
    this.onTabChanged,
  });

  @override
  State<RankingPage> createState() => _RankingPageState();
}

class _RankingPageState extends State<RankingPage> {
  TabItem _currentTab = TabItem.ranking;
  RankingType _selectedRankingType = RankingType.individual;
  PeriodType _selectedPeriod = PeriodType.daily;

  // 내 순위 정보
  final int _myRank = 12;
  final String _myName = '나환경';
  final String _myDepartment = '사무행정과';
  final int _myPoints = 850;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFFFBF0),
      appBar: const TopBar0(title: '랭킹'),
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    // 동기부여 배너
                    Container(
                      height: 40,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: const Color(0xFFFFEBAA),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Center(
                        child: Text(
                          '오늘도 절약 실천, 함께 만드는 캠퍼스 변화',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.normal,
                            color: Color(0xFF0A0A0A),
                            fontFamily: 'Inter',
                            letterSpacing: -0.3125,
                            height: 24 / 16,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),

                    // 내 순위 카드
                    MyRankingCard(
                      rank: _myRank,
                      name: _myName,
                      department: _myDepartment,
                      points: _myPoints,
                    ),
                    const SizedBox(height: 16),

                    // 탭 리스트
                    RankingTabList(
                      selectedType: _selectedRankingType,
                      onTypeChanged: (type) {
                        setState(() {
                          _selectedRankingType = type;
                        });
                      },
                    ),
                    const SizedBox(height: 16),

                    // 전체 랭킹 제목
                    const Text(
                      '🏆 전체 랭킹',
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

                    // 기간 선택
                    PeriodSelector(
                      selectedPeriod: _selectedPeriod,
                      onPeriodChanged: (period) {
                        setState(() {
                          _selectedPeriod = period;
                        });
                      },
                    ),
                    const SizedBox(height: 16),

                    // 랭킹 리스트 (추후 구현)
                    _buildRankingList(),
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

  Widget _buildRankingList() {
    // TODO: 실제 랭킹 데이터를 표시
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(
            '${_selectedRankingType == RankingType.individual ? '개인' : '학과'} 랭킹 (${_getPeriodLabel()})',
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF0A0A0A),
              fontFamily: 'Inter',
              letterSpacing: -0.3125,
              height: 24 / 16,
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            '랭킹 리스트는 추후 구현됩니다.',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.normal,
              color: Color(0xFF666666),
              fontFamily: 'Inter',
            ),
          ),
        ],
      ),
    );
  }

  String _getPeriodLabel() {
    switch (_selectedPeriod) {
      case PeriodType.daily:
        return '일간';
      case PeriodType.weekly:
        return '주간';
      case PeriodType.monthly:
        return '월간';
    }
  }
}
