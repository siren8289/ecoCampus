import 'package:flutter/material.dart';
import 'bottom_tab_item.dart';

enum TabItem {
  home,
  mission,
  character,
  ranking,
  my,
}

class BottomTabBar extends StatelessWidget {
  final TabItem currentTab;
  final Function(TabItem) onTabChanged;

  const BottomTabBar({
    super.key,
    required this.currentTab,
    required this.onTabChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: Container(
        height: 68,
        width: double.infinity,
        color: Colors.white,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            BottomTabItem(
              tabItem: TabItem.home,
              label: '홈',
              isActive: currentTab == TabItem.home,
              onTap: () => onTabChanged(TabItem.home),
            ),
            BottomTabItem(
              tabItem: TabItem.mission,
              label: '미션',
              isActive: currentTab == TabItem.mission,
              onTap: () => onTabChanged(TabItem.mission),
            ),
            BottomTabItem(
              tabItem: TabItem.character,
              label: '캐릭터',
              isActive: currentTab == TabItem.character,
              onTap: () => onTabChanged(TabItem.character),
            ),
            BottomTabItem(
              tabItem: TabItem.ranking,
              label: '랭킹',
              isActive: currentTab == TabItem.ranking,
              onTap: () => onTabChanged(TabItem.ranking),
            ),
            BottomTabItem(
              tabItem: TabItem.my,
              label: 'MY',
              isActive: currentTab == TabItem.my,
              onTap: () => onTabChanged(TabItem.my),
            ),
          ],
        ),
      ),
    );
  }
}

