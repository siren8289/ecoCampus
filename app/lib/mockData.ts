export interface Mission {
  id: string;
  title: string;
  category: string;
  points: number;
  bonusPoints?: number;
  icon: string;
  description: string;
  method: string;
  isAIRecommended?: boolean;
  recommendationReason?: string;
  timeBonus?: string;
}

export const initialUser = {
  name: '김캠퍼',
  department: '컴퓨터공학과',
  points: 1250,
  level: 2,
  xp: 45,
};

export const initialMissions: Mission[] = [
  {
    id: 'iot-1',
    title: '강의실 전등 끄기',
    category: '에너지',
    points: 50,
    bonusPoints: 20,
    icon: '💡',
    description: '빈 강의실의 전등을 스마트 제어로 꺼서 전력을 절약하세요.',
    method: '앱의 IoT 제어 버튼을 눌러 전등을 소등합니다. 30분 이상 유지 시 포인트가 지급됩니다.',
    isAIRecommended: true,
    recommendationReason: '현재 공강 시간대이며 주변 강의실에 사용자가 없습니다.',
    timeBonus: '지금 참여 시 +20P',
  },
  {
    id: 'iot-2',
    title: '에어컨 적정온도 설정',
    category: '에너지',
    points: 40,
    bonusPoints: 10,
    icon: '❄️',
    description: '강의실 냉방기를 26도로 설정하여 에너지를 효율적으로 사용하세요.',
    method: 'IoT 제어판에서 온도를 26도 이상으로 설정하고 유지합니다.',
    isAIRecommended: false,
  },
  {
    id: 'tumbler-1',
    title: '텀블러 사용 인증',
    category: '생활',
    points: 30,
    icon: '🥤',
    description: '교내 카페에서 일회용 컵 대신 개인 텀블러를 사용하세요.',
    method: '텀블러 사용 사진을 촬영하여 업로드합니다.',
  },
  {
    id: 'quiz-1',
    title: '오늘의 ESG 퀴즈',
    category: '교육',
    points: 20,
    icon: '❓',
    description: '환경과 사회적 책임을 배우는 간단한 퀴즈를 풀어보세요.',
    method: '3문항의 퀴즈를 모두 맞히면 포인트가 지급됩니다.',
  }
];
