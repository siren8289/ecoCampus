import 'package:flutter/material.dart';
import '../../../widgets/common/top_bar_0.dart';
import '../../../widgets/common/bottom_tab_bar.dart' show TabItem, BottomTabBar;
import '../../../widgets/common/top_snack_bar.dart';

class SettingsPage extends StatefulWidget {
  final Function(TabItem)? onTabChanged;

  const SettingsPage({
    super.key,
    this.onTabChanged,
  });

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  TabItem _currentTab = TabItem.my;
  String _userName = '나환경';
  String _department = '사무행정과';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const TopBar0(title: '설정'),
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

                    // 내 정보
                    _buildSectionTitle('내 정보'),
                    const SizedBox(height: 4),
                    _buildMenuItem(
                      title: '계정',
                      onTap: () {
                        debugPrint('계정 클릭');
                      },
                    ),

                    const SizedBox(height: 16),

                    // 나의 활동
                    _buildSectionTitle('나의 활동'),
                    const SizedBox(height: 4),
                    _buildMenuItem(
                      title: '완료한 미션',
                      onTap: () {
                        debugPrint('완료한 미션 클릭');
                      },
                    ),
                    _buildMenuItem(
                      title: '포인트 사용 내역',
                      onTap: () {
                        debugPrint('포인트 사용 내역 클릭');
                      },
                    ),

                    const SizedBox(height: 16),

                    // 설정
                    _buildSectionTitle('설정'),
                    const SizedBox(height: 4),
                    _buildMenuItem(
                      title: '알림 설정',
                      onTap: () {
                        debugPrint('알림 설정 클릭');
                      },
                    ),
                    _buildMenuItem(
                      title: '앱 설정',
                      onTap: () {
                        debugPrint('앱 설정 클릭');
                      },
                    ),

                    const SizedBox(height: 16),

                    // 고객지원
                    _buildSectionTitle('고객지원'),
                    const SizedBox(height: 4),
                    _buildMenuItem(
                      title: '고객센터',
                      onTap: () {
                        debugPrint('고객센터 클릭');
                      },
                    ),
                    _buildMenuItem(
                      title: 'FAQ',
                      onTap: () {
                        debugPrint('FAQ 클릭');
                      },
                    ),
                    _buildMenuItem(
                      title: '문의하기',
                      onTap: () {
                        debugPrint('문의하기 클릭');
                      },
                    ),

                    const SizedBox(height: 16),

                    // 계정에서 나가기
                    _buildSectionTitle('계정에서 나가기'),
                    const SizedBox(height: 4),
                    _buildMenuItem(
                      title: '로그아웃',
                      onTap: _handleLogout,
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
      padding: const EdgeInsets.all(16.709),
      decoration: BoxDecoration(
        color: const Color(0xFFFFEBAA),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFD1D5DC),
          width: 0.718,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              // 프로필 아이콘
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: const Color(0xFFF4F4F4),
                  shape: BoxShape.circle,
                ),
                child: const Center(
                  child: Icon(
                    Icons.person,
                    size: 24,
                    color: Color(0xFF0A0A0A),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              // 이름 및 학과
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _userName,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF0A0A0A),
                      fontFamily: 'Inter',
                      letterSpacing: -0.3125,
                      height: 24 / 20,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _department,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF4A5565),
                      fontFamily: 'Inter',
                      letterSpacing: -0.1504,
                      height: 20 / 16,
                    ),
                  ),
                ],
              ),
            ],
          ),
          // 편집 버튼
          GestureDetector(
            onTap: _handleEditProfile,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
              decoration: BoxDecoration(
                border: Border.all(
                  color: const Color(0xFFD1D5DC),
                  width: 1,
                ),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    '편집',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF999999),
                      fontFamily: 'Inter',
                      letterSpacing: -0.1504,
                      height: 20 / 14,
                    ),
                  ),
                  const SizedBox(width: 4),
                  const Icon(
                    Icons.edit,
                    size: 12,
                    color: Color(0xFF999999),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.normal,
        color: Color(0xFF696969), // dimgrey
        fontFamily: 'Inter',
        letterSpacing: -0.3125,
        height: 24 / 14,
      ),
    );
  }

  Widget _buildMenuItem({
    required String title,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 56.7,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: const BoxDecoration(
          color: Colors.white,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.normal,
                color: Color(0xFF0A0A0A),
                fontFamily: 'Inter',
                letterSpacing: -0.3125,
                height: 24 / 16,
              ),
            ),
            const Icon(
              Icons.arrow_forward_ios,
              size: 20,
              color: Color(0xFF0A0A0A),
            ),
          ],
        ),
      ),
    );
  }

  void _handleEditProfile() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('프로필 편집'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: const InputDecoration(
                labelText: '이름',
                border: OutlineInputBorder(),
              ),
              controller: TextEditingController(text: _userName),
              onChanged: (value) {
                setState(() {
                  _userName = value;
                });
              },
            ),
            const SizedBox(height: 16),
            TextField(
              decoration: const InputDecoration(
                labelText: '학과',
                border: OutlineInputBorder(),
              ),
              controller: TextEditingController(text: _department),
              onChanged: (value) {
                setState(() {
                  _department = value;
                });
              },
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('취소'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              TopSnackBar.showSuccess(context, '프로필이 수정되었습니다.');
            },
            child: const Text('저장'),
          ),
        ],
      ),
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

