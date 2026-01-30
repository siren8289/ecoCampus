import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, HelpCircle, Trophy } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../lib/AppContext';

// Simplified questions for demo
const questions = [
  {
    id: 1,
    question: "다음 중 탄소 중립(Carbon Neutral)의 정의로 가장 적절한 것은?",
    options: [
      "이산화탄소 배출을 완전히 제로(0)로 만드는 것",
      "배출한 만큼의 탄소를 흡수하거나 제거하여 실질적인 배출량을 '0'으로 만드는 것",
      "전기 에너지만을 사용하는 캠퍼스를 구축하는 것",
      "종이 사용을 줄이고 태블릿 PC만 사용하는 것"
    ],
    correctAnswer: 1, // 0-indexed in array? source was 1-indexed (based on options array index? source said correctAnswer: 1, options length 4. Array index 1 => 2nd option).
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

export default function QuizPage() {
  const router = useRouter();
  const { setUser } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
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

  const handleComplete = (earnedPoints: number) => {
      setUser(prev => ({ ...prev, points: prev.points + earnedPoints }));
      // Instead of going to success page which expects MissionResult, we can just go back or show a toast.
      // Or create a fake mission result for quiz.
      // For now, go home.
      router.push('/');
  };

  if (isFinished) {
    const earnedPoints = score === questions.length ? 50 : score * 10;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 32 }}>
        <View style={{ width: 96, height: 96, borderRadius: 24, backgroundColor: '#EAB308', alignItems: 'center', justifyContent: 'center', shadowColor: '#EAB308', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 }}>
          <Trophy size={48} color="#ffffff" />
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#262626' }}>퀴즈 완료!</Text>
          <Text style={{ color: '#737373', fontWeight: '500' }}>
            총 {questions.length}문제 중 {score}문제를 맞히셨습니다.
          </Text>
        </View>
        <View style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#22C55E', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>획득 포인트</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#22C55E' }}>+{earnedPoints}P</Text>
        </View>
        <TouchableOpacity 
          onPress={() => handleComplete(earnedPoints)}
          style={{ width: '100%', backgroundColor: '#22C55E', paddingVertical: 20, borderRadius: 24, alignItems: 'center', justifyContent: 'center', shadowColor: '#22C55E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 10 }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>포인트 받기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top', 'left', 'right']}>
      <View style={{ flex: 1, padding: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ width: 40, height: 40, borderRadius: 16, backgroundColor: 'white', borderWidth: 1, borderColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}
          >
            <ArrowLeft size={20} color="#a3a3a3" />
          </TouchableOpacity>
          <View style={{ backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 999 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#A3A3A3' }}>{currentIndex + 1} / {questions.length}</Text>
          </View>
        </View>

        <View style={{ width: '100%', height: 8, backgroundColor: '#F5F5F5', borderRadius: 999, overflow: 'hidden', marginBottom: 24 }}>
          <View 
            style={{ height: '100%', backgroundColor: '#22C55E', width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={{ gap: 16, marginBottom: 24 }}>
            <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(34, 197, 94, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={24} color="#81d18a" />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#262626', lineHeight: 28 }}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
            //   const isCorrect = isAnswered && idx === currentQuestion.correctAnswer;
            //   const isWrong = isAnswered && isSelected && idx !== currentQuestion.correctAnswer;

              return (
                <TouchableOpacity
                  key={idx}
                  disabled={isAnswered}
                  onPress={() => handleOptionSelect(idx)}
                  style={{
                    width: '100%', 
                    padding: 20, 
                    borderRadius: 24, 
                    borderWidth: 2, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    borderColor: isSelected ? '#22C55E' : '#F5F5F5',
                    backgroundColor: isSelected ? 'rgba(34, 197, 94, 0.05)' : 'white'
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: 'bold', flex: 1, marginRight: 16, color: isSelected ? '#22C55E' : '#525252' }}>
                    {option}
                  </Text>
                  {isSelected && (
                    <View style={{ width: 20, height: 20, borderRadius: 999, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={14} color="#ffffff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {isAnswered && (
             <View style={{
               padding: 20, 
               borderRadius: 24, 
               marginTop: 24, 
               borderWidth: 1,
               backgroundColor: selectedOption === currentQuestion.correctAnswer ? 'rgba(34, 197, 94, 0.1)' : '#FEF2F2',
               borderColor: selectedOption === currentQuestion.correctAnswer ? 'rgba(34, 197, 94, 0.2)' : '#FEE2E2'
             }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <CheckCircle2 size={20} color="#81d18a" />
                  ) : (
                    <XCircle size={20} color="#ef4444" />
                  )}
                  <Text style={{
                    fontWeight: 'bold',
                    color: selectedOption === currentQuestion.correctAnswer ? '#22C55E' : '#EF4444'
                  }}>
                    {selectedOption === currentQuestion.correctAnswer ? '정답입니다!' : '오답입니다'}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: '#525252', lineHeight: 24, fontWeight: '500' }}>
                  {currentQuestion.explanation}
                </Text>
             </View>
          )}
        </ScrollView>

        <View style={{ paddingTop: 8 }}>
            {!isAnswered ? (
            <TouchableOpacity 
                disabled={selectedOption === null}
                onPress={() => setIsAnswered(true)}
                style={{
                    width: '100%', 
                    paddingVertical: 20, 
                    borderRadius: 24, 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: selectedOption !== null ? '#22C55E' : '#F5F5F5',
                    shadowColor: selectedOption !== null ? '#22C55E' : 'transparent',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: selectedOption !== null ? 0.2 : 0,
                    shadowRadius: 10,
                    elevation: selectedOption !== null ? 5 : 0
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: selectedOption !== null ? 'white' : '#A3A3A3' }}>정답 확인하기</Text>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity 
                onPress={handleNext}
                style={{ width: '100%', backgroundColor: '#22C55E', paddingVertical: 20, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: '#22C55E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 10 }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
                    {currentIndex === questions.length - 1 ? '결과 보기' : '다음 문제'}
                </Text>
                <ChevronRight size={20} color="#ffffff" />
            </TouchableOpacity>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
}
