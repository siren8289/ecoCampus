import 'package:flutter/material.dart';

class MyRankingCard extends StatelessWidget {
  final int rank;
  final String name;
  final String department;
  final int points;

  const MyRankingCard({
    super.key,
    required this.rank,
    required this.name,
    required this.department,
    required this.points,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.717),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: Colors.grey.shade300,
          width: 0.717,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              // 순위 배지
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: const Color(0xFFFFD769),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    '$rank',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                      fontFamily: 'Inter',
                      letterSpacing: -0.4492,
                      height: 28 / 24,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              // 이름 및 학과
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    '내 순위',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF4A5565),
                      fontFamily: 'Inter',
                      letterSpacing: -0.1504,
                      height: 20 / 14,
                    ),
                  ),
                  const SizedBox(height: 4),
                  RichText(
                    text: TextSpan(
                      children: [
                        TextSpan(
                          text: name,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF333333),
                            fontFamily: 'Inter',
                            letterSpacing: -0.3125,
                            height: 24 / 16,
                          ),
                        ),
                        TextSpan(
                          text: ' ($department)',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.normal,
                            color: Color(0xFF666666),
                            fontFamily: 'Inter',
                            letterSpacing: -0.3125,
                            height: 24 / 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
          // 포인트
          Text(
            '${points}P',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.normal,
              color: Color(0xFF6BBF76),
              fontFamily: 'Inter',
              letterSpacing: -0.4492,
              height: 28 / 20,
            ),
          ),
        ],
      ),
    );
  }
}

