import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Trophy, Users, TrendingUp, Star, User } from 'lucide-react-native';
import { useApp } from '../lib/AppContext';
export default function RankingPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<'dept' | 'individual'>('dept');

  const departmentRankings = [
    { rank: 1, name: '경영학과', points: 45200, trend: 'up' },
    { rank: 2, name: '컴퓨터공학과', points: 42800, trend: 'up', isUser: true },
    { rank: 3, name: '디자인학과', points: 38500, trend: 'down' },
    { rank: 4, name: '전자공학과', points: 35100, trend: 'up' },
    { rank: 5, name: '경제학과', points: 32000, trend: 'neutral' },
  ];

  const individualRankings = [
    { rank: 1, name: '박지민', dept: '경영학과', points: 3200 },
    { rank: 2, name: '이지은', dept: '디자인학과', points: 2950 },
    { rank: 3, name: '최현우', dept: '컴퓨터공학과', points: 2800 },
    { rank: 4, name: '김캠퍼', dept: '컴퓨터공학과', points: 1250, isUser: true },
    { rank: 5, name: '한소희', dept: '전자공학과', points: 1100 },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAFAFA' }} contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 16, marginBottom: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#262626' }}>캠퍼스 랭킹</Text>
        
        <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5', padding: 4, borderRadius: 16 }}>
          <TouchableOpacity 
            onPress={() => setActiveTab('dept')}
            activeOpacity={0.8}
            style={{ 
              flex: 1, 
              paddingVertical: 10, 
              borderRadius: 12, 
              alignItems: 'center',
              backgroundColor: activeTab === 'dept' ? 'white' : 'transparent',
              shadowColor: activeTab === 'dept' ? '#000' : 'transparent',
              shadowOpacity: activeTab === 'dept' ? 0.05 : 0,
              shadowRadius: 2,
              elevation: activeTab === 'dept' ? 1 : 0
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: activeTab === 'dept' ? '#262626' : '#A3A3A3' }}>학과별</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('individual')}
            activeOpacity={0.8}
            style={{ 
              flex: 1, 
              paddingVertical: 10, 
              borderRadius: 12, 
              alignItems: 'center',
              backgroundColor: activeTab === 'individual' ? 'white' : 'transparent',
              shadowColor: activeTab === 'individual' ? '#000' : 'transparent',
              shadowOpacity: activeTab === 'individual' ? 0.05 : 0,
              shadowRadius: 2,
              elevation: activeTab === 'individual' ? 1 : 0
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: activeTab === 'individual' ? '#262626' : '#A3A3A3' }}>개인별</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 16, marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#262626' }}>
            {activeTab === 'dept' ? '실시간 학과 순위' : '실시간 개인 순위'}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Users size={12} color="#a3a3a3" />
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#A3A3A3' }}>이번 주 업데이트</Text>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          {(activeTab === 'dept' ? departmentRankings : individualRankings).map((item: any) => (
            <View 
              key={item.name}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                gap: 16, 
                padding: 20, 
                borderRadius: 24, 
                borderWidth: 1,
                backgroundColor: item.isUser ? '#22C55E' : 'white',
                borderColor: item.isUser ? '#22C55E' : '#F5F5F5',
                shadowColor: item.isUser ? '#22C55E' : '#000',
                shadowOpacity: item.isUser ? 0.2 : 0.05,
                shadowRadius: item.isUser ? 10 : 2,
                elevation: item.isUser ? 5 : 1
              }}
            >
              <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 16, 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: item.isUser ? 'rgba(255,255,255,0.2)' : '#FAFAFA'
              }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: item.isUser ? 'white' : '#A3A3A3' }}>{item.rank}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', lineHeight: 20, color: item.isUser ? 'white' : '#262626' }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: item.isUser ? 'rgba(255,255,255,0.8)' : '#A3A3A3' }}>
                  {activeTab === 'individual' ? `${item.dept} · ` : ''}{item.points.toLocaleString()} P
                </Text>
              </View>
              {item.trend === 'up' && <TrendingUp size={20} color={item.isUser ? 'rgba(255,255,255,0.8)' : '#81d18a'} />}
              {item.rank === 1 && !item.isUser && <Trophy size={20} color="#ffe48a" />}
              {item.isUser && activeTab === 'individual' && <User size={20} color="rgba(255,255,255,0.8)" />}
            </View>
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: '#262626', padding: 24, borderRadius: 24, gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Star size={20} color="#ffe48a" fill="#ffe48a" />
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            {activeTab === 'dept' ? '학과 보상' : '개인 랭킹 보상'}
          </Text>
        </View>
        <Text style={{ fontSize: 14, color: '#A3A3A3', lineHeight: 24, fontWeight: '500' }}>
          {activeTab === 'dept' 
            ? '이번 주 1위 학과 전원에게 스타벅스 아메리카노 1,000원 할인권을 드립니다!'
            : '주간 랭킹 Top 3에게는 편의점 5,000원 상품권을 선물로 드립니다!'}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            {[1,2,3,4].map((i) => (
              <View key={i} style={{ 
                width: 32, 
                height: 32, 
                borderRadius: 999, 
                borderWidth: 2, 
                borderColor: '#262626', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginLeft: i === 1 ? 0 : -8,
                backgroundColor: i % 2 === 0 ? '#22C55E' : '#525252'
              }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: i % 2 === 0 ? 'white' : '#D4D4D4' }}>
                  {String.fromCharCode(64 + i)}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
             <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#22C55E' }}>혜택 자세히 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
