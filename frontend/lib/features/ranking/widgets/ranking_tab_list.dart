import 'package:flutter/material.dart';

enum RankingType {
  individual, // 개인 랭킹
  department, // 학과 랭킹
}

class RankingTabList extends StatelessWidget {
  final RankingType selectedType;
  final ValueChanged<RankingType> onTypeChanged;

  const RankingTabList({
    super.key,
    required this.selectedType,
    required this.onTypeChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 36,
      decoration: BoxDecoration(
        color: const Color(0xFFF4F4F4),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFDDDCDC),
          width: 1,
        ),
      ),
      child: Stack(
        children: [
          Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: () => onTypeChanged(RankingType.individual),
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    height: 29.002,
                    padding: const EdgeInsets.symmetric(horizontal: 8.717, vertical: 4.717),
                    decoration: BoxDecoration(
                      color: selectedType == RankingType.individual
                          ? const Color(0xFFD9EBD9)
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Center(
                      child: Text(
                        '개인 랭킹',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                          color: selectedType == RankingType.individual
                              ? const Color(0xFF0A0A0A)
                              : const Color(0xFF484848),
                          fontFamily: 'Inter',
                          letterSpacing: -0.1504,
                          height: 20 / 15,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: GestureDetector(
                  onTap: () => onTypeChanged(RankingType.department),
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    height: 29.002,
                    padding: const EdgeInsets.symmetric(horizontal: 8.717, vertical: 4.717),
                    decoration: BoxDecoration(
                      color: selectedType == RankingType.department
                          ? const Color(0xFFD9EBD9)
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Center(
                      child: Text(
                        '학과 랭킹',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                          color: selectedType == RankingType.department
                              ? const Color(0xFF0A0A0A)
                              : const Color(0xFF484848),
                          fontFamily: 'Inter',
                          letterSpacing: -0.1504,
                          height: 20 / 15,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}



