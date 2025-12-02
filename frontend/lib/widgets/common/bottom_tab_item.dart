import 'package:flutter/material.dart';
import 'bottom_tab_bar.dart';

class BottomTabItem extends StatelessWidget {
  final TabItem tabItem;
  final String label;
  final bool isActive;
  final VoidCallback onTap;

  const BottomTabItem({
    super.key,
    required this.tabItem,
    required this.label,
    required this.isActive,
    required this.onTap,
  });

  IconData _getIcon() {
    switch (tabItem) {
      case TabItem.home:
        return Icons.home;
      case TabItem.mission:
        return Icons.flag;
      case TabItem.character:
        return Icons.eco;
      case TabItem.ranking:
        return Icons.emoji_events;
      case TabItem.my:
        return Icons.person;
    }
  }

  Widget _buildIcon() {
    final activeColor = const Color(0xFF6BBF76);
    final inactiveColor = const Color(0xFF99A1AE);
    final iconColor = isActive ? activeColor : inactiveColor;

    return Icon(
      _getIcon(),
      size: 24,
      color: iconColor,
    );
  }

  @override
  Widget build(BuildContext context) {
    final activeColor = const Color(0xFF6BBF76);
    final inactiveColor = const Color(0xFF99A1AE);

    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                width: 24,
                height: 24,
                child: _buildIcon(),
              ),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(
                  color: isActive ? activeColor : inactiveColor,
                  fontSize: 12,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w400,
                  height: 1.33,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

