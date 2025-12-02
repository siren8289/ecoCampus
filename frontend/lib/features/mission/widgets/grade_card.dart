import 'package:flutter/material.dart';

class GradeCard extends StatelessWidget {
  final String currentGrade;
  final double progress;
  final int pointsToNextGrade;

  const GradeCard({
    super.key,
    required this.currentGrade,
    required this.progress,
    required this.pointsToNextGrade,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: Colors.black.withValues(alpha: 0.1),
          width: 0.718,
        ),
      ),
      child: Row(
        children: [
          // 이미지 플레이스홀더
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: const Color(0xFFE5E7EB),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Center(
              child: Text(
                '이미지',
                style: TextStyle(
                  fontSize: 14,
                  color: Color(0xFF4A5565),
                  fontFamily: 'Inter',
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          // 등급 정보
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      currentGrade,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF0A0A0A),
                        fontFamily: 'Inter',
                        letterSpacing: -0.1504,
                        height: 20 / 16,
                      ),
                    ),
                    Text(
                      '다음 등급까지 ${pointsToNextGrade}P',
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF4A5565),
                        fontFamily: 'Inter',
                        height: 16 / 14,
                      ),
                      textAlign: TextAlign.right,
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                // 진행 바
                ClipRRect(
                  borderRadius: BorderRadius.circular(1000000),
                  child: LinearProgressIndicator(
                    value: progress,
                    minHeight: 8,
                    backgroundColor: const Color(0xFFE5E7EB),
                    valueColor: const AlwaysStoppedAnimation<Color>(
                      Color(0xFF009737),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
