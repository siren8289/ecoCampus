import React from 'react';
import { motion } from 'motion/react';

interface CharacterStageProps {
  level: number;
  emoji: string;
  name: string;
  color: string;
}

export function CharacterStage({ level, emoji, name, color }: CharacterStageProps) {
  return (
    <div className="relative aspect-square w-full max-w-[280px] mx-auto">
      <div className={`absolute inset-0 rounded-full ${color} opacity-20 blur-3xl`}></div>
      <div className="relative bg-white rounded-full p-4 shadow-xl border-4 border-white aspect-square flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[120px] drop-shadow-2xl"
        >
          {emoji}
        </motion.div>
      </div>
      
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="bg-white px-6 py-3 rounded-[24px] shadow-xl border border-neutral-100 flex items-center gap-3 whitespace-nowrap animate-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-eco-green uppercase tracking-[0.2em] leading-none mb-1">Step {level}</span>
            <span className="font-bold text-lg text-neutral-800 leading-none">{name}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-eco-green/10 flex items-center justify-center text-2xl shadow-inner">
            {emoji}
          </div>
        </div>
      </div>
    </div>
  );
}
