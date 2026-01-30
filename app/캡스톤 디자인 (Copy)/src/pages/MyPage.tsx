import React from 'react';
import { User, ChevronRight, LogOut, Wallet, Award, Bell, Shield, HelpCircle } from 'lucide-react';
import { Page } from '../App';

interface MyPageProps {
  user: {
    name: string;
    department: string;
    points: number;
    level: number;
  };
  onNavigate: (page: Page) => void;
}

export function MyPage({ user, onNavigate }: MyPageProps) {
  const menuItems = [
    { id: 'points' as Page, icon: Wallet, label: '포인트 이용 내역', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'character' as Page, icon: Award, label: '획득한 뱃지', color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'mypage' as Page, icon: Bell, label: '알림 설정', color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'mypage' as Page, icon: Shield, label: '개인정보 설정', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'mypage' as Page, icon: HelpCircle, label: '고객센터', color: 'text-neutral-500', bg: 'bg-neutral-50' },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-[28px] bg-eco-green/10 flex items-center justify-center text-3xl border-4 border-white shadow-sm overflow-hidden text-eco-green">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">{user.name}</h2>
          <p className="text-sm font-bold text-neutral-400">{user.department}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-eco-green"></span>
            <span className="text-[10px] font-bold text-eco-green uppercase tracking-widest">Lv.{user.level} 환경 수호자</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onNavigate('points')}
        className="bg-white rounded-[32px] p-6 shadow-sm border border-neutral-50 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
      >
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">보유 포인트</p>
          <p className="text-2xl font-bold text-eco-green">{user.points.toLocaleString()} <span className="text-sm">P</span></p>
        </div>
        <button className="bg-eco-green text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-eco-green/20 active:scale-95 transition-transform pointer-events-none">
          상세 보기
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-neutral-800 px-1">계정 관리</h3>
        <div className="bg-white rounded-[32px] border border-neutral-50 overflow-hidden shadow-sm">
          {menuItems.map((item, index) => (
            <button 
              key={item.label}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-neutral-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-neutral-700">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300" />
            </button>
          ))}
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-4 text-neutral-400 font-bold text-sm hover:text-red-500 transition-colors">
        <LogOut className="w-4 h-4" />
        로그아웃
      </button>

      <div className="text-center space-y-1 pt-4">
        <p className="text-[10px] font-bold text-neutral-300">ecocampus+ v2.4.0</p>
        <p className="text-[10px] font-bold text-neutral-200">© 2026 ESG Campus Challenge</p>
      </div>
    </div>
  );
}
