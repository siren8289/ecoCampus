import 'package:flutter/material.dart';

class TimerCard extends StatelessWidget {
  final String remainingTime; // '10:00'
  final String message;

  const TimerCard({
    super.key,
    required this.remainingTime,
    required this.message,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFECECEC),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          const Text(
            '10분 OFF 상태 유지하기',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF0A0A0A),
              fontFamily: 'Inter',
              letterSpacing: -0.3125,
              height: 24 / 16,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          const Text(
            '기기를 OFF로 유지하면 절전 미션이 완료됩니다.',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.normal,
              color: Color(0xFF4A5565),
              fontFamily: 'Inter',
              letterSpacing: -0.1504,
              height: 20 / 14,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          // 타이머 원형 표시
          Container(
            width: 160,
            height: 160,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: const Color(0xFFE5E7EB),
                width: 2,
              ),
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    remainingTime,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF0A0A0A),
                      fontFamily: 'Inter',
                      letterSpacing: 0.3691,
                      height: 40 / 24,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    '남은 시간',
                    style: TextStyle(
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
            ),
          ),
          const SizedBox(height: 16),
          Text(
            message,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: Color(0xFF04993A),
              fontFamily: 'Inter',
              letterSpacing: -0.1504,
              height: 20 / 16,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}



