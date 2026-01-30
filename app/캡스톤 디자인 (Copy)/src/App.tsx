import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { MissionPage } from './pages/MissionPage';
import { MissionDetailPage } from './pages/MissionDetailPage';
import { CharacterPage } from './pages/CharacterPage';
import { RankingPage } from './pages/RankingPage';
import { MyPage } from './pages/MyPage';
import { PointsPage } from './pages/PointsPage';
import { BottomNav } from './components/ui/BottomNav';
import { Header } from './components/ui/Header';
import { QuizPage } from './pages/QuizPage';
import { MissionSuccessPage } from './pages/MissionSuccessPage';

export type Page = 'home' | 'mission' | 'mission-detail' | 'character' | 'ranking' | 'mypage' | 'success' | 'points' | 'quiz';

export interface Mission {
  id: string;
  title: string;
  category: string;
  points: number;
  bonusPoints?: number;
  icon: string;
  description: string;
  method: string;
  isAIRecommended?: boolean;
  recommendationReason?: string;
  timeBonus?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [lastMissionResult, setLastMissionResult] = useState<{
    points: number;
    bonus: number;
    feedback: string;
    nextMission: Mission;
  } | null>(null);

  const [user, setUser] = useState({
    name: '김캠퍼',
    department: '컴퓨터공학과',
    points: 1250,
    level: 2,
    xp: 45,
  });

  const [iotStatus, setIotStatus] = useState({
    lights: true,
    ac: false,
  });

  const missions: Mission[] = [
    {
      id: 'iot-1',
      title: '강의실 전등 끄기',
      category: '에너지',
      points: 50,
      bonusPoints: 20,
      icon: '💡',
      description: '빈 강의실의 전등을 스마트 제어로 꺼서 전력을 절약하세요.',
      method: '앱의 IoT 제어 버튼을 눌러 전등을 소등합니다. 30분 이상 유지 시 포인트가 지급됩니다.',
      isAIRecommended: true,
      recommendationReason: '현재 공강 시간대이며 주변 강의실에 사용자가 없습니다.',
      timeBonus: '지금 참여 시 +20P',
    },
    {
      id: 'iot-2',
      title: '에어컨 적정온도 설정',
      category: '에너지',
      points: 40,
      bonusPoints: 10,
      icon: '❄️',
      description: '강의실 냉방기를 26도로 설정하여 에너지를 효율적으로 사용하세요.',
      method: 'IoT 제어판에서 온도를 26도 이상으로 설정하고 유지합니다.',
      isAIRecommended: false,
    },
    {
      id: 'tumbler-1',
      title: '텀블러 사용 인증',
      category: '생활',
      points: 30,
      icon: '🥤',
      description: '교내 카페에서 일회용 컵 대신 개인 텀블러를 사용하세요.',
      method: '텀블러 사용 사진을 촬영하여 업로드합니다.',
    },
    {
      id: 'quiz-1',
      title: '오늘의 ESG 퀴즈',
      category: '교육',
      points: 20,
      icon: '❓',
      description: '환경과 사회적 책임을 배우는 간단한 퀴즈를 풀어보세요.',
      method: '3문항의 퀴즈를 모두 맞히면 포인트가 지급됩니다.',
    }
  ];

  const handleNavigate = (page: Page) => setCurrentPage(page);

  const handleSelectMission = (mission: Mission) => {
    if (mission.id === 'quiz-1') {
      setCurrentPage('quiz');
    } else {
      setSelectedMission(mission);
      setCurrentPage('mission-detail');
    }
  };

  const handleCompleteMission = (mission: Mission, success: boolean) => {
    if (success) {
      const basePoints = mission.points;
      const bonusPoints = mission.bonusPoints || 0;
      const total = basePoints + bonusPoints;
      
      const result = {
        points: basePoints,
        bonus: bonusPoints,
        feedback: "오늘 당신의 활동으로 캠퍼스가 더 깨끗해졌습니다!",
        nextMission: missions.find(m => m.id !== mission.id) || missions[0]
      };

      setLastMissionResult(result);
      setUser(prev => {
        const newXp = prev.xp + 20;
        let newLevel = prev.level;
        let finalXp = newXp;
        if (newXp >= 100 && prev.level < 4) {
          newLevel = prev.level + 1;
          finalXp = newXp - 100;
        }
        return { ...prev, points: prev.points + total, level: newLevel, xp: finalXp };
      });
      setCurrentPage('success');
    } else {
      alert("조건이 충족되지 않았습니다.");
      setCurrentPage('home');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-800 font-sans max-w-md mx-auto shadow-xl relative overflow-hidden">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-1 overflow-y-auto pb-20">
        {currentPage === 'home' && (
          <HomePage 
            user={user} 
            missions={missions} 
            onSelectMission={handleSelectMission}
            onNavigate={handleNavigate}
            iotStatus={iotStatus}
            onToggleIot={(key) => setIotStatus(prev => ({ ...prev, [key]: !prev[key] }))}
          />
        )}
        {currentPage === 'mission' && <MissionPage missions={missions} onSelectMission={handleSelectMission} />}
        {currentPage === 'mission-detail' && selectedMission && (
          <MissionDetailPage 
            mission={selectedMission} 
            onBack={() => setCurrentPage('home')}
            onComplete={(success) => handleCompleteMission(selectedMission, success)}
          />
        )}
        {currentPage === 'success' && lastMissionResult && (
          <MissionSuccessPage 
            result={lastMissionResult} 
            onConfirm={() => setCurrentPage('home')}
            onNextMission={() => handleSelectMission(lastMissionResult.nextMission)}
          />
        )}
        {currentPage === 'character' && <CharacterPage user={user} />}
        {currentPage === 'quiz' && (
          <QuizPage 
            onBack={() => setCurrentPage('home')}
            onComplete={(points) => {
              setUser(prev => ({ ...prev, points: prev.points + points }));
              setCurrentPage('success');
              setLastMissionResult({
                points: points,
                bonus: 0,
                feedback: "ESG 지식이 한층 더 쌓였습니다!",
                nextMission: missions[0]
              });
            }}
          />
        )}
        {currentPage === 'ranking' && <RankingPage user={user} />}
        {currentPage === 'mypage' && <MyPage user={user} onNavigate={handleNavigate} />}
        {currentPage === 'points' && <PointsPage user={user} onBack={() => setCurrentPage('mypage')} />}
      </main>

      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}
