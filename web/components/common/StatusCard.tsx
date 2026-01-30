import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  statusIcon: ReactNode;
  statusText: string;
  statusColor: string;
  additionalInfo?: string;
  progress?: number;
}

export function StatusCard({
  title,
  subtitle,
  icon: Icon,
  iconBgColor,
  iconColor,
  statusIcon,
  statusText,
  statusColor,
  additionalInfo,
  progress,
}: StatusCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className={`p-3.5 ${iconBgColor} rounded-xl`}>
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-gray-900 text-lg font-semibold">{title}</h3>
            <p className="text-gray-600 text-base mt-0.5">{subtitle}</p>
          </div>
        </div>
        {statusIcon}
      </div>
      <div className={`${statusColor} text-base font-medium`}>
        {statusText}
      </div>
      {additionalInfo && (
        <div className="mt-2.5 text-gray-600 text-base">
          {additionalInfo}
        </div>
      )}
      {progress !== undefined && (
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}