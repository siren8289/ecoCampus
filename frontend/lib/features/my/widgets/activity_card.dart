import 'package:flutter/material.dart';

class ActivityCard extends StatelessWidget {
  final String title;
  final String timeAgo;
  final String points;
  final bool isPositive; // true면 +포인트, false면 -포인트
  final Color backgroundColor;

  const ActivityCard({
    super.key,
    required this.title,
    required this.timeAgo,
    required this.points,
    this.isPositive = true,
    required this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 17, vertical: 1),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: const Color(0xFFF3F4F6), // gray-100
          width: 1,
        ),
      ),
      child: Row(
        children: [
          // 아이콘
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: backgroundColor,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Icon(
                isPositive ? Icons.check_circle : Icons.remove_circle,
                size: 20,
                color: const Color(0xFF0A0A0A),
              ),
            ),
          ),
          const SizedBox(width: 12),
          // 제목 및 시간
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF1E2939),
                    fontFamily: 'Inter',
                    letterSpacing: -0.1504,
                    height: 20 / 14,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  timeAgo,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF99A1AF),
                    fontFamily: 'Inter',
                    height: 16 / 12,
                  ),
                ),
              ],
            ),
          ),
          // 포인트
          Container(
            height: 36,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10.5),
            decoration: BoxDecoration(
              color: isPositive ? backgroundColor : const Color(0xFFF9FAFB), // gray-50
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: Text(
                points,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                  color: isPositive ? const Color(0xFF81D18A) : const Color(0xFF666666),
                  fontFamily: 'Inter',
                  letterSpacing: -0.1504,
                  height: 20 / 14,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

