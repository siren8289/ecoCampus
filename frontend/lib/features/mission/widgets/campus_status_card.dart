import 'package:flutter/material.dart';

enum CampusStatusType {
  todaySavings,      // 오늘 절감량
  studentParticipation, // 학생 참여
}

class CampusStatusCard extends StatelessWidget {
  final CampusStatusType type;
  final String value;
  final String unit;

  const CampusStatusCard({
    super.key,
    required this.type,
    required this.value,
    required this.unit,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFEAEAEA),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 아이콘
          SizedBox(
            width: 36,
            height: 34,
            child: Text(
              _getIcon(),
              style: const TextStyle(fontSize: 34),
            ),
          ),
          const SizedBox(height: 8),
          // 라벨
          Text(
            _getLabel(),
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF4A5565),
              fontFamily: 'Inter',
              letterSpacing: -0.1504,
              height: 20 / 16,
            ),
          ),
          const SizedBox(height: 4),
          // 값
          RichText(
            text: TextSpan(
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w500,
                color: Color(0xFF0A0A0A),
                fontFamily: 'Inter',
                letterSpacing: -0.1504,
                height: 20 / 20,
              ),
              children: [
                TextSpan(
                  text: value,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                  ),
                ),
                TextSpan(
                  text: ' $unit',
                  style: const TextStyle(
                    fontWeight: FontWeight.normal,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _getIcon() {
    switch (type) {
      case CampusStatusType.todaySavings:
        return '⚡';
      case CampusStatusType.studentParticipation:
        return '👥';
    }
  }

  String _getLabel() {
    switch (type) {
      case CampusStatusType.todaySavings:
        return '오늘 절감량';
      case CampusStatusType.studentParticipation:
        return '학생 참여';
    }
  }
}
