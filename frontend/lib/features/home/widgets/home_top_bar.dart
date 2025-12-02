import 'package:flutter/material.dart';

class HomeTopBar extends StatelessWidget implements PreferredSizeWidget {
  final VoidCallback? onNotificationPressed;
  final VoidCallback? onSettingsPressed;

  const HomeTopBar({
    super.key,
    this.onNotificationPressed,
    this.onSettingsPressed,
  });

  @override
  Size get preferredSize => const Size.fromHeight(72);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 72,
      decoration: const BoxDecoration(
        color: Colors.white,
      ),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // 왼쪽 로고
              _buildLogo(),
              // 오른쪽 아이콘들
              Row(
                children: [
                  // 알림 아이콘
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
                  ),
                  const SizedBox(width: 8),
                  // 설정 아이콘
                  GestureDetector(
                    onTap: onSettingsPressed,
                    behavior: HitTestBehavior.opaque,
                    child: Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Center(
                        child: _buildSettingsIcon(),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return RichText(
      text: const TextSpan(
        children: [
          TextSpan(
            text: 'eco',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF81D18A),
              fontFamily: 'Inter',
            ),
          ),
          TextSpan(
            text: 'campus',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF0A0A0A),
              fontFamily: 'Inter',
            ),
          ),
          TextSpan(
            text: '+',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF81D18A),
              fontFamily: 'Inter',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationIcon() {
    return const Icon(
      Icons.notifications_outlined,
      size: 24,
      color: Color(0xFF0A0A0A),
    );
  }

  Widget _buildSettingsIcon() {
    return const Icon(
      Icons.settings_outlined,
      size: 24,
      color: Color(0xFF0A0A0A),
    );
  }
}
