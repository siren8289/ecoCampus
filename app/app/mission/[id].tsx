import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ArrowLeft, Zap, Info, Play, ArrowRight, Check } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../../lib/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MissionDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { missions, completeMission } = useApp();
  const mission = missions.find(m => m.id === id);

  const [status, setStatus] = useState<'idle' | 'participating' | 'completing'>('idle');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (status === 'participating') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  if (!mission) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Mission not found</Text>
        </View>
    );
  }

  const handleStart = () => {
    setStatus('participating');
  };

  const handleRequestComplete = () => {
    setStatus('completing');
    setTimeout(() => {
      const isSuccess = timer >= 5; // Simplified for demo (original was 60s but code said 5?)
      if (isSuccess) {
        completeMission(mission, true);
        router.push('/success');
      } else {
        setStatus('idle');
        setTimer(0);
        Alert.alert("알림", "조금만 더 참여해보세요! (최소 1분 이상 활동 유지가 필요합니다)");
      }
    }, 2000);
  };

  const isIot = mission.id.includes('iot');
  const bgColor = isIot ? '#EAB308' : '#22C55E';
  const Icon = () => <Text style={{ fontSize: 48 }}>{mission.icon}</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top', 'left', 'right']}>
       <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Hero Area */}
        <View style={{ height: 288, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: bgColor }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.2 }}>
                <View style={{ position: 'absolute', top: 0, left: 0, width: 256, height: 256, backgroundColor: 'white', borderRadius: 999, transform: [{ translateX: -128 }, { translateY: -128 }] }} />
                <View style={{ position: 'absolute', bottom: 0, right: 0, width: 256, height: 256, backgroundColor: 'rgba(34, 197, 94, 0.3)', borderRadius: 999, transform: [{ translateX: 128 }, { translateY: 128 }] }} />
            </View>
            
            <TouchableOpacity 
                onPress={() => router.back()}
                style={{ position: 'absolute', top: 16, left: 24, width: 40, height: 40, borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
            >
                <ArrowLeft  size={24} color="#ffffff" />
            </TouchableOpacity>

            <View style={{ position: 'relative', zIndex: 10, alignItems: 'center', gap: 16 }}>
                <View style={{ width: 96, height: 96, borderRadius: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
                    <Icon />
                </View>
            </View>

            <View style={{ position: 'absolute', bottom: 48, left: 24, right: 24, zIndex: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>{mission.category}</Text>
                    </View>
                    {mission.isAIRecommended && (
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
                            <Text style={{ color: '#EAB308', fontSize: 10, fontWeight: 'bold' }}>AI 추천</Text>
                        </View>
                    )}
                </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', lineHeight: 28 }}>{mission.title}</Text>
            </View>
        </View>

        {/* Content Body */}
        <View style={{ padding: 24, backgroundColor: '#FAFAFA', marginTop: -32, borderTopLeftRadius: 40, borderTopRightRadius: 40, position: 'relative', zIndex: 10, gap: 24 }}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#A3A3A3', textTransform: 'uppercase', marginBottom: 4 }}>예상 획득 포인트</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#22C55E' }}>+{mission.points}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#22C55E' }}>P</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(234, 179, 8, 0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#A3A3A3', textTransform: 'uppercase', marginBottom: 4 }}>보너스 조건</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#EAB308' }}>+{mission.bonusPoints || 0}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#EAB308' }}>P</Text>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#F5F5F5', gap: 16 }}>
                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ width: 32, height: 32, borderRadius: 12, backgroundColor: 'rgba(34, 197, 94, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
                            <Info size={16} color="#81d18a" />
                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#262626', fontSize: 18 }}>미션 목적</Text>
                    </View>
                    <Text style={{ color: '#525252', fontSize: 14, lineHeight: 24, fontWeight: '500' }}>{mission.description}</Text>
                </View>

                <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5' }} />

                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ width: 32, height: 32, borderRadius: 12, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' }}>
                             <Play size={16} color="#2563eb" fill="#2563eb" />
                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#262626', fontSize: 18 }}>수행 방법</Text>
                    </View>
                    <View style={{ backgroundColor: '#FAFAFA', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#F5F5F5' }}>
                         <Text style={{ color: '#404040', fontSize: 14, lineHeight: 24, fontWeight: '500', fontStyle: 'italic' }}>" {mission.method} "</Text>
                    </View>
                </View>
            </View>

            {status === 'idle' ? (
                <View style={{ gap: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Zap size={12} color="#a3a3a3" fill="#a3a3a3" />
                         <Text style={{ color: '#A3A3A3', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}>지금 시작하고 포인트를 받으세요</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={handleStart}
                        style={{ 
                            width: '100%', 
                            backgroundColor: '#22C55E', 
                            paddingVertical: 20, 
                            borderRadius: 24, 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 12,
                            shadowColor: '#22C55E',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            elevation: 5
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>미션 시작하기</Text>
                        <ArrowRight size={20} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ gap: 16 }}>
                     <View style={{ backgroundColor: 'white', padding: 32, borderRadius: 40, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.1)', alignItems: 'center', gap: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5 }}>
                        <View style={{ position: 'relative', width: 128, height: 128, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 128, height: 128, borderRadius: 999, borderWidth: 8, borderColor: 'rgba(34, 197, 94, 0.1)', position: 'absolute', top: 0, left: 0 }} />
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#22C55E', letterSpacing: -1 }}>
                                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                            </Text>
                            {/* Spinner could be Lottie or Animated.View */}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                             <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#22C55E' }}>활동 인증 중</Text>
                             <Text style={{ fontSize: 14, color: '#A3A3A3', fontWeight: '500' }}>캠퍼스 에너지 절약에 기여하고 있습니다</Text>
                        </View>
                     </View>

                     <TouchableOpacity 
                        onPress={handleRequestComplete}
                        disabled={status === 'completing'}
                        style={{ 
                            width: '100%', 
                            paddingVertical: 20, 
                            borderRadius: 24, 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 12,
                            backgroundColor: status === 'completing' ? '#D4D4D4' : '#262626'
                        }}
                     >
                         <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
                             {status === 'completing' ? 'AI 조건 검사 중...' : '활동 완료 요청'}
                         </Text>
                     </TouchableOpacity>
                </View>
            )}
        </View>
       </ScrollView>
    </SafeAreaView>
  );
}
