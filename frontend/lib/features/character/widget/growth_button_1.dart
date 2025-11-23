import 'package:flutter/material.dart';

class GrowthButton1 extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isFilled;

  const GrowthButton1({
    super.key,
    required this.text,
    this.onPressed,
    this.isFilled = false,
  });

  @override
  Widget build(BuildContext context) {
    final backgroundColor = isFilled
        ? const Color(0xFF81D18A) // Variant2: 초록색
        : const Color(0xFFEBEBEB); // Default: 회색

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          width: 145.5,
          height: 40,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Center(
            child: Text(
              text,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.normal,
                color: Color(0xFF030213),
                fontFamily: 'Inter',
                letterSpacing: -0.1504,
                height: 20 / 16,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );
  }
}

