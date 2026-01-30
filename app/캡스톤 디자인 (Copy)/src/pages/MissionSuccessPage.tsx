import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight, Share2 } from 'lucide-react';
import { Mission } from '../App';
import { motion } from 'motion/react';

interface MissionSuccessPageProps {
  result: {
    points: number;
    bonus: number;
    feedback: string;
    nextMission: Mission;
  };
  onConfirm: () => void;
  onNextMission: () => void;
}

export function MissionSuccessPage({ result, onConfirm, onNextMission }: MissionSuccessPageProps) {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[85vh] space-y-8 animate-in zoom-in-95 duration-500 pb-10">
      <div className="relative">
        <motion.div 
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-32 h-32 bg-eco-green/10 rounded-[40px] flex items-center justify-center text-eco-green shadow-xl shadow-eco-green/10"
        >
          <CheckCircle2 className="w-16 h-16 stroke-[2.5]" />
        </motion.div>
        <motion.div 
          initial={{ scale: 0, x: 20 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-3 -right-3 w-12 h-12 bg-eco-yellow rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white"
        >
          <Sparkles className="w-6 h-6 fill-current" />
        </motion.div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-neutral-800 tracking-tight">미션 성공!</h2>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">지급 완료</span>
            <div className="bg-eco-green px-4 py-1.5 rounded-full text-white font-bold text-lg shadow-lg shadow-eco-green/20">
              +{result.points + result.bonus}P
            </div>
          </div>
          {result.bonus > 0 && (
            <p className="text-xs font-bold text-eco-yellow">
              보너스 포인트 {result.bonus}P 포함 ✨
            </p>
          )}
        </div>
      </div>

      <div className="w-full bg-white p-8 rounded-[40px] shadow-sm border border-eco-green/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-eco-green/5 rounded-full -mr-12 -mt-12"></div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-800 flex items-center justify-center text-xl shadow-lg">
              🤖
            </div>
            <div>
              <p className="text-[10px] font-bold text-eco-green uppercase tracking-widest mb-0.5">AI 행동 분석 피드백</p>
              <h4 className="font-bold text-neutral-800">지속 가능한 캠퍼스</h4>
            </div>
          </div>
          
          <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100">
            <p className="text-neutral-700 leading-relaxed font-bold italic text-center">
              "{result.feedback}"
            </p>
          </div>

          <p className="text-[11px] text-neutral-400 text-center font-medium leading-relaxed">
            방금 수행하신 활동은 캠퍼스 탄소 배출량을 <br/>
            <span className="text-eco-green font-bold">약 0.45kg 절감</span>하는 효과가 있습니다.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="p-5 bg-neutral-800 rounded-[32px] flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
              {result.nextMission.icon}
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none mb-1">다음 추천 미션</p>
              <p className="text-white font-bold">{result.nextMission.title}</p>
            </div>
          </div>
          <button 
            onClick={onNextMission}
            className="w-10 h-10 rounded-full bg-eco-green flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button 
            onClick={onConfirm}
            className="bg-white border-2 border-neutral-100 text-neutral-800 py-5 rounded-3xl font-bold active:scale-95 transition-all shadow-sm"
          >
            홈으로 가기
          </button>
          <button className="bg-neutral-100 text-neutral-500 py-5 rounded-3xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Share2 className="w-5 h-5" />
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
}
