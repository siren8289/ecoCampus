import 'package:flutter/material.dart';

class WeeklyActivityCard extends StatelessWidget {
  final Map<String, int> dailyPoints;
  final int usedPoints;
  final List<Map<String, dynamic>> activities;
  final bool isActive;

  const WeeklyActivityCard({
    super.key,
    required this.dailyPoints,
    required this.usedPoints,
    required this.activities,
    this.isActive = false,
  });

  @override
  Widget build(BuildContext context) {
    final maxPoints = dailyPoints.values.isEmpty
        ? 1
        : dailyPoints.values.reduce((a, b) => a > b ? a : b);
    final effectiveMaxPoints = maxPoints == 0 ? 1 : maxPoints;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isActive ? const Color(0xFFD3EFD6) : const Color(0xFFEBEBEB),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFD1D5DC), width: 0.717),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 95,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: dailyPoints.entries.map((entry) {
                final day = entry.key;
                final points = entry.value;
                final barHeight = (points / effectiveMaxPoints) * 60;
                final minBarHeight = points > 0 ? 4.0 : 0.0; // 최소 높이 설정

                return Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    SizedBox(
                      height: 16,
                      child: Center(
                        child: Text(
                          points.toString(),
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w400,
                            color: Color(0xFF666666),
                            fontFamily: 'Inter',
                            height: 16 / 12,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Container(
                      width: 10,
                      height: barHeight > 0 ? barHeight.clamp(minBarHeight, 60.0) : 0,
                      decoration: BoxDecoration(
                        color: const Color(0xFF6BBF76),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    const SizedBox(height: 4),
                    SizedBox(
                      height: 16,
                      child: Center(
                        child: Text(
                          day,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w400,
                            color: Color(0xFF666666),
                            fontFamily: 'Inter',
                            height: 16 / 12,
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),
          ...activities.map((activity) => Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: _buildActivityRow(
                  activity['emoji'] as String,
                  activity['title'] as String,
                  '+${activity['points']}P',
                ),
              )),
          _buildActivityRow('🎁', '사용 Point', '${usedPoints}P'),
        ],
      ),
    );
  }

  Widget _buildActivityRow(String emoji, String title, String points) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          emoji,
          style: const TextStyle(fontSize: 16),
        ),
        const SizedBox(width: 8),
        Flexible(
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w400,
              color: Color(0xFF0A0A0A),
              fontFamily: 'Inter',
              letterSpacing: -0.3125,
              height: 24 / 16,
            ),
            overflow: TextOverflow.ellipsis,
            maxLines: 1,
          ),
        ),
        const SizedBox(width: 8),
        Text(
          points,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            color: Color(0xFF0A0A0A),
            fontFamily: 'Inter',
            letterSpacing: -0.4395,
            height: 28 / 12,
          ),
        ),
      ],
    );
  }
}
