import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Mission, Page } from '../App';
import { IoTControl } from '../features/mission/IoTControl';
import { MissionCard } from '../features/mission/MissionCard';

interface HomePageProps {
  user: {
    name: string;
    department: string;
    points: number;
    level: number;
    xp: number;
  };
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  onNavigate: (page: Page) => void;
  iotStatus: {
    lights: boolean;
    ac: boolean;
  };
  onToggleIot: (key: 'lights' | 'ac') => void;
}

export function HomePage({ user, missions, onSelectMission, onNavigate, iotStatus, onToggleIot }: HomePageProps) {
  const aiMission = missions.find(m => m.isAIRecommended);
  const otherMissions = missions.filter(m => !m.isAIRecommended).slice(0, 3);
  const characterLabels = ["씨앗 🌱", "어린 나무 🌳", "울창한 소나무 🌲", "푸른 지구 🌏"];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <section className="bg-eco-green rounded-[32px] p-6 text-white shadow-lg shadow-eco-green/20 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white text-[10px] font-bold mb-1 opacity-80 uppercase tracking-widest">{user.department}</p>
              <h2 className="text-2xl font-bold tracking-tight">{user.name}님!</h2>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div 
                onClick={() => onNavigate('points')}
                className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold border border-white/20 cursor-pointer active:scale-95 transition-all"
              >
                <span className="opacity-70 text-[10px] mr-2 text-white">내 포인트</span>
                {user.points.toLocaleString()} P
              </div>
              <div className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-eco-green flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse"></span>
                {characterLabels[user.level - 1]}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </section>

      <section className="space-y-4">
        <h3 className="font-bold text-lg text-neutral-800 tracking-tight px-1">스마트 제어 센터</h3>

        {aiMission && (
          <div 
            onClick={() => onSelectMission(aiMission)}
            className="bg-eco-yellow/10 border-2 border-eco-yellow/20 p-6 rounded-[32px] flex flex-col gap-4 cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-eco-yellow/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-eco-yellow flex items-center justify-center text-white shadow-lg shadow-eco-yellow/20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-eco-yellow uppercase tracking-[0.2em] leading-none mb-2">AI 추천 실천 행동</p>
                  <p className="text-xl font-bold text-neutral-800 leading-tight">{aiMission.title}</p>
                </div>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-eco-yellow/20 flex items-center gap-1">
                <span className="text-[10px] font-bold text-eco-yellow underline underline-offset-2">상세보기</span>
                <ArrowRight className="w-3 h-3 text-eco-yellow" />
              </div>
            </div>
            
            {aiMission.recommendationReason && (
              <div className="bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white relative z-10">
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  <span className="text-eco-yellow font-bold mr-1">WHY?</span>
                  {aiMission.recommendationReason}
                </p>
              </div>
            )}
          </div>
        )}

        <IoTControl iotStatus={iotStatus} onToggle={onToggleIot} />
      </section>

      <section className="space-y-4 pb-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-lg text-neutral-800 tracking-tight">실천 가능한 미션</h3>
          <button onClick={() => onNavigate('mission')} className="text-xs font-bold text-neutral-400">모두보기</button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {otherMissions.map(mission => (
            <MissionCard key={mission.id} mission={mission} onClick={onSelectMission} />
          ))}
        </div>
      </section>
    </div>
  );
}
