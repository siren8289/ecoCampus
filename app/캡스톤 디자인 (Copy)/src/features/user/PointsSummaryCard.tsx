import React from 'react';
import { Wallet } from 'lucide-react';

interface PointsSummaryCardProps {
  points: number;
}

export function PointsSummaryCard({ points }: PointsSummaryCardProps) {
  return (
    <div className="relative">
      <div className="relative bg-white rounded-[32px] p-8 text-neutral-900 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="relative z-10 flex justify-between items-start mb-10">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]">Available Balance</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-5xl font-bold tracking-tight text-neutral-900">{points.toLocaleString()}</h3>
              <span className="text-xl font-bold text-eco-green">P</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-[22px] bg-eco-green/5 flex items-center justify-center text-eco-green border border-eco-green/10">
            <Wallet className="w-7 h-7 stroke-[1.5]" />
          </div>
        </div>
        
        <div className="relative z-10 flex gap-4">
          <button className="flex-1 bg-neutral-50 py-4.5 rounded-[24px] font-bold text-[15px] text-neutral-600 hover:bg-neutral-100 active:scale-95 transition-all border border-neutral-200/50">
            충전하기
          </button>
          <button className="flex-1 bg-eco-green py-4.5 rounded-[24px] font-bold text-[15px] text-white shadow-[0_12px_24px_-8px_rgba(129,209,138,0.5)] hover:shadow-[0_16px_28px_-8px_rgba(129,209,138,0.6)] active:scale-95 transition-all">
            교환하기
          </button>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-eco-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
}
