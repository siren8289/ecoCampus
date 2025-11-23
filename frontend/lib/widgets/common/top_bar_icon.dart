import 'package:flutter/material.dart';

class TopBarIcon extends StatelessWidget {
  const TopBarIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const Icon(
      Icons.arrow_back_ios,
      size: 20,
      color: Color(0xFF0A0A0A),
    );
  }
}

