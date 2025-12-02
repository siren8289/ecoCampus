import 'package:flutter/material.dart';

class ClassroomCard extends StatelessWidget {
  final String classroomName;
  final String signalStrength; // 'B' 등
  final String status; // '신호: 강함 | 25명 | 혼잡도: 보통'
  final VoidCallback? onTap;

  const ClassroomCard({
    super.key,
    required this.classroomName,
    required this.signalStrength,
    required this.status,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: const Color(0xFFECECEC),
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
                color: const Color(0xFFE5E7EB),
                shape: BoxShape.circle,
              ),
              child: const Center(
                child: Icon(
                  Icons.school,
                  size: 24,
                  color: Color(0xFF4A5565),
                ),
              ),
            ),
            const SizedBox(width: 12),
            // 강의실 정보
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        classroomName,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.normal,
                          color: Color(0xFF0A0A0A),
                          fontFamily: 'Inter',
                          letterSpacing: -0.3125,
                          height: 24 / 16,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Container(
                        width: 20,
                        height: 20,
                        decoration: BoxDecoration(
                          color: const Color(0xFF42B36B),
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: Text(
                            signalStrength,
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: Colors.white,
                              fontFamily: 'Inter',
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    status,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF4A5565),
                      fontFamily: 'Inter',
                      letterSpacing: -0.1504,
                      height: 20 / 14,
                    ),
                  ),
                ],
              ),
            ),
            // 화살표 아이콘
            Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: const Color(0xFF4A5565),
            ),
          ],
        ),
      ),
    );
  }
}

