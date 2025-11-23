import 'package:flutter/material.dart';

class PointHeader extends StatelessWidget {
  final int currentPoints;
  final int weeklyIncrease;
  final String weeklyMessage;

  const PointHeader({
    super.key,
    required this.currentPoints,
    required this.weeklyIncrease,
    required this.weeklyMessage,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 28),
      decoration: BoxDecoration(
        color: const Color(0xFFFFEBA6),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          // My Point 아이콘
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: const Color(0xFFFBFBFB),
              shape: BoxShape.circle,
            ),
            child: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'My',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                      color: Colors.black,
                      fontFamily: 'Inter',
                      letterSpacing: -0.1504,
                      height: 1,
                    ),
                  ),
                  Text(
                    'Point',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                      color: Colors.black,
                      fontFamily: 'Inter',
                      letterSpacing: -0.1504,
                      height: 1,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(width: 16),
          // 포인트 정보
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  weeklyMessage,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF6A7282),
                    fontFamily: 'Inter',
                    height: 16 / 12,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${currentPoints}P',
                  style: const TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF0A0A0A),
                    fontFamily: 'Inter',
                    letterSpacing: 0.3691,
                    height: 40 / 36,
                  ),
                ),
              ],
            ),
          ),
          // 화살표 아이콘
          const Icon(
            Icons.arrow_forward_ios,
            size: 12,
            color: Color(0xFF4A5565),
          ),
        ],
      ),
    );
  }
}
