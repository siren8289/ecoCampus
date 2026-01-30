import React from 'react';
import { Leaf } from 'lucide-react';
import { Page } from '../../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-neutral-100">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="bg-emerald-500 p-1.5 rounded-lg">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-emerald-600 tracking-tight">ecocampus+</h1>
      </div>
      <button 
        onClick={() => onNavigate('mypage')}
        className="relative active:scale-90 transition-transform"
      >
        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
          <span className="text-xs font-semibold">JD</span>
        </div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></div>
      </button>
    </header>
  );
}
