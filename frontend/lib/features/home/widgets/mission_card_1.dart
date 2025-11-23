import 'package:flutter/material.dart';

class MissionCard1 extends StatelessWidget {
  final String title;
  final String temperature;
  final bool isOn;
  final VoidCallback? onTap;

  const MissionCard1({
    super.key,
    required this.title,
    required this.temperature,
    this.isOn = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    // 상태에 따른 색상
    final backgroundColor = isOn ? const Color(0xFFF0FDF4) : const Color(0xFFF4F4F4);
    final iconBackgroundColor = isOn ? const Color(0xFF6BBF76) : const Color(0xFFD1D5DC);
    final statusButtonColor = isOn ? const Color(0xFFDCFCE7) : const Color(0xFFD1D5DC);
    final statusText = isOn ? '켜짐' : '꺼짐';

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 163.5,
        height: 201,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // 아이콘 (상단 중앙)
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: iconBackgroundColor,
                shape: BoxShape.circle,
              ),
              child: Center(
                child: _buildIcon(),
              ),
            ),
            const SizedBox(height: 6),
            // 제목
            SizedBox(
              height: 24,
              child: Center(
                child: Text(
                  title,
                  textAlign: TextAlign.center,
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
            ),
            const SizedBox(height: 4),
            // 상태 버튼
            Container(
              width: 50,
              height: 25,
              decoration: BoxDecoration(
                color: statusButtonColor,
                borderRadius: BorderRadius.circular(24046500),
              ),
              child: Center(
                child: Text(
                  statusText,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Color(0xFF495565),
                    fontSize: 14,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w400,
                    height: 1.14,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 5),
            // 실내 온도 라벨
            const SizedBox(
              height: 16,
              child: Center(
                child: Text(
                  '실내 온도',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Color(0xFF697282),
                    fontSize: 14,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w400,
                    height: 1.14,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 2),
            // 온도 값
            SizedBox(
              height: 20,
              child: Center(
                child: Text(
                  temperature,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Color(0xFF0A0A0A),
                    fontSize: 13,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w400,
                    height: 1.54,
                    letterSpacing: -0.15,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildIcon() {
    return Icon(
      Icons.ac_unit,
      size: 32,
      color: isOn ? const Color(0xFFFFB800) : const Color(0xFF4A5565),
    );
  }
}
