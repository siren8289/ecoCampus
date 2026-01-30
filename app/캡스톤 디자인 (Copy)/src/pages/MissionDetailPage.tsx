import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Info, Play, ArrowRight } from 'lucide-react';
import { Mission } from '../App';

interface MissionDetailPageProps {
  mission: Mission;
  onBack: () => void;
  onComplete: (success: boolean) => void;
}

export function MissionDetailPage({ mission, onBack, onComplete }: MissionDetailPageProps) {
  const [status, setStatus] = useState<'idle' | 'participating' | 'completing'>('idle');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (status === 'participating') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleStart = () => {
    setStatus('participating');
  };

  const handleRequestComplete = () => {
    setStatus('completing');
    setTimeout(() => {
      const isSuccess = timer >= 5; 
      if (isSuccess) {
        onComplete(true);
      } else {
        setStatus('idle');
        setTimer(0);
        alert("조금만 더 참여해보세요! (최소 1분 이상 활동 유지가 필요합니다)");
      }
    }, 2000);
  };

  return (
    <div className="animate-in slide-in-from-bottom duration-500 pb-20">
      <div className={`relative h-72 overflow-hidden flex items-center justify-center ${
        mission.id.includes('iot') ? 'bg-eco-yellow' : 'bg-eco-green'
      }`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-eco-green/30 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-[32px] bg-white/20 backdrop-blur-xl flex items-center justify-center text-5xl shadow-2xl border border-white/30">
            {mission.icon}
          </div>
        </div>

        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-20"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-12 left-6 right-6 z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-white/30">
              {mission.category}
            </span>
            {mission.isAIRecommended && (
              <span className="bg-white text-eco-yellow text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                AI 추천
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">{mission.title}</h2>
        </div>
      </div>

      <div className="p-6 space-y-8 bg-neutral-50 -mt-8 rounded-t-[40px] relative z-10 shadow-2xl">
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-eco-green/10">
            <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">예상 획득 포인트</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-eco-green">+{mission.points}</span>
              <span className="text-xs font-bold text-eco-green">P</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-eco-yellow/10">
            <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">보너스 조건</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-eco-yellow">+{mission.bonusPoints || 0}</span>
              <span className="text-xs font-bold text-eco-yellow">P</span>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-eco-green/10 flex items-center justify-center text-eco-green">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-neutral-800 text-lg">미션 목적</h3>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed font-medium">
              {mission.description}
            </p>
          </div>

          <div className="w-full h-px bg-neutral-100"></div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <h3 className="font-bold text-neutral-800 text-lg">수행 방법</h3>
            </div>
            <div className="bg-neutral-50 p-4 rounded-2xl text-neutral-700 text-sm leading-relaxed border border-neutral-100 font-medium italic">
              " {mission.method} "
            </div>
          </div>
        </section>

        {status === 'idle' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-current" />
              지금 시작하고 포인트를 받으세요
            </div>
            <button 
              onClick={handleStart}
              className="w-full bg-eco-green text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-eco-green/20 active:scale-95 transition-all"
            >
              미션 시작하기
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-eco-green/10 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-eco-green/10 flex items-center justify-center">
                  <div className="text-3xl font-bold text-eco-green tracking-tighter">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-8 border-eco-green border-t-transparent animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-eco-green">활동 인증 중</p>
                <p className="text-sm text-neutral-400 font-medium">캠퍼스 에너지 절약에 기여하고 있습니다</p>
              </div>
            </div>

            <button 
              onClick={handleRequestComplete}
              disabled={status === 'completing'}
              className="w-full bg-neutral-800 text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:bg-neutral-300"
            >
              {status === 'completing' ? (
                <>AI 조건 검사 중...</>
              ) : (
                <>활동 완료 요청</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
