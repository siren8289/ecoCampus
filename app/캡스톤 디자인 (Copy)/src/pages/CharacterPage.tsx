import React from 'react';
import { Star } from 'lucide-react';
import { CharacterStage } from '../features/user/CharacterStage';

interface CharacterPageProps {
  user: {
    name: string;
    level: number;
    xp: number;
  };
}

export function CharacterPage({ user }: CharacterPageProps) {
  const levels = [
    { name: "씨앗", desc: "이제 막 환경 보호의 길에 들어섰습니다.", color: "bg-neutral-100", textColor: "text-neutral-500", emoji: "🌱" },
    { name: "어린 나무", desc: "작은 실천이 모여 튼튼한 줄기가 생겼어요.", color: "bg-eco-green/20", textColor: "text-eco-green", emoji: "🌳" },
    { name: "울창한 소나무", desc: "풍성한 잎사귀로 캠퍼스의 공기를 맑게 합니다.", color: "bg-eco-green", textColor: "text-white", emoji: "🌲" },
    { name: "푸른 지구", desc: "당신의 노력으로 지구가 다시 숨을 쉽니다.", color: "bg-blue-500", textColor: "text-white", emoji: "🌏" },
  ];

  const currentLevel = levels[user.level - 1];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800">캐릭터 성장</h2>
        <p className="text-neutral-400 text-sm font-medium">미션을 완료하고 당신만의 지구를 가꿔보세요</p>
      </div>

      <CharacterStage level={user.level} emoji={currentLevel.emoji} name={currentLevel.name} color={currentLevel.color} />

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-bold text-neutral-400 mb-1">성장 게이지</p>
            <p className="text-lg font-bold">LV.{user.level} {currentLevel.name}</p>
          </div>
          <p className="text-eco-green font-bold text-sm">{user.xp}/100 XP</p>
        </div>
        
        <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-eco-green rounded-full transition-all duration-1000"
            style={{ width: `${user.xp}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-neutral-500 text-center leading-relaxed font-medium">
          {currentLevel.desc}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">성장 기록</h3>
        <div className="space-y-3">
          {[
            { title: "첫 미션 완료", date: "2026.01.15", xp: "+20" },
            { title: "에너지 절약 왕", date: "2026.01.20", xp: "+50" },
            { title: "연속 3일 미션 참여", date: "2026.01.25", xp: "+30" },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-eco-green/10 flex items-center justify-center text-eco-green">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold">{log.title}</p>
                  <p className="text-[10px] text-neutral-400">{log.date}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-eco-green">{log.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
