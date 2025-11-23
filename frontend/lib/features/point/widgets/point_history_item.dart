import 'package:flutter/material.dart';

class PointHistoryItem extends StatelessWidget {
  final String emoji;
  final String title;
  final String date;
  final int points;

  const PointHistoryItem({
    super.key,
    required this.emoji,
    required this.title,
    required this.date,
    required this.points,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFEBEBEB),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFD1D5DC), width: 0.717),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Center(
              child: Text(
                emoji,
                style: const TextStyle(fontSize: 24),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: Color(0xFF0A0A0A),
                    fontFamily: 'Inter',
                    letterSpacing: -0.1504,
                    height: 20 / 14,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  date,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w400,
                    color: Color(0xFF6A7282),
                    fontFamily: 'Inter',
                    height: 16 / 12,
                  ),
                ),
              ],
            ),
          ),
          Text(
            '+${points}P',
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w400,
              color: Color(0xFF6BBF76),
              fontFamily: 'Inter',
              letterSpacing: -0.3125,
              height: 24 / 16,
            ),
          ),
        ],
      ),
    );
  }
}
