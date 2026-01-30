import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Star } from 'lucide-react-native';
import { useApp } from '../lib/AppContext';
import { CharacterStage } from '../features/user/CharacterStage';

export default function CharacterPage() {
  const { user } = useApp();

  const levels = [
    { name: "씨앗", desc: "이제 막 환경 보호의 길에 들어섰습니다.", color: "#F5F5F5", textColor: "#737373", emoji: "🌱" },
    { name: "어린 나무", desc: "작은 실천이 모여 튼튼한 줄기가 생겼어요.", color: "rgba(34, 197, 94, 0.2)", textColor: "#22C55E", emoji: "🌳" },
    { name: "울창한 소나무", desc: "풍성한 잎사귀로 캠퍼스의 공기를 맑게 합니다.", color: "#22C55E", textColor: "white", emoji: "🌲" },
    { name: "푸른 지구", desc: "당신의 노력으로 지구가 다시 숨을 쉽니다.", color: "#3B82F6", textColor: "white", emoji: "🌏" },
  ];

  const currentLevel = levels[user.level - 1];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAFAFA' }} contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ alignItems: 'center', gap: 8, marginBottom: 32 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: -0.5, color: '#262626' }}>캐릭터 성장</Text>
        <Text style={{ color: '#A3A3A3', fontSize: 14, fontWeight: '500' }}>미션을 완료하고 당신만의 지구를 가꿔보세요</Text>
      </View>

      <CharacterStage level={user.level} emoji={currentLevel.emoji} name={currentLevel.name} color={currentLevel.color} />

      <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#F5F5F5', gap: 16, marginTop: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#A3A3A3', marginBottom: 4 }}>성장 게이지</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#262626' }}>LV.{user.level} {currentLevel.name}</Text>
          </View>
          <Text style={{ color: '#22C55E', fontWeight: 'bold', fontSize: 14 }}>{user.xp}/100 XP</Text>
        </View>
        
        <View style={{ width: '100%', height: 12, backgroundColor: '#F5F5F5', borderRadius: 999, overflow: 'hidden' }}>
          <View 
            style={{ height: '100%', backgroundColor: '#22C55E', borderRadius: 999, width: `${user.xp}%` }}
          />
        </View>
        
        <Text style={{ fontSize: 14, color: '#737373', textAlign: 'center', lineHeight: 24, fontWeight: '500' }}>
          {currentLevel.desc}
        </Text>
      </View>

      <View style={{ gap: 16, marginTop: 32 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#262626' }}>성장 기록</Text>
        <View style={{ gap: 12 }}>
          {[
            { title: "첫 미션 완료", date: "2026.01.15", xp: "+20" },
            { title: "에너지 절약 왕", date: "2026.01.20", xp: "+50" },
            { title: "연속 3일 미션 참여", date: "2026.01.25", xp: "+30" },
          ].map((log, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: 'white', borderRadius: 16, borderWidth: 1, borderColor: '#F5F5F5' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(34, 197, 94, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={16} color="#81d18a" fill="#81d18a" />
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#262626' }}>{log.title}</Text>
                  <Text style={{ fontSize: 10, color: '#A3A3A3' }}>{log.date}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#22C55E' }}>{log.xp} XP</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
