import React, { useState } from 'react';
import { Trophy, Users, TrendingUp, Star, User } from 'lucide-react';

interface RankingPageProps {
  user: {
    name: string;
    department: string;
    points: number;
  };
}

export function RankingPage({ user }: RankingPageProps) {
  const [activeTab, setActiveTab] = useState<'dept' | 'individual'>('dept');

  const departmentRankings = [
    { rank: 1, name: '경영학과', points: 45200, trend: 'up' },
    { rank: 2, name: '컴퓨터공학과', points: 42800, trend: 'up', isUser: true },
    { rank: 3, name: '디자인학과', points: 38500, trend: 'down' },
    { rank: 4, name: '전자공학과', points: 35100, trend: 'up' },
    { rank: 5, name: '경제학과', points: 32000, trend: 'neutral' },
  ];

  const individualRankings = [
    { rank: 1, name: '박지민', dept: '경영학과', points: 3200 },
    { rank: 2, name: '이지은', dept: '디자인학과', points: 2950 },
    { rank: 3, name: '최현우', dept: '컴퓨터공학과', points: 2800 },
    { rank: 4, name: '김캠퍼', dept: '컴퓨터공학과', points: 1250, isUser: true },
    { rank: 5, name: '한소희', dept: '전자공학과', points: 1100 },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">캠퍼스 랭킹</h2>
        
        <div className="flex bg-neutral-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('dept')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'dept' ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-400'
            }`}
          >
            학과별
          </button>
          <button 
            onClick={() => setActiveTab('individual')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'individual' ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-400'
            }`}
          >
            개인별
          </button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">
            {activeTab === 'dept' ? '실시간 학과 순위' : '실시간 개인 순위'}
          </h3>
          <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-400">
            <Users className="w-3 h-3" /> 이번 주 업데이트
          </div>
        </div>

        <div className="space-y-3">
          {activeTab === 'dept' ? (
            departmentRankings.map((dept) => (
              <div 
                key={dept.name}
                className={`flex items-center gap-4 p-5 rounded-3xl border transition-all ${
                  dept.isUser 
                    ? 'bg-eco-green text-white border-eco-green shadow-lg shadow-eco-green/20 scale-[1.02]' 
                    : 'bg-white text-neutral-800 border-neutral-100 shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg ${
                  dept.isUser ? 'bg-white/20' : 'bg-neutral-50 text-neutral-400'
                }`}>
                  {dept.rank}
                </div>
                <div className="flex-1">
                  <p className="font-bold leading-tight">{dept.name}</p>
                  <p className={`text-xs ${dept.isUser ? 'text-white/80' : 'text-neutral-400'}`}>
                    {dept.points.toLocaleString()} P
                  </p>
                </div>
                {dept.trend === 'up' && <TrendingUp className={`w-5 h-5 ${dept.isUser ? 'text-white/80' : 'text-eco-green'}`} />}
                {dept.rank === 1 && !dept.isUser && <Trophy className="w-5 h-5 text-eco-yellow" />}
              </div>
            ))
          ) : (
            individualRankings.map((person) => (
              <div 
                key={person.name}
                className={`flex items-center gap-4 p-5 rounded-3xl border transition-all ${
                  person.isUser 
                    ? 'bg-eco-green text-white border-eco-green shadow-lg shadow-eco-green/20 scale-[1.02]' 
                    : 'bg-white text-neutral-800 border-neutral-100 shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg ${
                  person.isUser ? 'bg-white/20' : 'bg-neutral-50 text-neutral-400'
                }`}>
                  {person.rank}
                </div>
                <div className="flex-1">
                  <p className="font-bold leading-tight">{person.name}</p>
                  <p className={`text-xs ${person.isUser ? 'text-white/80' : 'text-neutral-400'}`}>
                    {person.dept} · {person.points.toLocaleString()} P
                  </p>
                </div>
                {person.isUser && <User className="w-5 h-5 text-white/80" />}
                {person.rank === 1 && <Trophy className="w-5 h-5 text-eco-yellow" />}
              </div>
            ))
          )}
        </div>
      </section>

      <div className="bg-neutral-800 text-white p-6 rounded-3xl space-y-4 font-medium">
        <h4 className="font-bold flex items-center gap-2">
          <Star className="w-5 h-5 text-eco-yellow fill-current" />
          {activeTab === 'dept' ? '학과 보상' : '개인 랭킹 보상'}
        </h4>
        <p className="text-sm text-neutral-400 leading-relaxed font-medium">
          {activeTab === 'dept' 
            ? '이번 주 1위 학과 전원에게 스타벅스 아메리카노 1,000원 할인권을 드립니다!'
            : '주간 랭킹 Top 3에게는 편의점 5,000원 상품권을 선물로 드립니다!'}
        </p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-neutral-800 flex items-center justify-center text-[10px] font-bold ${
                i % 2 === 0 ? 'bg-eco-green text-white' : 'bg-neutral-600 text-neutral-300'
              }`}>
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <button className="text-xs font-bold text-eco-green">혜택 자세히 보기</button>
        </div>
      </div>
    </div>
  );
}
