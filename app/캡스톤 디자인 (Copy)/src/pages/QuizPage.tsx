import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, HelpCircle, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizPageProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "다음 중 탄소 중립(Carbon Neutral)의 정의로 가장 적절한 것은?",
    options: [
      "이산화탄소 배출을 완전히 제로(0)로 만드는 것",
      "배출한 만큼의 탄소를 흡수하거나 제거하여 실질적인 배출량을 '0'으로 만드는 것",
      "전기 에너지만을 사용하는 캠퍼스를 구축하는 것",
      "종이 사용을 줄이고 태블릿 PC만 사용하는 것"
    ],
    correctAnswer: 1,
    explanation: "탄소 중립은 배출량과 흡수량이 균형을 이루어 실질적인 순 배출량이 0이 되는 상태를 의미합니다."
  },
  {
    id: 2,
    question: "우리나라에서 분리배출 시 우유팩(종이팩)은 어떻게 처리해야 할까요?",
    options: [
      "일반 종이류와 함께 섞어서 배출한다",
      "내용물을 비우고 씻은 뒤 일반 쓰레기로 버린다",
      "내용물을 비우고 말린 뒤 종이팩 전용 수거함에 배출한다",
      "플라스틱 뚜껑이 있다면 그대로 종이팩 수거함에 버린다"
    ],
    correctAnswer: 2,
    explanation: "종이팩은 고급 펄프로 만들어져 재활용 가치가 높으므로 일반 폐지와 구분하여 전용 수거함에 넣어야 합니다."
  },
  {
    id: 3,
    question: "ESG 경영에서 'S'가 의미하는 영역은 무엇일까요?",
    options: [
      "Sustainability (지속가능성)",
      "Safety (안전)",
      "Social (사회)",
      "Service (서비스)"
    ],
    correctAnswer: 2,
    explanation: "ESG는 Environment(환경), Social(사회), Governance(지배구조)의 약자입니다."
  }
];

export function QuizPage({ onBack, onComplete }: QuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const currentQuestion = questions[currentIndex];

  if (isFinished) {
    const earnedPoints = score === questions.length ? 50 : score * 10;
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-3xl bg-eco-yellow flex items-center justify-center text-white shadow-xl shadow-eco-yellow/20">
          <Trophy className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-neutral-800">퀴즈 완료!</h2>
          <p className="text-neutral-500 font-medium">
            총 {questions.length}문제 중 {score}문제를 맞히셨습니다.
          </p>
        </div>
        <div className="bg-eco-green/10 px-8 py-4 rounded-3xl border border-eco-green/20">
          <p className="text-sm font-bold text-eco-green uppercase tracking-widest mb-1">획득 포인트</p>
          <p className="text-3xl font-bold text-eco-green">+{earnedPoints}P</p>
        </div>
        <button 
          onClick={() => onComplete(earnedPoints)}
          className="w-full bg-eco-green text-white py-5 rounded-3xl font-bold text-lg shadow-lg shadow-eco-green/20 active:scale-95 transition-all"
        >
          포인트 받기
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-400 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="bg-neutral-100 px-4 py-1.5 rounded-full text-xs font-bold text-neutral-400">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-eco-green"
        />
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pb-6">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-eco-green/10 flex items-center justify-center text-eco-green">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-neutral-800 leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = isAnswered && idx === currentQuestion.correctAnswer;
            const isWrong = isAnswered && isSelected && idx !== currentQuestion.correctAnswer;

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full p-5 rounded-[24px] text-left border-2 transition-all flex items-center justify-between group ${
                  isSelected 
                    ? 'border-eco-green bg-eco-green/5' 
                    : 'border-neutral-100 bg-white hover:border-eco-green/30'
                } ${isAnswered ? 'cursor-default' : 'active:scale-[0.98]'}`}
              >
                <span className={`text-[15px] font-bold ${isSelected ? 'text-eco-green' : 'text-neutral-600'}`}>
                  {option}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-eco-green flex items-center justify-center text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-3xl ${
              selectedOption === currentQuestion.correctAnswer 
                ? 'bg-eco-green/10 border border-eco-green/20' 
                : 'bg-red-50 border border-red-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {selectedOption === currentQuestion.correctAnswer ? (
                <CheckCircle2 className="w-5 h-5 text-eco-green" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className={`font-bold ${
                selectedOption === currentQuestion.correctAnswer ? 'text-eco-green' : 'text-red-500'
              }`}>
                {selectedOption === currentQuestion.correctAnswer ? '정답입니다!' : '오답입니다'}
              </span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              {currentQuestion.explanation}
            </p>
          </motion.div>
        )}
      </div>

      <div className="pt-2">
        {!isAnswered ? (
          <button 
            disabled={selectedOption === null}
            onClick={() => setIsAnswered(true)}
            className={`w-full py-5 rounded-3xl font-bold text-lg transition-all ${
              selectedOption !== null 
                ? 'bg-eco-green text-white shadow-lg shadow-eco-green/20' 
                : 'bg-neutral-100 text-neutral-400'
            }`}
          >
            정답 확인하기
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="w-full bg-eco-green text-white py-5 rounded-3xl font-bold text-lg shadow-lg shadow-eco-green/20 flex items-center justify-center gap-2"
          >
            {currentIndex === questions.length - 1 ? '결과 보기' : '다음 문제'}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
