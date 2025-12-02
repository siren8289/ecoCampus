import 'package:flutter/material.dart';

class PointUseButton extends StatelessWidget {
  final String title;
  final String discount;
  final int points;
  final IconData icon;
  final VoidCallback? onTap;
  final bool isAvailable;

  const PointUseButton({
    super.key,
    required this.title,
    required this.discount,
    required this.points,
    this.icon = Icons.card_giftcard,
    this.onTap,
    this.isAvailable = true,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: isAvailable ? onTap : null,
      child: Container(
        height: 150,
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: const Color(0xFFEBEBEB),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Icon(
                  icon,
                  size: 32,
                  color: const Color(0xFF0A0A0A),
                ),
              ),
            ),
            const SizedBox(height: 4),
            SizedBox(
              height: 20,
              child: Center(
                child: Text(
                  title,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFF0A0A0A),
                    fontFamily: 'Inter',
                    letterSpacing: -0.1504,
                    height: 20 / 14,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              discount,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.normal,
                color: isAvailable ? const Color(0xFF0A0A0A) : const Color(0xFF999999),
                fontFamily: 'Inter',
                letterSpacing: -0.1504,
                height: 16 / 12,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              '${points}P',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.normal,
                color: isAvailable ? const Color(0xFF0A0A0A) : const Color(0xFF999999),
                fontFamily: 'Inter',
                letterSpacing: -0.3125,
                height: 24 / 16,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
