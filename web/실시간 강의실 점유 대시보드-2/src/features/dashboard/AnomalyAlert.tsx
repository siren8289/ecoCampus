import { AlertTriangle, Clock } from 'lucide-react';
import { Room } from '../../utils/mockData';

interface AnomalyAlertProps {
  rooms: Room[];
}

interface AnomalyData {
  roomId: string;
  roomName: string;
  type: 'empty' | 'abnormal';
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export function AnomalyAlert({ rooms }: AnomalyAlertProps) {
  const anomalies: AnomalyData[] = [];

  // 비어있는 공간 감지
  rooms.forEach(room => {
    if (room.status === 'available') {
      anomalies.push({
        roomId: room.id,
        roomName: `${room.building} ${room.name}`,
        type: 'empty',
        message: '빈 강의실 - 에너지 절감 모드 활성화 권장',
        severity: 'low',
      });
    }
  });

  // 비정상 패턴 시뮬레이션
  const abnormalRooms = rooms.filter(room => room.rssi && room.rssi < -80);
  abnormalRooms.forEach(room => {
    anomalies.push({
      roomId: room.id,
      roomName: `${room.building} ${room.name}`,
      type: 'abnormal',
      message: `약한 RSSI 신호 감지 (${room.rssi}dBm) - 비콘 점검 필요`,
      severity: 'medium',
    });
  });

  if (anomalies.length === 0) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-300 text-red-800';
      case 'medium':
        return 'bg-orange-50 border-orange-300 text-orange-800';
      default:
        return 'bg-blue-50 border-blue-300 text-blue-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-orange-100 rounded-xl">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-gray-900 text-xl font-semibold">이상 감지 알림</h2>
        <span className="ml-auto bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
          {anomalies.length}건
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {anomalies.map((anomaly, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 ${getSeverityColor(anomaly.severity)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-base">{anomaly.roomName}</h3>
                  <span className="text-xs px-2 py-0.5 bg-white/60 rounded">
                    {anomaly.type === 'empty' ? '빈 공간' : '비정상 패턴'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{anomaly.message}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Clock className="w-3.5 h-3.5" />
                <span>방금 전</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
