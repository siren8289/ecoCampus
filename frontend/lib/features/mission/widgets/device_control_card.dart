import 'package:flutter/material.dart';

class DeviceControlCard extends StatelessWidget {
  final String deviceName;
  final String deviceType; // '전등(Light)', '냉난방기(HVAC)'
  final String info; // '소비전력: 8W', '실내온도: 22.8°C'
  final bool isOn;
  final Function(bool) onToggle;
  final Color iconBackgroundColor;

  const DeviceControlCard({
    super.key,
    required this.deviceName,
    required this.deviceType,
    required this.info,
    required this.isOn,
    required this.onToggle,
    required this.iconBackgroundColor,
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
          // 아이콘
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: iconBackgroundColor,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                deviceName == '전등' ? '💡' : '❄️',
                style: const TextStyle(fontSize: 24),
              ),
            ),
          ),
          const SizedBox(width: 12),
          // 디바이스 정보
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  deviceType,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF0A0A0A),
                    fontFamily: 'Inter',
                    letterSpacing: -0.3125,
                    height: 24 / 16,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  info,
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
          // 토글 스위치
          GestureDetector(
            onTap: () => onToggle(!isOn),
            child: Stack(
              children: [
                Container(
                  width: 38,
                  height: 16,
                  decoration: BoxDecoration(
                    color: isOn ? const Color(0xFF00A63E) : const Color(0xFFCBD5E0),
                    borderRadius: BorderRadius.circular(50),
                  ),
                ),
                Positioned(
                  left: isOn ? 15 : 1,
                  top: 1,
                  child: Container(
                    width: 14,
                    height: 14,
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
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



