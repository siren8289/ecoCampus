import 'package:flutter/material.dart';

class TreeCharacter extends StatelessWidget {
  final int level;
  final double progress; // 0.0 ~ 1.0

  const TreeCharacter({
    super.key,
    required this.level,
    this.progress = 0.0,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 128,
      height: 127,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // 배경 원 (선택사항)
          CustomPaint(
            size: const Size(128, 127),
            painter: TreePainter(level: level, progress: progress),
          ),
          // 이모지로 대체 (더 명확한 시각적 표현)
          Center(
            child: Text(
              _getTreeEmoji(),
              style: TextStyle(
                fontSize: 128 * (0.7 + progress * 0.3), // 진행률에 따라 크기 조정
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _getTreeEmoji() {
    // 레벨에 따라 다른 나무 이모지
    switch (level) {
      case 1:
        return '🌱'; // 새싹
      case 2:
        return '🌳'; // 나무
      case 3:
        return '🌲'; // 전나무
      case 4:
        return '🌴'; // 야자수
      default:
        return '🌳'; // 기본 나무
    }
  }
}

class TreePainter extends CustomPainter {
  final int level;
  final double progress;

  TreePainter({
    required this.level,
    required this.progress,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // 진행률에 따른 글로우 효과 (선택사항)
    if (progress > 0.8) {
      final glowPaint = Paint()
        ..color = const Color(0xFF6BBF76).withValues(alpha: 0.3)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10);
      
      canvas.drawCircle(
        Offset(size.width / 2, size.height / 2),
        size.width * 0.4,
        glowPaint,
      );
    }
  }

  @override
  bool shouldRepaint(TreePainter oldDelegate) {
    return oldDelegate.level != level || oldDelegate.progress != progress;
  }
}

