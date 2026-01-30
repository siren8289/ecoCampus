import React from 'react';
import { Target, Search } from 'lucide-react';
import { Mission } from '../App';
import { MissionCard } from '../features/mission/MissionCard';

interface MissionPageProps {
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
}

export function MissionPage({ missions, onSelectMission }: MissionPageProps) {
  const categories = ['전체', '에너지', '생활', '교육', '캠페인'];
  const [activeCategory, setActiveCategory] = React.useState('전체');

  const filteredMissions = activeCategory === '전체' 
    ? missions 
    : missions.filter(m => m.category === activeCategory);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">챌린지 미션</h2>
          <div className="bg-eco-green/10 text-eco-green px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Target className="w-3 h-3" /> 82% 달성
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="미션을 검색해보세요"
            className="w-full bg-white border border-neutral-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-eco-green/20"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-eco-green text-white' 
                  : 'bg-white text-neutral-500 border border-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredMissions.map(mission => (
          <MissionCard key={mission.id} mission={mission} onClick={onSelectMission} variant="grid" />
        ))}
      </div>

      <div className="bg-eco-green/10 p-6 rounded-3xl border border-eco-green/20">
        <h4 className="font-bold text-eco-green mb-1">캠퍼스 챌린지 팁</h4>
        <p className="text-sm text-neutral-700 leading-relaxed font-medium">
          공강 시간에 강의실 IoT를 제어하면 보너스 포인트를 2배로 받을 수 있어요!
        </p>
      </div>
    </div>
  );
}
