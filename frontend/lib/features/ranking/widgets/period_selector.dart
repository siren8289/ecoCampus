import 'package:flutter/material.dart';

enum PeriodType {
  daily,   // 일간
  weekly,  // 주간
  monthly, // 월간
}

class PeriodSelector extends StatelessWidget {
  final PeriodType selectedPeriod;
  final ValueChanged<PeriodType> onPeriodChanged;

  const PeriodSelector({
    super.key,
    required this.selectedPeriod,
    required this.onPeriodChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 6),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F4F4),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFE3E3E3),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildPeriodButton(PeriodType.daily, '일간'),
          _buildPeriodButton(PeriodType.weekly, '주간'),
          _buildPeriodButton(PeriodType.monthly, '월간'),
        ],
      ),
    );
  }

  Widget _buildPeriodButton(PeriodType period, String label) {
    final isSelected = selectedPeriod == period;
    return GestureDetector(
      onTap: () => onPeriodChanged(period),
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: 28,
        padding: const EdgeInsets.symmetric(horizontal: 31, vertical: 4),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF81D18A) : Colors.white,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: Text(
            label,
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
      ),
    );
  }
}



