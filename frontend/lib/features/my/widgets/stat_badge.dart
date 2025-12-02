import 'package:flutter/material.dart';

enum StatBadgeType {
  points,      // 보유 포인트
  missions,    // 완료 미션
  ranking,     // 현재 랭킹
}

class StatBadge extends StatelessWidget {
  final StatBadgeType type;
  final String value;
  final Color? backgroundColor;
  final bool hasBorder;

  const StatBadge({
    super.key,
    required this.type,
    required this.value,
    this.backgroundColor,
    this.hasBorder = false,
  });

  @override
  Widget build(BuildContext context) {
    final bgColor = backgroundColor ?? _getDefaultBackgroundColor();
    final label = _getLabel();

    return Container(
      height: 94,
      padding: const EdgeInsets.all(1),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(14),
        border: hasBorder
            ? Border.all(
                color: const Color(0xFFEBEBEB),
                width: 1,
              )
            : null,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // 아이콘
          Icon(
            _getIcon(),
            size: 20,
            color: const Color(0xFF666666),
          ),
          const SizedBox(height: 6),
          // 라벨
          SizedBox(
            height: 16,
            child: Center(
              child: Text(
                label,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: Color(0xFF666666),
                  fontFamily: 'Inter',
                  height: 16 / 14,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          const SizedBox(height: 6),
          // 값
          SizedBox(
            height: 24,
            child: Center(
              child: Text(
                value,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                  color: Color(0xFF333333),
                  fontFamily: 'Inter',
                  letterSpacing: -0.3125,
                  height: 24 / 16,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Color _getDefaultBackgroundColor() {
    switch (type) {
      case StatBadgeType.points:
        return const Color(0xFFFFEBAA);
      case StatBadgeType.missions:
        return const Color(0xFFCAF1CE);
      case StatBadgeType.ranking:
        return Colors.white;
    }
  }

  IconData _getIcon() {
    switch (type) {
      case StatBadgeType.points:
        return Icons.account_balance_wallet;
      case StatBadgeType.missions:
        return Icons.check_circle;
      case StatBadgeType.ranking:
        return Icons.emoji_events;
    }
  }

  String _getLabel() {
    switch (type) {
      case StatBadgeType.points:
        return '보유 포인트';
      case StatBadgeType.missions:
        return '완료 미션';
      case StatBadgeType.ranking:
        return '현재 랭킹';
    }
  }
}

