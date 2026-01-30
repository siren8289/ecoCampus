import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface InsightData {
  type: 'normal' | 'warning' | 'info';
  title: string;
  message: string;
  icon: 'trend' | 'alert' | 'check';
}

export function AIInsightCard() {
  const insights: InsightData[] = [
    {
      type: 'info',
      title: '사용 패턴 분석',
      message: '오전 9-11시 사이 강의실 점유율이 평균 75%로 가장 높습니다',
      icon: 'trend',
    },
    {
      type: 'warning',
      title: '비정상 패턴 감지',
      message: 'B동 102호에서 야간 시간대 비정상적인 RSSI 신호 감지됨',
      icon: 'alert',
    },
    {
      type: 'normal',
      title: '에너지 효율',
      message: '현재 빈 강의실 3개, 조명/냉난방 자동 제어로 에너지 20% 절감 중',
      icon: 'check',
    },
  ];

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'trend':
        return TrendingUp;
      case 'alert':
        return AlertTriangle;
      case 'check':
        return CheckCircle;
      default:
        return Brain;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          textColor: 'text-orange-900',
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-900',
        };
      default:
        return {
          bg: 'bg-[#81D18A]/10',
          border: 'border-[#81D18A]/30',
          iconBg: 'bg-[#81D18A]/20',
          iconColor: 'text-[#81D18A]',
          textColor: 'text-gray-900',
        };
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-100 rounded-xl">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-gray-900 text-xl font-semibold">AI 인사이트</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = getIconComponent(insight.icon);
          const colors = getColorClasses(insight.type);

          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border-2 rounded-lg p-5`}
            >
              <div className="flex flex-col gap-3">
                <div className={`${colors.iconBg} p-2 rounded-lg w-fit`}>
                  <Icon className={`w-5 h-5 ${colors.iconColor}`} />
                </div>
                <div>
                  <h3 className={`${colors.textColor} font-semibold text-base mb-2`}>
                    {insight.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {insight.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
