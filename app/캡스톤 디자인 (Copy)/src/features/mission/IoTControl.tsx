import React from 'react';
import { Lightbulb, Thermometer } from 'lucide-react';

interface IoTControlProps {
  iotStatus: { lights: boolean; ac: boolean };
  onToggle: (key: 'lights' | 'ac') => void;
}

export function IoTControl({ iotStatus, onToggle }: IoTControlProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div 
        onClick={() => onToggle('lights')}
        className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer active:scale-95 flex flex-col items-center gap-4 ${
          iotStatus.lights 
            ? 'bg-white border-neutral-100 shadow-sm' 
            : 'bg-eco-green border-eco-green shadow-lg shadow-eco-green/20 text-white'
        }`}
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${
          iotStatus.lights ? 'bg-eco-yellow/10 text-eco-yellow' : 'bg-white/20 text-white'
        }`}>
          <Lightbulb className={`w-7 h-7 ${iotStatus.lights ? 'fill-eco-yellow/20' : ''}`} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold">강의실 전등</p>
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
            iotStatus.lights ? 'text-neutral-400' : 'text-white/80'
          }`}>
            {iotStatus.lights ? '현재 켜짐' : '절전 완료'}
          </p>
        </div>
        <div className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${
          !iotStatus.lights ? 'bg-eco-green/50 border border-white/20' : 'bg-neutral-200'
        }`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
            !iotStatus.lights ? 'translate-x-6' : 'translate-x-0'
          }`}></div>
        </div>
      </div>

      <div 
        onClick={() => onToggle('ac')}
        className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer active:scale-95 flex flex-col items-center gap-4 ${
          !iotStatus.ac 
            ? 'bg-white border-neutral-100' 
            : 'bg-eco-green border-eco-green shadow-lg shadow-eco-green/20 text-white'
        }`}
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${
          !iotStatus.ac ? 'bg-neutral-100 text-neutral-400' : 'bg-white/20 text-white'
        }`}>
          <Thermometer className="w-7 h-7" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold">냉난방기</p>
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
            !iotStatus.ac ? 'text-neutral-400' : 'text-white/80'
          }`}>
            {!iotStatus.ac ? '운전 중지' : '운영 중'}
          </p>
        </div>
        <div className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${
          iotStatus.ac ? 'bg-eco-green/50 border border-white/20' : 'bg-neutral-300'
        }`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
            iotStatus.ac ? 'translate-x-6' : 'translate-x-0'
          }`}></div>
        </div>
      </div>
    </div>
  );
}
