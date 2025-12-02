import 'package:flutter/material.dart';
import 'top_bar_icon.dart';

class TopBar1 extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final VoidCallback? onBackPressed;
  final VoidCallback? onNotificationPressed;
  final bool showBackButton;
  final bool showNotificationButton;

  const TopBar1({
    super.key,
    required this.title,
    this.onBackPressed,
    this.onNotificationPressed,
    this.showBackButton = true,
    this.showNotificationButton = true,
  });

  @override
  Size get preferredSize => const Size.fromHeight(60);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(
            color: Color(0xFFFFFBF0),
            width: 0.718,
          ),
        ),
      ),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              // 왼쪽 뒤로가기 버튼
              if (showBackButton)
                Material(
                  color: Colors.transparent,
                  child: InkWell(
                    onTap: onBackPressed ?? () => Navigator.of(context).pop(),
                    borderRadius: BorderRadius.circular(8),
                    child: Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Center(
                        child: TopBarIcon(),
                      ),
                    ),
                  ),
                ),
              // 중앙 제목
              Expanded(
                child: Center(
                  child: Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF0A0A0A),
                      fontFamily: 'Inter',
                      letterSpacing: -0.4395,
                      height: 28 / 18,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
              // 오른쪽 알림 버튼
              if (showNotificationButton)
                GestureDetector(
                  onTap: onNotificationPressed,
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    width: 36,
                    height: 36,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Center(
                      child: _buildNotificationIcon(),
                    ),
                  ),
                )
              else
                const SizedBox(width: 36), // 공간 유지
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNotificationIcon() {
    return const Icon(
      Icons.notifications_outlined,
      size: 20,
      color: Color(0xFF0A0A0A),
    );
  }
}

