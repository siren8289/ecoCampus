import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_1.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../../../widgets/common/top_snack_bar.dart';
import '../widgets/grade_card.dart';
import '../widgets/iot_control_card.dart';
import '../widgets/filter_button.dart';
import '../widgets/campus_status_card.dart';
import '../widgets/today_mission_card.dart';
import 'mission_detail_page.dart';

class MissionPage extends StatefulWidget {
  final Function(TabItem)? onTabChanged;

  const MissionPage({
    super.key,
    this.onTabChanged,
  });

  @override
  State<MissionPage> createState() => _MissionPageState();
}

class _MissionPageState extends State<MissionPage> {
  TabItem _currentTab = TabItem.mission;
  String _selectedFilter = '전체';

  // 등급 정보
  String _currentGrade = '새싹 등급';
  double _gradeProgress = 0.25;
  int _pointsToNextGrade = 650;
  int _currentPoints = 200;

  // IoT 디바이스 상태
  bool _isLightOn = false;
  bool _isHvacOn = false;
  bool _isLightMissionActive = false;
  bool _isHvacMissionActive = false;
  Duration _lightMissionRemaining = const Duration(minutes: 0);
  Duration _hvacMissionRemaining = const Duration(minutes: 0);

  // 캠퍼스 절전 현황
  int _todaySavings = 1204; // kWh
  int _studentParticipation = 3450; // 회
  int _wastefulClassrooms = 3;

  // 미션 데이터
  final List<Map<String, dynamic>> _allMissions = [
    {
      'id': 'eco-story',
      'emoji': '📖',
      'title': '친환경 스토리',
      'points': 10,
      'progress': 0.25,
      'currentProgress': 1,
      'totalProgress': 4,
      'backgroundColor': const Color(0xFF7C5AB5),
      'category': '콘텐츠',
    },
    {
      'id': 'tumbler',
      'emoji': '☕',
      'title': '텀블러 사용 인증',
      'points': 10,
      'progress': 0.5,
      'currentProgress': 2,
      'totalProgress': 4,
      'backgroundColor': const Color(0xFFF19E47),
      'category': '재활용',
    },
    {
      'id': 'recycle',
      'emoji': '♻️',
      'title': '분리수거 챌린지',
      'points': 10,
      'progress': 0.25,
      'currentProgress': 1,
      'totalProgress': 4,
      'backgroundColor': const Color(0xFFAADDBC),
      'category': '재활용',
    },
    {
      'id': 'eco-mileage',
      'emoji': '🚌',
      'title': '에코 마일리지',
      'points': 10,
      'progress': 0.75,
      'currentProgress': 3,
      'totalProgress': 4,
      'backgroundColor': const Color(0xFF48C2E4),
      'category': '퀴즈',
    },
  ];

  List<Map<String, dynamic>> get _filteredMissions {
    if (_selectedFilter == '전체') {
      return _allMissions;
    }
    return _allMissions.where((mission) => mission['category'] == _selectedFilter).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F7F7),
      appBar: const TopBar1(
        title: '미션',
        showBackButton: true,
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
                    // 등급 카드
                    GradeCard(
                      currentGrade: _currentGrade,
                      progress: _gradeProgress,
                      pointsToNextGrade: _pointsToNextGrade,
                    ),
                    const SizedBox(height: 24),

                    // IoT 스마트 제어
                    const Text(
                      'IoT 스마트 제어',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF0A0A0A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.3125,
                        height: 24 / 24,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'BLE 연결됨',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w300,
                        color: Color(0xFF04993A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.3125,
                        height: 24 / 20,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      '현재 강의실의 기기를 제어하세요.',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF4A5565),
                        fontFamily: 'Inter',
                        letterSpacing: -0.3125,
                        height: 24 / 16,
                      ),
                    ),
                    const SizedBox(height: 16),
                    IotControlCard(
                      deviceName: '전등',
                      isDeviceOn: _isLightOn,
                      onToggle: (bool value) {
                        setState(() {
                          _isLightOn = value;
                          if (!value && !_isLightMissionActive) {
                            _startLightMission();
                          }
                        });
                      },
                      onMissionStart: () {
                        if (!_isLightOn) {
                          _startLightMission();
                        } else {
                          TopSnackBar.showInfo(context, '먼저 전등을 끄세요.');
                        }
                      },
                    ),
                    const SizedBox(height: 16),
                    IotControlCard(
                      deviceName: '냉난방기',
                      isDeviceOn: _isHvacOn,
                      onToggle: (bool value) {
                        setState(() {
                          _isHvacOn = value;
                          if (!value && !_isHvacMissionActive) {
                            _startHvacMission();
                          }
                        });
                      },
                      onMissionStart: () {
                        if (!_isHvacOn) {
                          _startHvacMission();
                        } else {
                          TopSnackBar.showInfo(context, '먼저 냉난방기를 끄세요.');
                        }
                      },
                    ),
                    const SizedBox(height: 24),

                    // 캠퍼스 절전 현황
                    const Text(
                      '캠퍼스 절전 현황',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF0A0A0A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.3125,
                        height: 24 / 24,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        CampusStatusCard(
                          type: CampusStatusType.todaySavings,
                          value: _todaySavings.toString().replaceAllMapped(
                                RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'),
                                (Match m) => '${m[1]},',
                              ),
                          unit: 'kWh',
                        ),
                        CampusStatusCard(
                          type: CampusStatusType.studentParticipation,
                          value: _studentParticipation.toString().replaceAllMapped(
                                RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'),
                                (Match m) => '${m[1]},',
                              ),
                          unit: '회',
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: Colors.black.withValues(alpha: 0.1),
                          width: 1,
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Text(
                                '💡',
                                style: TextStyle(fontSize: 20),
                              ),
                              const SizedBox(width: 8),
                              Text(
                                '낭비 의심 강의실 $_wastefulClassrooms개',
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.normal,
                                  color: Color(0xFF0A0A0A),
                                  fontFamily: 'Inter',
                                  letterSpacing: -0.1504,
                                  height: 20 / 16,
                                ),
                              ),
                            ],
                          ),
                          GestureDetector(
                            onTap: () {
                              if (_wastefulClassrooms > 0) {
                                setState(() {
                                  _wastefulClassrooms--;
                                  _studentParticipation++;
                                  _todaySavings += 50;
                                });
                                TopSnackBar.showSuccess(context, '절약 미션에 참여했습니다!');
                              }
                            },
                            behavior: HitTestBehavior.opaque,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xFF81D18A),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Text(
                                '절약하러 가기',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.normal,
                                  color: Color(0xFF0A0A0A),
                                  fontFamily: 'Inter',
                                  letterSpacing: -0.1504,
                                  height: 20 / 14,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    // 오늘의 미션
                    const Text(
                      '오늘의 미션',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF0A0A0A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.3125,
                        height: 24 / 20,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        FilterButton(
                          label: '전체',
                          isSelected: _selectedFilter == '전체',
                          onTap: () {
                            setState(() {
                              _selectedFilter = '전체';
                            });
                          },
                        ),
                        const SizedBox(width: 8),
                        FilterButton(
                          label: '재활용',
                          isSelected: _selectedFilter == '재활용',
                          onTap: () {
                            setState(() {
                              _selectedFilter = '재활용';
                            });
                          },
                        ),
                        const SizedBox(width: 8),
                        FilterButton(
                          label: '퀴즈',
                          isSelected: _selectedFilter == '퀴즈',
                          onTap: () {
                            setState(() {
                              _selectedFilter = '퀴즈';
                            });
                          },
                        ),
                        const SizedBox(width: 8),
                        FilterButton(
                          label: '콘텐츠',
                          isSelected: _selectedFilter == '콘텐츠',
                          onTap: () {
                            setState(() {
                              _selectedFilter = '콘텐츠';
                            });
                          },
                        ),
                        const SizedBox(width: 8),
                        FilterButton(
                          label: '공모전',
                          isSelected: _selectedFilter == '공모전',
                          onTap: () {
                            setState(() {
                              _selectedFilter = '공모전';
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ..._filteredMissions.map((mission) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: TodayMissionCard(
                            emoji: mission['emoji'] as String,
                            title: mission['title'] as String,
                            points: mission['points'] as int,
                            progress: mission['progress'] as double,
                            currentProgress: mission['currentProgress'] as int,
                            totalProgress: mission['totalProgress'] as int,
                            backgroundColor: mission['backgroundColor'] as Color,
                            onTap: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (context) => MissionDetailPage(
                                    missionId: mission['id'] as String,
                                  ),
                                ),
                              ).then((result) {
                                // 미션 완료 시 업데이트
                                if (result == true) {
                                  _updateMissionProgress(mission['id'] as String);
                                }
                              });
                            },
                          ),
                        )),
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

  void _startLightMission() {
    setState(() {
      _isLightMissionActive = true;
      _lightMissionRemaining = const Duration(minutes: 10);
    });
    _runLightMissionTimer();
  }

  void _startHvacMission() {
    setState(() {
      _isHvacMissionActive = true;
      _hvacMissionRemaining = const Duration(minutes: 10);
    });
    _runHvacMissionTimer();
  }

  void _runLightMissionTimer() {
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted && _isLightMissionActive) {
        setState(() {
          if (_lightMissionRemaining.inSeconds > 0) {
            _lightMissionRemaining = Duration(seconds: _lightMissionRemaining.inSeconds - 1);
            _runLightMissionTimer();
          } else {
            _completeLightMission();
          }
        });
      }
    });
  }

  void _runHvacMissionTimer() {
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted && _isHvacMissionActive) {
        setState(() {
          if (_hvacMissionRemaining.inSeconds > 0) {
            _hvacMissionRemaining = Duration(seconds: _hvacMissionRemaining.inSeconds - 1);
            _runHvacMissionTimer();
          } else {
            _completeHvacMission();
          }
        });
      }
    });
  }

  void _completeLightMission() {
    setState(() {
      _isLightMissionActive = false;
      _currentPoints += 50;
      _studentParticipation++;
      _todaySavings += 20;
      _updateGradeProgress();
    });
    TopSnackBar.showSuccess(context, '전등 절전 미션 완료! +50P 획득');
  }

  void _completeHvacMission() {
    setState(() {
      _isHvacMissionActive = false;
      _currentPoints += 50;
      _studentParticipation++;
      _todaySavings += 30;
      _updateGradeProgress();
    });
    TopSnackBar.showSuccess(context, '냉난방기 절전 미션 완료! +50P 획득');
  }

  void _updateGradeProgress() {
    // 등급 진행률 업데이트
    if (_currentPoints >= 850) {
      setState(() {
        _currentGrade = '나무 등급';
        _gradeProgress = 0.0;
        _pointsToNextGrade = 1000;
      });
    } else {
      setState(() {
        _gradeProgress = _currentPoints / 850;
        _pointsToNextGrade = 850 - _currentPoints;
      });
    }
  }

  void _updateMissionProgress(String missionId) {
    setState(() {
      final missionIndex = _allMissions.indexWhere((m) => m['id'] == missionId);
      if (missionIndex != -1) {
        final mission = _allMissions[missionIndex];
        final currentProgress = mission['currentProgress'] as int;
        final totalProgress = mission['totalProgress'] as int;
        
        if (currentProgress < totalProgress) {
          _allMissions[missionIndex]['currentProgress'] = currentProgress + 1;
          _allMissions[missionIndex]['progress'] = (currentProgress + 1) / totalProgress;
          
          if (currentProgress + 1 == totalProgress) {
            // 미션 완료
            _currentPoints += mission['points'] as int;
            _studentParticipation++;
            _updateGradeProgress();
            TopSnackBar.showSuccess(
              context,
              '${mission['title']} 미션 완료! +${mission['points']}P 획득',
            );
          }
        }
      }
    });
  }
}
