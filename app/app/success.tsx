import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckCircle2, Sparkles, ArrowRight, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../lib/AppContext';

export default function MissionSuccessPage() {
  const router = useRouter();
  const { lastMissionResult } = useApp();

  if (!lastMissionResult) {
      // Fallback if accessed directly
      return (
          <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>No mission result found.</Text>
              <TouchableOpacity onPress={() => router.replace('/')} style={{ marginTop: 16, padding: 16, backgroundColor: '#22C55E', borderRadius: 12 }}>
                  <Text style={{ color: 'white' }}>Home</Text>
              </TouchableOpacity>
          </SafeAreaView>
      );
  }

  const { points, bonus, feedback, nextMission } = lastMissionResult;
  const Icon = () => <Text style={{ fontSize: 24 }}>{nextMission.icon}</Text>;

  const handleNextMission = () => {
    // Navigate to next mission logic
    router.replace({ pathname: '/mission/[id]', params: { id: nextMission.id } });
  };

  const handleHome = () => {
      router.replace('/');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          
          <View style={{ position: 'relative', marginTop: 32, marginBottom: 32 }}>
            <View style={{ 
                width: 128, 
                height: 128, 
                backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                borderRadius: 40, 
                alignItems: 'center', 
                justifyContent: 'center',
                shadowColor: '#22C55E',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                transform: [{ rotate: '-15deg' }]
            }}>
              <CheckCircle2 size={64} color="#81d18a" strokeWidth={2.5} />
            </View>
            <View style={{ 
                position: 'absolute', 
                top: -12, 
                right: -12, 
                width: 48, 
                height: 48, 
                backgroundColor: '#EAB308', 
                borderRadius: 16, 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderWidth: 4, 
                borderColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 5
            }}>
               <Sparkles size={24} color="#ffffff" fill="#ffffff" />
            </View>
          </View>

          <View style={{ alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#262626', letterSpacing: -0.5 }}>미션 성공!</Text>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: 2 }}>지급 완료</Text>
                <View style={{ backgroundColor: '#22C55E', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 999, shadowColor: '#22C55E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>+{points + bonus}P</Text>
                </View>
              </View>
              {bonus > 0 && (
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#EAB308' }}>보너스 포인트 {bonus}P 포함 ✨</Text>
              )}
            </View>
          </View>

          <View style={{ 
              width: '100%', 
              backgroundColor: 'white', 
              padding: 32, 
              borderRadius: 40, 
              borderWidth: 1, 
              borderColor: 'rgba(34, 197, 94, 0.1)', 
              position: 'relative', 
              overflow: 'hidden', 
              marginBottom: 32,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1
          }}>
             <View style={{ position: 'absolute', top: 0, right: 0, width: 96, height: 96, backgroundColor: 'rgba(34, 197, 94, 0.05)', borderRadius: 999, transform: [{ translateX: 48 }, { translateY: -48 }] }} />
             
             <View style={{ gap: 16, zIndex: 10, position: 'relative' }}>
                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                     <View style={{ width: 40, height: 40, borderRadius: 16, backgroundColor: '#262626', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
                         <Text style={{ fontSize: 20 }}>🤖</Text>
                     </View>
                     <View>
                         <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#22C55E', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>AI 행동 분석 피드백</Text>
                         <Text style={{ fontWeight: 'bold', color: '#262626' }}>지속 가능한 캠퍼스</Text>
                     </View>
                 </View>

                 <View style={{ backgroundColor: '#FAFAFA', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F5F5F5' }}>
                     <Text style={{ color: '#404040', lineHeight: 24, fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center' }}>"{feedback}"</Text>
                 </View>

                 <Text style={{ fontSize: 11, color: '#A3A3A3', textAlign: 'center', fontWeight: '500', lineHeight: 18 }}>
                     방금 수행하신 활동은 캠퍼스 탄소 배출량을 {'\n'}
                     <Text style={{ color: '#22C55E', fontWeight: 'bold' }}>약 0.45kg 절감</Text>하는 효과가 있습니다.
                 </Text>
             </View>
          </View>

          <View style={{ width: '100%', gap: 16 }}>
              <View style={{ padding: 20, backgroundColor: '#262626', borderRadius: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                      <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon />
                      </View>
                      <View>
                          <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>다음 추천 미션</Text>
                          <Text style={{ color: 'white', fontWeight: 'bold' }}>{nextMission.title}</Text>
                      </View>
                  </View>
                  <TouchableOpacity 
                    onPress={handleNextMission}
                    style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 4 }}
                  >
                      <ArrowRight size={24} color="#ffffff" />
                  </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', gap: 16, paddingTop: 8 }}>
                   <TouchableOpacity 
                    onPress={handleHome}
                    style={{ flex: 1, backgroundColor: 'white', borderWidth: 2, borderColor: '#F5F5F5', paddingVertical: 20, borderRadius: 24, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}
                   >
                       <Text style={{ fontWeight: 'bold', color: '#262626' }}>홈으로 가기</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{ flex: 1, backgroundColor: '#F5F5F5', paddingVertical: 20, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                       <Share2 size={20} color="#737373" />
                       <Text style={{ fontWeight: 'bold', color: '#737373' }}>공유하기</Text>
                   </TouchableOpacity>
              </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
