"use client";
import { useState } from 'react';
import { Settings, Clock, Save } from 'lucide-react';
import { ChangeHistoryTable } from '@/features/admin/ChangeHistoryTable';

interface SystemSettings {
  rssiThreshold: number;
  occupancyAlertThreshold: number;
  autoEnergyMode: boolean;
  notificationEmail: string;
}

export function Admin() {
  const [settings, setSettings] = useState<SystemSettings>({
    rssiThreshold: -70,
    occupancyAlertThreshold: 90,
    autoEnergyMode: true,
    notificationEmail: 'admin@ecocampus.ac.kr',
  });

  const [tempSettings, setTempSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setTempSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setSettings(tempSettings);
    setHasChanges(false);

    // 변경 이력 기록 (실제로는 서버로 전송)
    const changeRecord = {
      timestamp: new Date(),
      user: '관리자',
      changes: Object.keys(settings).filter(key => 
        settings[key as keyof SystemSettings] !== tempSettings[key as keyof SystemSettings]
      ),
    };

    console.log('설정 변경 저장:', changeRecord);
    alert('설정이 저장되었습니다.');
  };

  const handleReset = () => {
    setTempSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-gray-700" />
            <div>
              <h1 className="text-gray-900">관리자 설정</h1>
              <p className="text-gray-600 mt-1">시스템 설정 및 변경 이력 관리</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Settings */}
            <div className="space-y-6">
              {/* System Settings Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#81D18A]/20 rounded-xl">
                    <Settings className="w-6 h-6 text-[#81D18A]" />
                  </div>
                  <h2 className="text-gray-900 text-xl font-semibold">시스템 설정</h2>
                </div>

                <div className="space-y-6">
                  {/* RSSI Threshold */}
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      RSSI 임계값 (dBm)
                    </label>
                    <input
                      type="number"
                      value={tempSettings.rssiThreshold}
                      onChange={(e) => handleSettingChange('rssiThreshold', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81D18A] text-base"
                      min="-100"
                      max="0"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      점유 감지를 위한 RSSI 신호 기준값
                    </p>
                  </div>

                  {/* Occupancy Alert Threshold */}
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      점유율 경고 임계값 (%)
                    </label>
                    <input
                      type="number"
                      value={tempSettings.occupancyAlertThreshold}
                      onChange={(e) => handleSettingChange('occupancyAlertThreshold', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81D18A] text-base"
                      min="0"
                      max="100"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      경고 알림을 발송할 점유율 기준
                    </p>
                  </div>

                  {/* Auto Energy Mode */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.autoEnergyMode}
                        onChange={(e) => handleSettingChange('autoEnergyMode', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#81D18A] focus:ring-[#81D18A]"
                      />
                      <div>
                        <span className="text-gray-900 font-medium text-base">
                          자동 에너지 절감 모드
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          빈 강의실 자동 조명/냉난방 제어
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Notification Email */}
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      알림 이메일
                    </label>
                    <input
                      type="email"
                      value={tempSettings.notificationEmail}
                      onChange={(e) => handleSettingChange('notificationEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81D18A] text-base"
                      placeholder="admin@ecocampus.ac.kr"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      이상 감지 시 알림을 받을 이메일 주소
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {hasChanges && (
                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-[#81D18A] text-white px-6 py-3 rounded-lg hover:bg-[#6fba78] transition-colors font-medium flex items-center justify-center gap-2 text-base"
                    >
                      <Save className="w-5 h-5" />
                      변경사항 저장
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-base"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>

              {/* Current Settings Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-blue-900 font-semibold text-base mb-1">
                      현재 적용된 설정
                    </h3>
                    <div className="text-blue-800 text-sm space-y-1">
                      <p>• RSSI 임계값: {settings.rssiThreshold} dBm</p>
                      <p>• 점유율 경고: {settings.occupancyAlertThreshold}%</p>
                      <p>• 에너지 모드: {settings.autoEnergyMode ? '활성' : '비활성'}</p>
                      <p>• 알림 이메일: {settings.notificationEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Change History */}
            <div>
              <ChangeHistoryTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}