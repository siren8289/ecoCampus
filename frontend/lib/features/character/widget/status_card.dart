import 'package:flutter/material.dart';

enum StatusCardType {
  missionComplete, // 미션 완료
  todayGrowth,     // 오늘 성장
  points,          // 포인트
}

class StatusCard extends StatelessWidget {
  final StatusCardType type;
  final String value;

  const StatusCard({
    super.key,
    required this.type,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 89.088,
      constraints: const BoxConstraints(
        minHeight: 131.94,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFEBEBEB),
          width: 1,
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // 이모지 아이콘
          SizedBox(
            height: 32,
            child: Center(
              child: Text(
                _getIcon(),
                style: const TextStyle(
                  fontSize: 24,
                  height: 32 / 24,
                  letterSpacing: 0.0703,
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          // 라벨 텍스트
          SizedBox(
            height: 16,
            child: Center(
              child: Text(
                _getLabel(),
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF4A5565),
                  fontFamily: 'Inter',
                  height: 16 / 14,
                ),
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ),
          const SizedBox(height: 8),
          // 값 텍스트
          Flexible(
            child: Center(
              child: Text(
                value,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF0A0A0A),
                  fontFamily: 'Inter',
                  letterSpacing: -0.1504,
                  height: 20 / 16,
                ),
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _getIcon() {
    switch (type) {
      case StatusCardType.missionComplete:
        return '✅';
      case StatusCardType.todayGrowth:
        return '🌱';
      case StatusCardType.points:
        return '💰';
    }
  }

  String _getLabel() {
    switch (type) {
      case StatusCardType.missionComplete:
        return '미션 완료';
      case StatusCardType.todayGrowth:
        return '오늘 성장';
      case StatusCardType.points:
        return '포인트';
    }
  }
}
