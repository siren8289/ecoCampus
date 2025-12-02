import 'package:flutter/material.dart';

class IotControlCard extends StatelessWidget {
  final String deviceName;
  final bool isDeviceOn;
  final Function(bool) onToggle;
  final VoidCallback onMissionStart;

  const IotControlCard({
    super.key,
    required this.deviceName,
    required this.isDeviceOn,
    required this.onToggle,
    required this.onMissionStart,
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 헤더
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'IoT 스마트 제어',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF0A0A0A),
                      fontFamily: 'Inter',
                      letterSpacing: -0.3125,
                      height: 24 / 24,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'BLE 연결됨',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w300,
                      color: Color(0xFF04993A),
                      fontFamily: 'Inter',
                      letterSpacing: -0.3125,
                      height: 24 / 20,
                    ),
                  ),
                ],
              ),
              const Text(
                '전체 보기',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF0A0A0A),
                  fontFamily: 'Inter',
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text(
            '현재 강의실의 기기를 제어하세요.',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF4A5565),
              fontFamily: 'Inter',
              letterSpacing: -0.3125,
              height: 24 / 16,
            ),
          ),
          const SizedBox(height: 16),
          // 전등 제어
          _buildDeviceControl(
            icon: '💡',
            deviceName: '전등',
            isOn: isDeviceOn,
            onToggle: onToggle,
          ),
          const SizedBox(height: 16),
          // 냉난방기 제어
          _buildDeviceControl(
            icon: '❄️',
            deviceName: '냉난방기',
            isOn: isDeviceOn,
            onToggle: onToggle,
          ),
          const SizedBox(height: 16),
          // 미션 시작 버튼
          GestureDetector(
            onTap: onMissionStart,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 8),
              decoration: BoxDecoration(
                color: const Color(0xFF81D18A),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Text(
                  '10분 절전 미션 시작하기',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF0A0A0A),
                    fontFamily: 'Inter',
                    letterSpacing: -0.1504,
                    height: 20 / 16,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDeviceControl({
    required String icon,
    required String deviceName,
    required bool isOn,
    required Function(bool) onToggle,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        // 아이콘
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: icon == '💡' ? const Color(0xFFFFF8AE) : const Color(0xFFE3F2FD),
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              icon,
              style: const TextStyle(fontSize: 24),
            ),
          ),
        ),
        const SizedBox(width: 12),
        // 디바이스 이름
        Expanded(
          child: Text(
            deviceName,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Color(0xFF0A0A0A),
              fontFamily: 'Inter',
              letterSpacing: -0.1504,
              height: 20 / 16,
            ),
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
                  color: const Color(0xFFCBD5E0),
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
    );
  }
}
