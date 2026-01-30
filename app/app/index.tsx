import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../lib/AppContext';
import { IoTControl } from '../features/mission/IoTControl';
import { MissionCard } from '../features/mission/MissionCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const router = useRouter();
  const { user, missions, iotStatus, toggleIot } = useApp();

  const aiMission = missions.find(m => m.isAIRecommended);
  const otherMissions = missions.filter(m => !m.isAIRecommended).slice(0, 3);
  const characterLabels = ["씨앗 🌱", "어린 나무 🌳", "울창한 소나무 🌲", "푸른 지구 🌏"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        
        {/* Green Profile Card */}
        <View style={{ 
          backgroundColor: '#22C55E', 
          borderRadius: 32, 
          padding: 24, 
          shadowColor: '#22C55E', 
          shadowOffset: { width: 0, height: 10 }, 
          shadowOpacity: 0.2, 
          shadowRadius: 10, 
          elevation: 5, 
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <View style={{ position: 'relative', zIndex: 10, gap: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                  {user.department}
                </Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', letterSpacing: -0.5 }}>
                  {user.name}님!
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 8 }}>
                <TouchableOpacity 
                  onPress={() => router.push('/points')}
                  activeOpacity={0.8}
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    paddingHorizontal: 16, 
                    paddingVertical: 8, 
                    borderRadius: 16, 
                    borderColor: 'rgba(255,255,255,0.2)', 
                    borderWidth: 1 
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                    <Text style={{ fontSize: 10, opacity: 0.7 }}>내 포인트  </Text>
                    {user.points.toLocaleString()} P
                  </Text>
                </TouchableOpacity>
                <View style={{ 
                  backgroundColor: 'white', 
                  paddingHorizontal: 12, 
                  paddingVertical: 4, 
                  borderRadius: 999, 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  gap: 6,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2
                }}>
                  <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: '#22C55E' }} />
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#22C55E' }}>
                    {characterLabels[user.level - 1]}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* Background Decoration */}
          <View style={{ position: 'absolute', right: -24, bottom: -24, width: 128, height: 128, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 999 }} />
        </View>

        {/* Smart Control Center */}
        <View style={{ gap: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#262626', paddingHorizontal: 4, letterSpacing: -0.5 }}>스마트 제어 센터</Text>

          {aiMission && (
            <TouchableOpacity 
              onPress={() => router.push({ pathname: '/mission/[id]', params: { id: aiMission.id } })}
              activeOpacity={0.9}
              style={{ 
                backgroundColor: 'rgba(234, 179, 8, 0.1)', 
                borderWidth: 2, 
                borderColor: 'rgba(234, 179, 8, 0.2)', 
                padding: 24, 
                borderRadius: 32, 
                position: 'relative', 
                overflow: 'hidden'
              }}
            >
              <View style={{ position: 'absolute', top: 0, right: 0, width: 128, height: 128, backgroundColor: 'rgba(234, 179, 8, 0.05)', borderRadius: 999, transform: [{ translateX: 64 }, { translateY: -64 }] }} />
              
              <View style={{ position: 'relative', zIndex: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#EAB308', alignItems: 'center', justifyContent: 'center', shadowColor: '#EAB308', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 }}>
                    <Sparkles size={28} color="white" fill="white" />
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#EAB308', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>AI 추천 실천 행동</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#262626', lineHeight: 28 }}>{aiMission.title}</Text>
                  </View>
                </View>
                
                <View style={{ backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(234, 179, 8, 0.2)', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#EAB308', textDecorationLine: 'underline' }}>상세보기</Text>
                  <ArrowRight size={12} color="#EAB308" />
                </View>
              </View>
              
              {aiMission.recommendationReason && (
                <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'white', position: 'relative', zIndex: 10 }}>
                  <Text style={{ fontSize: 12, color: '#737373', fontWeight: '500', lineHeight: 18 }}>
                    <Text style={{ color: '#EAB308', fontWeight: 'bold' }}>WHY? </Text>
                    {aiMission.recommendationReason}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          <IoTControl iotStatus={iotStatus} onToggle={toggleIot} />
        </View>

        {/* Actionable Missions */}
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#262626', letterSpacing: -0.5 }}>실천 가능한 미션</Text>
            <TouchableOpacity onPress={() => router.push('/mission')}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#A3A3A3' }}>모두보기</Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 12 }}>
            {otherMissions.map(mission => (
              <MissionCard 
                key={mission.id} 
                mission={mission} 
                onClick={(m) => router.push({ pathname: '/mission/[id]', params: { id: m.id } })} 
              />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
