import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Target, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../lib/AppContext';
import { MissionCard } from '../features/mission/MissionCard';

export default function MissionPage() {
  const router = useRouter();
  const { missions } = useApp();
  const categories = ['전체', '에너지', '생활', '교육', '캠페인'];
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredMissions = activeCategory === '전체' 
    ? missions 
    : missions.filter(m => m.category === activeCategory);

  const handleSelectMission = (mission: any) => {
    router.push({ pathname: '/mission/[id]', params: { id: mission.id } });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAFAFA' }} contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 16, marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#262626' }}>챌린지 미션</Text>
          <View style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Target size={12} color="#81d18a" />
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#22C55E' }}>82% 달성</Text>
          </View>
        </View>
        
        <View style={{ position: 'relative', justifyContent: 'center' }}>
          <Search size={20} color="#a3a3a3" style={{ position: 'absolute', left: 16, zIndex: 10 }} />
          <TextInput 
            placeholder="미션을 검색해보세요"
            style={{ width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: '#F5F5F5', borderRadius: 16, paddingVertical: 16, paddingLeft: 48, paddingRight: 16, fontSize: 14 }}
            placeholderTextColor="#a3a3a3"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 8, paddingBottom: 8 }}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={{
                paddingHorizontal: 16, 
                paddingVertical: 8, 
                borderRadius: 12, 
                marginRight: 8,
                backgroundColor: activeCategory === cat ? '#22C55E' : 'white',
                borderWidth: activeCategory === cat ? 0 : 1,
                borderColor: '#F5F5F5'
              }}
            >
              <Text style={{
                fontSize: 14, 
                fontWeight: '500',
                color: activeCategory === cat ? 'white' : '#737373'
              }}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ gap: 16, marginBottom: 24 }}>
        {filteredMissions.map(mission => (
          <MissionCard key={mission.id} mission={mission} onClick={handleSelectMission} variant="grid" />
        ))}
      </View>

      <View style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' }}>
        <Text style={{ fontWeight: 'bold', color: '#22C55E', marginBottom: 4 }}>캠퍼스 챌린지 팁</Text>
        <Text style={{ fontSize: 14, color: '#404040', lineHeight: 24, fontWeight: '500' }}>
          공강 시간에 강의실 IoT를 제어하면 보너스 포인트를 2배로 받을 수 있어요!
        </Text>
      </View>
    </ScrollView>
  );
}
