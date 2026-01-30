import { Clock, User, Settings } from 'lucide-react';

interface ChangeHistory {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  detail: string;
  type: 'setting' | 'threshold' | 'system';
}

export function ChangeHistoryTable() {
  const historyData: ChangeHistory[] = [
    {
      id: 'ch-001',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      user: '관리자',
      action: 'RSSI 임계값 변경',
      detail: '-75 dBm → -70 dBm',
      type: 'threshold',
    },
    {
      id: 'ch-002',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      user: '관리자',
      action: '에너지 절감 모드 활성화',
      detail: '비활성 → 활성',
      type: 'setting',
    },
    {
      id: 'ch-003',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      user: '시스템',
      action: '점유율 경고 임계값 조정',
      detail: '85% → 90%',
      type: 'threshold',
    },
    {
      id: 'ch-004',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      user: '관리자',
      action: '알림 이메일 변경',
      detail: 'old@email.com → admin@ecocampus.ac.kr',
      type: 'setting',
    },
    {
      id: 'ch-005',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      user: '시스템',
      action: '시스템 설정 백업 완료',
      detail: '정기 백업 수행됨',
      type: 'system',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'threshold':
        return 'bg-orange-100 text-orange-700';
      case 'setting':
        return 'bg-blue-100 text-blue-700';
      case 'system':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'threshold':
        return '임계값';
      case 'setting':
        return '설정';
      case 'system':
        return '시스템';
      default:
        return '기타';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = Date.now();
    const diff = Math.floor((now - date.getTime()) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-100 rounded-xl">
          <Clock className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-gray-900 text-xl font-semibold">변경 이력</h2>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {historyData.map((history) => (
          <div
            key={history.id}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getTypeColor(history.type)}`}>
                  {getTypeLabel(history.type)}
                </span>
                <h3 className="text-gray-900 font-semibold text-base">
                  {history.action}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimestamp(history.timestamp)}</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-3 pl-1">
              {history.detail}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{history.user}</span>
              <span className="text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {history.timestamp.toLocaleString('ko-KR')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 text-center">
          총 {historyData.length}개의 변경 이력
        </div>
      </div>
    </div>
  );
}
