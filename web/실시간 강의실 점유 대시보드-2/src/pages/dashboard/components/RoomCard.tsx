import { Link } from 'react-router-dom';
import { Radio, Clock } from 'lucide-react';
import { Room } from '../../../utils/mockData';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const statusConfig = {
    available: {
      bg: 'bg-white',
      border: 'border-gray-200',
      statusBg: 'bg-[#A8E6AF]',
      statusText: 'text-green-800',
      statusLabel: '사용 가능',
    },
    occupied: {
      bg: 'bg-white',
      border: 'border-[#FFE48A]',
      statusBg: 'bg-[#FFF4CC]',
      statusText: 'text-orange-800',
      statusLabel: '사용 중',
    },
    full: {
      bg: 'bg-white',
      border: 'border-red-300',
      statusBg: 'bg-red-100',
      statusText: 'text-red-700',
      statusLabel: '만실',
    },
  };

  const config = statusConfig[room.status];
  const rssiValue = room.rssi || -65;
  const lastUpdate = room.lastUpdate || new Date();
  const timeDiff = Math.floor((Date.now() - lastUpdate.getTime()) / 1000);

  return (
    <Link
      to={`/room/${room.id}`}
      className={`${config.bg} border-2 ${config.border} rounded-xl p-7 transition-all hover:shadow-xl hover:scale-[1.02] block`}
    >
      {/* Room Name */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-gray-900 text-xl">{room.name}</h3>
        <span className={`${config.statusBg} ${config.statusText} px-4 py-1.5 rounded-full text-base font-medium`}>
          {config.statusLabel}
        </span>
      </div>

      {/* RSSI Value */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-gray-600">
            <Radio className="w-5 h-5" />
            <span className="text-base">RSSI</span>
          </div>
          <span className="text-gray-900 text-lg font-semibold">{rssiValue} dBm</span>
        </div>
      </div>

      {/* Last Update Time */}
      <div className="flex items-center justify-between text-gray-600">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5" />
          <span className="text-base">마지막 업데이트</span>
        </div>
        <span className="text-base font-medium">
          {timeDiff < 60 ? `${timeDiff}초 전` : `${Math.floor(timeDiff / 60)}분 전`}
        </span>
      </div>
    </Link>
  );
}