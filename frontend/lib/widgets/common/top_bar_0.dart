import 'package:flutter/material.dart';
import 'top_bar_icon.dart';

class TopBar0 extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final VoidCallback? onBackPressed;
  final bool showBackButton;

  const TopBar0({
    super.key,
    required this.title,
    this.onBackPressed,
    this.showBackButton = true,
  });

  @override
  Size get preferredSize => const Size.fromHeight(60);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(
            color: Color(0xFFFFFBF0),
            width: 0.718,
          ),
        ),
      ),
      child: SafeArea(
        bottom: false,
        child: Stack(
          children: [
            if (showBackButton)
              Positioned(
                left: 16,
                top: 0,
                bottom: 0,
                child: Center(
                  child: Material(
                    color: Colors.transparent,
                    child: InkWell(
                      onTap: onBackPressed ?? () => Navigator.of(context).pop(),
                      borderRadius: BorderRadius.circular(8),
                      child: Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Center(
                          child: TopBarIcon(),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            Center(
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF0A0A0A),
                  fontFamily: 'Inter',
                  letterSpacing: -0.4395,
                  height: 28 / 18,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

