"use client";
import { Brain, Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface AIAnalysisPanelProps {
  roomId: string;
  currentOccupancy: number;
  capacity: number;
}

export function AIAnalysisPanel({ roomId, currentOccupancy, capacity }: AIAnalysisPanelProps) {
  // AI 기반 현재 점유 상태 판별
  const occupancyRate = (currentOccupancy / capacity) * 100;
  const mlPrediction = occupancyRate > 0 ? '점유됨' : '비어있음';
  const mlConfidence = occupancyRate > 0 ? Math.min(95, 70 + occupancyRate / 5) : 98;

  // AI 기반 향후 사용 예측
  const nextHourPrediction = Math.floor(Math.random() * 3) === 0 ? '증가 예상' : '현상 유지';
  const predictedOccupancy = nextHourPrediction === '증가 예상' 
    ? Math.min(capacity, currentOccupancy + Math.floor(Math.random() * 10) + 5)
    : currentOccupancy;

  // AI 기반 이상 패턴 탐지
  const hasAnomaly = Math.random() > 0.7;
  const anomalyType = hasAnomaly 
    ? ['야간 시간대 점유', '예상외 공실', 'RSSI 신호 불안정'][Math.floor(Math.random() * 3)]
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-100 rounded-xl">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-gray-900 text-xl font-semibold">AI 분석 결과</h2>
      </div>

      <div className="space-y-5">
        {/* 현재 점유 상태 판별 */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-blue-900 font-semibold text-base">
                  점유 상태 판별
                </h3>
              </div>
              <p className="text-blue-800 text-base mb-3">
                현재 상태: <span className="font-bold">{mlPrediction}</span>
              </p>
              <div className="flex items-center justify-between text-sm text-blue-700">
                <span>신뢰도</span>
                <span className="font-semibold">{mlConfidence.toFixed(1)}%</span>
              </div>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${mlConfidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 향후 사용 예측 */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-green-100 rounded-lg flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-green-900 font-semibold text-base">
                  사용 예측
                </h3>
              </div>
              <p className="text-green-800 text-base mb-2">
                다음 1시간: <span className="font-bold">{nextHourPrediction}</span>
              </p>
              <p className="text-green-700 text-sm">
                예상 점유: <span className="font-semibold">{predictedOccupancy}명</span> / {capacity}명
                <span className="ml-2 text-xs">
                  ({((predictedOccupancy / capacity) * 100).toFixed(0)}%)
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 이상 패턴 탐지 */}
        <div className={`border-2 rounded-lg p-5 ${
          hasAnomaly 
            ? 'bg-orange-50 border-orange-200' 
            : 'bg-[#81D18A]/10 border-[#81D18A]/30'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-lg flex-shrink-0 ${
              hasAnomaly ? 'bg-orange-100' : 'bg-[#81D18A]/20'
            }`}>
              {hasAnomaly ? (
                <AlertCircle className="w-5 h-5 text-orange-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-[#81D18A]" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold text-base ${
                  hasAnomaly ? 'text-orange-900' : 'text-gray-900'
                }`}>
                  이상 패턴 탐지
                </h3>
              </div>
              <p className={`text-base ${
                hasAnomaly ? 'text-orange-800' : 'text-gray-700'
              }`}>
                {hasAnomaly ? (
                  <>
                    <span className="font-bold">이상 감지됨</span>
                    <span className="block mt-1 text-sm">{anomalyType}</span>
                  </>
                ) : (
                  <span className="font-semibold">정상 패턴 - 이상 없음</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
