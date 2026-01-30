import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Calendar, Filter, ArrowLeft } from 'lucide-react';
import { PointsSummaryCard } from '../features/user/PointsSummaryCard';

interface PointsPageProps {
  user: {
    points: number;
  };
  onBack: () => void;
}

export function PointsPage({ user, onBack }: PointsPageProps) {
  const transactions = [
    { id: 1, title: '강의실 전등 끄기', type: 'earn', points: 50, bonus: 20, date: '2026.01.29', time: '14:20' },
    { id: 2, title: '스타벅스 아메리카노 교환', type: 'spend', points: -1200, date: '2026.01.28', time: '11:05' },
    { id: 3, title: '텀블러 사용 인증', type: 'earn', points: 30, date: '2026.01.27', time: '09:45' },
    { id: 4, title: 'ESG 퀴즈 만점', type: 'earn', points: 20, date: '2026.01.27', time: '09:40' },
    { id: 5, title: '폐휴대폰 반납 캠페인', type: 'earn', points: 500, date: '2026.01.20', time: '16:30' },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-400 shadow-sm active:scale-90 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">포인트 내역</h2>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-400 shadow-sm">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <PointsSummaryCard points={user.points} />

      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-neutral-800">최근 이용 내역</h3>
          <div className="flex items-center gap-1 text-neutral-400 font-bold text-xs">
            <Calendar className="w-3 h-3" /> 전체 기간
          </div>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white p-5 rounded-[32px] border border-neutral-50 shadow-sm flex items-center justify-between group transition-active active:bg-neutral-50">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  tx.type === 'earn' ? 'bg-eco-green/10 text-eco-green' : 'bg-red-50 text-red-600'
                }`}>
                  {tx.type === 'earn' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownLeft className="w-6 h-6" />}
                </div>
                <div>
                  <p className="font-bold text-neutral-800 leading-tight">{tx.title}</p>
                  <p className="text-[10px] font-bold text-neutral-400">{tx.date} • {tx.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${tx.type === 'earn' ? 'text-eco-green' : 'text-neutral-800'}`}>
                  {tx.type === 'earn' ? '+' : ''}{tx.points.toLocaleString()} P
                </p>
                {tx.bonus && (
                  <p className="text-[10px] font-bold text-eco-yellow">보너스 +{tx.bonus}P</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
