"use client";
import { useState, useEffect } from 'react';
import { RoomCard } from '@/features/dashboard/RoomCard';
import { SystemStatusPanel } from '@/features/dashboard/SystemStatusPanel';
import { AIInsightCard } from '@/features/dashboard/AIInsightCard';
import { AnomalyAlert } from '@/features/dashboard/AnomalyAlert';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Room, generateMockRooms } from '@/lib/mockData';
import { fetchSpaces } from '@/lib/api';

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLastSync(new Date());

    // Vercel ↔ Render 연결 확인용 코드
    const checkConnection = () => {
      fetchSpaces()
        .then(() => setServerStatus('online'))
        .catch(() => setServerStatus('offline'));
    };

    checkConnection();

    const interval = setInterval(() => {
      // 연결 상태 재확인
      checkConnection();

      setRooms(prevRooms =>
        prevRooms.map(room => {
          // 랜덤 변화 시뮬레이션 (백엔드 연동 전까지 유지)
          if (Math.random() < 0.15) {
            const change = Math.floor(Math.random() * 6) - 3;
            const newOccupancy = Math.max(0, Math.min(room.capacity, room.currentOccupancy + change));

            let newStatus: 'available' | 'occupied' | 'full';
            if (newOccupancy === 0) newStatus = 'available';
            else if (newOccupancy >= room.capacity * 0.9) newStatus = 'full';
            else newStatus = 'occupied';

            const newRssi = Math.max(-90, Math.min(-30, -50 + Math.floor(Math.random() * 40)));

            return {
              ...room,
              currentOccupancy: newOccupancy,
              status: newStatus,
              rssi: newRssi,
              lastUpdate: new Date(),
            };
          }
          return room;
        })
      );
      setLastSync(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 flex items-center gap-3">
                EcoCampus+
                <span className="text-gray-500">강의실 모니터링</span>
              </h1>
              <div className="flex items-center gap-6 mt-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>마지막 동기화: {lastSync?.toLocaleTimeString('ko-KR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {serverStatus === 'online' ? (
                    <>
                      <Wifi className="w-4 h-4 text-[#81D18A]" />
                      <span className="text-[#81D18A]">서버 온라인</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4 text-red-600" />
                      <span className="text-red-600">서버 오프라인</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          {/* System Status */}
          <div className="mb-8">
            <SystemStatusPanel />
          </div>

          {/* AI Insight & Anomaly Alert */}
          <div className="mb-8">
            <AIInsightCard />
          </div>

          <div className="mb-8">
            <AnomalyAlert rooms={rooms} />
          </div>

          {/* Room Card Grid */}
          <div>
            <h2 className="text-gray-900 mb-6">강의실 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}