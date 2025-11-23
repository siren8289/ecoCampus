import 'package:flutter/material.dart';
import 'common/themes/colors.dart';
import 'features/home/view/home_page.dart';
import 'features/mission/view/mission_page.dart';
import 'features/character/view/character_page.dart';
import 'features/ranking/view/ranking_page.dart';
import 'features/my/view/my_page.dart';
import 'widgets/common/bottom_tab_bar.dart' show TabItem;

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  TabItem _currentTab = TabItem.home;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EcoCampus',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          brightness: Brightness.light,
        ),
        useMaterial3: true,
        scaffoldBackgroundColor: AppColors.background,
      ),
      home: _buildCurrentPage(),
    );
  }

  Widget _buildCurrentPage() {
    switch (_currentTab) {
      case TabItem.home:
        return HomePage(
          onTabChanged: (tab) {
            setState(() {
              _currentTab = tab;
            });
          },
        );
      case TabItem.mission:
        return MissionPage(
          onTabChanged: (tab) {
            setState(() {
              _currentTab = tab;
            });
          },
        );
      case TabItem.character:
        return CharacterPage(
          onTabChanged: (tab) {
            setState(() {
              _currentTab = tab;
            });
          },
        );
      case TabItem.ranking:
        return RankingPage(
          onTabChanged: (tab) {
            setState(() {
              _currentTab = tab;
            });
          },
        );
      case TabItem.my:
        return MyPage(
          onTabChanged: (tab) {
            setState(() {
              _currentTab = tab;
            });
          },
        );
    }
  }
}

