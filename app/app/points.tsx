import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, Calendar, Filter, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { PointsSummaryCard } from '../features/user/PointsSummaryCard';
import { useApp } from '../lib/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PointsPage() {
  const router = useRouter();
  const { user } = useApp();

  const transactions = [
    { id: 1, title: '강의실 전등 끄기', type: 'earn', points: 50, bonus: 20, date: '2026.01.29', time: '14:20' },
    { id: 2, title: '스타벅스 아메리카노 교환', type: 'spend', points: -1200, date: '2026.01.28', time: '11:05' },
    { id: 3, title: '텀블러 사용 인증', type: 'earn', points: 30, date: '2026.01.27', time: '09:45' },
    { id: 4, title: 'ESG 퀴즈 만점', type: 'earn', points: 20, date: '2026.01.27', time: '09:40' },
    { id: 5, title: '폐휴대폰 반납 캠페인', type: 'earn', points: 500, date: '2026.01.20', time: '16:30' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ width: 40, height: 40, borderRadius: 16, backgroundColor: 'white', borderWidth: 1, borderColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}
            >
              <ArrowLeft size={20} color="#a3a3a3" />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#262626' }}>포인트 내역</Text>
          </View>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 16, backgroundColor: 'white', borderWidth: 1, borderColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
            <Filter size={20} color="#a3a3a3" />
          </TouchableOpacity>
        </View>

        <PointsSummaryCard points={user.points} />

        <View style={{ gap: 16, marginTop: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }}>
            <Text style={{ fontWeight: 'bold', color: '#262626', fontSize: 16 }}>최근 이용 내역</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Calendar size={12} color="#a3a3a3" />
              <Text style={{ color: '#A3A3A3', fontWeight: 'bold', fontSize: 12 }}>전체 기간</Text>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            {transactions.map((tx) => (
              <View key={tx.id} style={{ backgroundColor: 'white', padding: 20, borderRadius: 32, borderWidth: 1, borderColor: '#FAFAFA', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <View style={{
                    width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: tx.type === 'earn' ? 'rgba(34, 197, 94, 0.1)' : '#FEF2F2'
                  }}>
                    {tx.type === 'earn' 
                      ? <ArrowUpRight size={24} color="#81d18a" /> 
                      : <ArrowDownLeft size={24} color="#dc2626" />
                    }
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: '#262626', lineHeight: 20, fontSize: 15 }}>{tx.title}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#A3A3A3', marginTop: 4 }}>{tx.date} • {tx.time}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{
                    fontWeight: 'bold', fontSize: 18,
                    color: tx.type === 'earn' ? '#22C55E' : '#262626'
                  }}>
                    {tx.type === 'earn' ? '+' : ''}{tx.points.toLocaleString()} P
                  </Text>
                  {tx.bonus && (
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#EAB308', marginTop: 4 }}>보너스 +{tx.bonus}P</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
