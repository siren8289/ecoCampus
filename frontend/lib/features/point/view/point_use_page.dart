import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../../../widgets/common/top_snack_bar.dart';
import '../widgets/point_header.dart';
import '../widgets/point_use_button.dart';

class PointUsePage extends StatefulWidget {
  final int currentPoints;
  final Function(int)? onPointsUsed;
  final Function(TabItem)? onTabChanged;

  const PointUsePage({
    super.key,
    this.currentPoints = 850,
    this.onPointsUsed,
    this.onTabChanged,
  });

  @override
  State<PointUsePage> createState() => _PointUsePageState();
}

class _PointUsePageState extends State<PointUsePage> {
  TabItem _currentTab = TabItem.my;
  late int _currentPoints;

  final List<Map<String, dynamic>> _vouchers = [
    {
      'title': '교내 식당 할인권',
      'discount': '10% 할인',
      'points': 1500,
      'icon': Icons.restaurant,
    },
    {
      'title': '교내 카페 할인권',
      'discount': '15% 할인',
      'points': 1500,
      'icon': Icons.local_cafe,
    },
    {
      'title': '책 물려받기',
      'discount': '10% 할인',
      'points': 2000,
      'icon': Icons.menu_book,
    },
    {
      'title': '교내 편의점 할인권',
      'discount': '10% 할인',
      'points': 1500,
      'icon': Icons.store,
    },
    {
      'title': '교내 마일리지',
      'discount': '10% 할인',
      'points': 1500,
      'icon': Icons.card_giftcard,
    },
    {
      'title': '커스텀 재료 구매',
      'discount': '10% 할인',
      'points': 1000,
      'icon': Icons.shopping_bag,
    },
  ];

  @override
  void initState() {
    super.initState();
    _currentPoints = widget.currentPoints;
  }

  void _handlePurchase(int index) {
    final voucher = _vouchers[index];
    final points = voucher['points'] as int;

    if (_currentPoints < points) {
      TopSnackBar.showError(context, '포인트가 부족합니다.');
      return;
    }

    setState(() {
      _currentPoints -= points;
    });

    widget.onPointsUsed?.call(_currentPoints);

    TopSnackBar.showSuccess(context, '${voucher['title']} 구매 완료!');
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
                              PointUseButton(
                                title: _vouchers[0]['title'] as String,
                                discount: _vouchers[0]['discount'] as String,
                                points: _vouchers[0]['points'] as int,
                                icon: _vouchers[0]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_vouchers[0]['points'] as int),
                                onTap: () => _handlePurchase(0),
                              ),
                              const SizedBox(height: 16),
                              PointUseButton(
                                title: _vouchers[1]['title'] as String,
                                discount: _vouchers[1]['discount'] as String,
                                points: _vouchers[1]['points'] as int,
                                icon: _vouchers[1]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_vouchers[1]['points'] as int),
                                onTap: () => _handlePurchase(1),
                              ),
                              const SizedBox(height: 16),
                              PointUseButton(
                                title: _vouchers[2]['title'] as String,
                                discount: _vouchers[2]['discount'] as String,
                                points: _vouchers[2]['points'] as int,
                                icon: _vouchers[2]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_vouchers[2]['points'] as int),
                                onTap: () => _handlePurchase(2),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            children: [
                              PointUseButton(
                                title: _vouchers[3]['title'] as String,
                                discount: _vouchers[3]['discount'] as String,
                                points: _vouchers[3]['points'] as int,
                                icon: _vouchers[3]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_vouchers[3]['points'] as int),
                                onTap: () => _handlePurchase(3),
                              ),
                              const SizedBox(height: 16),
                              PointUseButton(
                                title: _vouchers[4]['title'] as String,
                                discount: _vouchers[4]['discount'] as String,
                                points: _vouchers[4]['points'] as int,
                                icon: _vouchers[4]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_vouchers[4]['points'] as int),
                                onTap: () => _handlePurchase(4),
                              ),
                              const SizedBox(height: 16),
                              PointUseButton(
                                title: _vouchers[5]['title'] as String,
                                discount: _vouchers[5]['discount'] as String,
                                points: _vouchers[5]['points'] as int,
                                icon: _vouchers[5]['icon'] as IconData,
                                isAvailable: _currentPoints >= (_vouchers[5]['points'] as int),
                                onTap: () => _handlePurchase(5),
                              ),
                            ],
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
