import 'package:flutter/material.dart';

class MoveMissionCard extends StatelessWidget {
  final String nearbyClassroom;
  final VoidCallback? onMove;

  const MoveMissionCard({
    super.key,
    required this.nearbyClassroom,
    this.onMove,
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '자리 이동 미션',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w500,
              color: Color(0xFF0A0A0A),
              fontFamily: 'Inter',
              letterSpacing: -0.3125,
              height: 24 / 20,
            ),
          ),
          const SizedBox(height: 8),
          RichText(
            text: const TextSpan(
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.normal,
                color: Color(0xFF04993A),
                fontFamily: 'Inter',
                letterSpacing: -0.1504,
                height: 20 / 16,
              ),
              children: [
                TextSpan(text: '혼자 계시네요! 에너지 절약하고 '),
                TextSpan(text: '보상도 받아보세요.'),
              ],
            ),
          ),
          const SizedBox(height: 12),
          // 근처 강의실 정보
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: const Color(0xFFECECEC),
                width: 1,
              ),
            ),
            child: Text(
              '근처 강의실: $nearbyClassroom',
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.normal,
                color: Color(0xFF0A0A0A),
                fontFamily: 'Inter',
                letterSpacing: -0.1504,
                height: 20 / 14,
              ),
            ),
          ),
          const SizedBox(height: 12),
          // 자리 이동 버튼
          GestureDetector(
            onTap: onMove,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 8),
              decoration: BoxDecoration(
                color: const Color(0xFF81D18A),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Text(
                  '자리 이동하고 보상 받기',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF0A0A0A),
                    fontFamily: 'Inter',
                    letterSpacing: -0.1504,
                    height: 20 / 14,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

