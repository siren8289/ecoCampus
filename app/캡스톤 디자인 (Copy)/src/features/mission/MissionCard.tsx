import React from 'react';
import { Mission } from '../../App';

interface MissionCardProps {
  mission: Mission;
  onClick: (mission: Mission) => void;
  variant?: 'grid' | 'list';
}

export function MissionCard({ mission, onClick, variant = 'list' }: MissionCardProps) {
  if (variant === 'grid') {
    return (
      <button
        onClick={() => onClick(mission)}
        className="w-full bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm flex items-center gap-5 text-left transition-active active:scale-[0.98]"
      >
        <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-3xl">
          {mission.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{mission.category}</span>
            {mission.isAIRecommended && (
              <span className="bg-eco-yellow/20 text-eco-yellow text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">AI 추천</span>
            )}
          </div>
          <h4 className="font-bold mb-1 leading-tight">{mission.title}</h4>
          <p className="text-xs text-neutral-400 line-clamp-1">{mission.description}</p>
        </div>
        <div className="text-right">
          <p className="text-eco-green font-bold">+{mission.points}P</p>
          {mission.bonusPoints && <p className="text-[10px] text-eco-yellow font-bold">+{mission.bonusPoints}P</p>}
        </div>
      </button>
    );
  }

  return (
    <button 
      onClick={() => onClick(mission)}
      className="w-full flex items-center gap-4 bg-white p-5 rounded-[32px] border border-neutral-100 shadow-sm active:scale-[0.98] transition-all"
    >
      <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-3xl shadow-inner">
        {mission.icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-bold text-neutral-800 leading-tight">{mission.title}</p>
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{mission.category}</p>
      </div>
      <div className="text-eco-green font-bold text-lg tracking-tighter">
        +{mission.points}P
      </div>
    </button>
  );
}
