import 'package:flutter/material.dart';

class CheckButton extends StatelessWidget {
  final bool isChecked;
  final VoidCallback? onTap;

  const CheckButton({
    super.key,
    this.isChecked = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    // Figma 디자인에 맞게 색상 조정
    // 체크됨: #6bbf76 (진한 초록색), 체크 안됨: #81d18a (연한 초록색)
    final backgroundColor = isChecked
        ? const Color(0xFF6BBF76) // 활성 상태: 진한 초록색
        : const Color(0xFF81D18A); // 기본 상태: 연한 초록색 (Figma 디자인에 맞춤)

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: backgroundColor,
          shape: BoxShape.circle,
        ),
        child: Center(
          child: _buildIcon(),
        ),
      ),
    );
  }

  Widget _buildIcon() {
    if (!isChecked) {
      return const SizedBox.shrink();
    }
    
    return const Icon(
      Icons.check,
      size: 24,
      color: Colors.white,
    );
  }
}

