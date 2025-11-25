import 'package:flutter/material.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../widgets/home_top_bar.dart';
import '../widgets/mission_card_0.dart';
import '../widgets/mission_card_1.dart';
import '../../point/view/point_page.dart';
import '../../settings/view/settings_page.dart';
import '../../character/view/character_page.dart';
import '../../mission/view/mission_page.dart';

class HomePage extends StatefulWidget {
  final Function(TabItem)? onTabChanged;

  const HomePage({
    super.key,
    this.onTabChanged,
  });

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  TabItem _currentTab = TabItem.home;

  // Dynamic states for home page
  bool _isAirConditionerOn = false;
  bool _isLightOn = false;
  double _currentTemperature = 23.5;
  double _lightPowerUsage = 1.2; // kWh
  double _todaySavings = 0.7; // kWh
  int _participatedMissions = 2;
  int _earnedPoints = 120;
  double _departmentAverage = 12; // percentage
  String _characterLevel = 'Lv.2';
  double _todayGrowth = 4; // percentage
  String _currentLocation = 'pc22실';

  void _toggleAirConditioner() {
    setState(() {
      _isAirConditionerOn = !_isAirConditionerOn;
      if (_isAirConditionerOn) {
        _currentTemperature = 22.0;
        _todaySavings -= 0.1;
        _earnedPoints -= 5;
      } else {
        _currentTemperature = 23.5;
        _todaySavings += 0.1;
        _earnedPoints += 5;
      }
    });
  }

  void _toggleLight() {
    setState(() {
      _isLightOn = !_isLightOn;
      if (_isLightOn) {
        _lightPowerUsage = 2.5;
        _todaySavings -= 0.2;
        _earnedPoints -= 10;
      } else {
        _lightPowerUsage = 1.2;
        _todaySavings += 0.2;
        _earnedPoints += 10;
      }
    });
  }

  void _navigateToPowerControl() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => MissionPage(
          onTabChanged: widget.onTabChanged,
        ),
      ),
    );
  }

  void _navigateToCharacterPage() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => CharacterPage(
          onTabChanged: widget.onTabChanged,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HomeTopBar(
        onNotificationPressed: () {
          debugPrint('알림 클릭');
        },
        onSettingsPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => const SettingsPage(),
            ),
          );
        },
      ),
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
                    _buildMotivationalBanner(),
                    const SizedBox(height: 24),
                    _buildLocationAndPowerInfo(),
                    const SizedBox(height: 16),
                    _buildDeviceControlCards(),
                    const SizedBox(height: 24),
                    _buildSavingsStatusCard(),
                    const SizedBox(height: 24),
                    _buildCharacterSection(),
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

  Widget _buildMotivationalBanner() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '당신의 실천이',
          style: TextStyle(
            color: Color(0xFF0A0A0A),
            fontSize: 24,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w500,
            height: 1.25,
            letterSpacing: -0.45,
          ),
        ),
        const SizedBox(height: 4),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Expanded(
              child: Text(
                '우리 캠퍼스를 푸르게 합니다',
                style: TextStyle(
                  color: Color(0xFF0A0A0A),
                  fontSize: 24,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w500,
                  height: 1.25,
                  letterSpacing: -0.45,
                ),
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              '🍀',
              style: TextStyle(
                color: Color(0xFF0A0A0A),
                fontSize: 24,
                fontFamily: 'Inter',
                fontWeight: FontWeight.w500,
                height: 1.33,
                letterSpacing: 0.07,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildLocationAndPowerInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              child: Text(
                '현재 위치 $_currentLocation',
                style: const TextStyle(
                  color: Color(0xFF0A0A0A),
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w400,
                  height: 1.50,
                  letterSpacing: -0.31,
                ),
              ),
            ),
            GestureDetector(
              onTap: _navigateToPowerControl,
              behavior: HitTestBehavior.opaque,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    '전력 제어',
                    style: TextStyle(
                      color: Color(0xFF495565),
                      fontSize: 16,
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.w500,
                      height: 1.25,
                      letterSpacing: -0.15,
                    ),
                  ),
                  const SizedBox(width: 4),
                  const Icon(
                    Icons.arrow_forward_ios,
                    size: 16,
                    color: Color(0xFF495565),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          '총 전력 사용량 ${_lightPowerUsage.toStringAsFixed(1)} kWh',
          style: const TextStyle(
            color: Color(0xFF495565),
            fontSize: 16,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w400,
            height: 1.25,
            letterSpacing: -0.15,
          ),
        ),
      ],
    );
  }

  Widget _buildDeviceControlCards() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        MissionCard1(
          title: '냉난방기',
          temperature: '${_currentTemperature.toStringAsFixed(1)}°C',
          isOn: _isAirConditionerOn,
          onTap: _toggleAirConditioner,
        ),
        MissionCard0(
          title: '전등',
          powerUsage: '${_lightPowerUsage.toStringAsFixed(1)} kWh',
          isOn: _isLightOn,
          onTap: _toggleLight,
        ),
      ],
    );
  }

  Widget _buildSavingsStatusCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: Colors.black.withValues(alpha: 0.1),
          width: 1.433,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Text(
                '🌱',
                style: TextStyle(
                  color: Color(0xFF0A0A0A),
                  fontSize: 20,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w400,
                  height: 1.40,
                  letterSpacing: -0.44,
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                '오늘의 절약 현황 카드',
                style: TextStyle(
                  color: Color(0xFF0A0A0A),
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w500,
                  height: 1.50,
                  letterSpacing: -0.31,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildSavingsRow('오늘의 절약량', '${_todaySavings.toStringAsFixed(1)} kWh'),
          const SizedBox(height: 8),
          _buildSavingsRow('참여 미션', '$_participatedMissions 개'),
          const SizedBox(height: 8),
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
            child: _buildSavingsRow('획득 포인트', '+ $_earnedPoints P'),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '학과 평균 대비',
                style: TextStyle(
                  color: Color(0xFF495565),
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w400,
                  height: 1.50,
                  letterSpacing: -0.31,
                ),
              ),
              Text(
                '+ ${_departmentAverage.toStringAsFixed(0)} %',
                style: const TextStyle(
                  color: Color(0xFF6BBF76),
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w400,
                  height: 1.50,
                  letterSpacing: -0.31,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSavingsRow(String label, String value) {
    final isPoints = label == '획득 포인트';
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Color(0xFF495565),
            fontSize: 16,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w400,
            height: 1.50,
            letterSpacing: -0.31,
          ),
        ),
        Text(
          value,
          style: TextStyle(
            color: const Color(0xFF0A0A0A),
            fontSize: 16,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w400,
            height: 1.50,
            letterSpacing: -0.31,
            decoration: isPoints ? TextDecoration.underline : null,
          ),
        ),
      ],
    );
  }

  Widget _buildCharacterSection() {
    return GestureDetector(
      onTap: _navigateToCharacterPage,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.black.withValues(alpha: 0.1),
            width: 1.433,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8.717, vertical: 2.717),
                  decoration: BoxDecoration(
                    color: const Color(0xFF6BBF76),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _characterLevel,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.w500,
                      height: 1,
                    ),
                  ),
                ),
                const SizedBox(width: 11),
                const Text(
                  '나의 캐릭터',
                  style: TextStyle(
                    color: Color(0xFF0A0A0A),
                    fontSize: 16,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w400,
                    height: 1.50,
                    letterSpacing: -0.31,
                  ),
                ),
              ],
            ),
            Text.rich(
              TextSpan(
                children: [
                  const TextSpan(
                    text: '오늘의 성장률',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.w400,
                      height: 1,
                    ),
                  ),
                  TextSpan(
                    text: ' +${_todayGrowth.toStringAsFixed(0)}%',
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.w500,
                      height: 1,
                    ),
                  ),
                ],
              ),
              textAlign: TextAlign.right,
            ),
          ],
        ),
      ),
    );
  }
}



