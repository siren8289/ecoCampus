import React from 'react';
import { Home, ClipboardList, User, Award, BarChart3 } from 'lucide-react';
import { Page } from '../../App';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'mission', icon: ClipboardList, label: '미션' },
    { id: 'character', icon: Award, label: '성장' },
    { id: 'ranking', icon: BarChart3, label: '랭킹' },
    { id: 'mypage', icon: User, label: '마이' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-6 py-2 flex justify-between items-center max-w-md mx-auto z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentPage === tab.id || (tab.id === 'mission' && currentPage === 'mission-detail');
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id as Page)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-eco-green' : 'text-neutral-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${isActive ? 'bg-eco-green/10' : ''}`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
