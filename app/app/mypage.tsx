import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { User, ChevronRight, LogOut, Wallet, Award, Bell, Shield, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../lib/AppContext';

export default function MyPage() {
  const router = useRouter();
  const { user } = useApp();

  const menuItems = [
    { id: '/points', icon: Wallet, label: '포인트 이용 내역', bg: '#EFF6FF', iconColor: '#3b82f6' },
    { id: '/character', icon: Award, label: '획득한 뱃지', bg: '#FFFBEB', iconColor: '#f59e0b' },
    { id: '/mypage', icon: Bell, label: '알림 설정', bg: '#FAF5FF', iconColor: '#a855f7' },
    { id: '/mypage', icon: Shield, label: '개인정보 설정', bg: '#ECFDF5', iconColor: '#10b981' },
    { id: '/mypage', icon: HelpCircle, label: '고객센터', bg: '#FAFAFA', iconColor: '#737373' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAFAFA' }} contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <View style={{ width: 80, height: 80, borderRadius: 28, backgroundColor: 'rgba(34, 197, 94, 0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
          <User size={40} color="#81d18a" />
        </View>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#262626' }}>{user.name}</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#A3A3A3' }}>{user.department}</Text>
          <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: '#22C55E' }} />
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#22C55E', textTransform: 'uppercase', letterSpacing: 1.5 }}>Lv.{user.level} 환경 수호자</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => router.push('/points')}
        style={{ backgroundColor: 'white', borderRadius: 32, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1, borderWidth: 1, borderColor: '#FAFAFA', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}
      >
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: 1.5 }}>보유 포인트</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
             <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#22C55E' }}>{user.points.toLocaleString()}</Text>
             <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#22C55E', marginBottom: 4 }}>P</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#22C55E', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 16, shadowColor: '#22C55E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>상세 보기</Text>
        </View>
      </TouchableOpacity>

      <View style={{ gap: 12, marginBottom: 32 }}>
        <Text style={{ fontWeight: 'bold', color: '#262626', paddingHorizontal: 4 }}>계정 관리</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 32, borderWidth: 1, borderColor: '#FAFAFA', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 }}>
          {menuItems.map((item, index) => {
             const Icon = item.icon;
             return (
              <TouchableOpacity 
                key={index}
                onPress={() => router.push(item.id as any)}
                style={{
                  width: '100%', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: 20,
                  borderBottomWidth: index !== menuItems.length - 1 ? 1 : 0,
                  borderBottomColor: '#FAFAFA'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: item.bg }}>
                    <Icon size={20} color={item.iconColor} />
                  </View>
                  <Text style={{ fontWeight: 'bold', color: '#404040' }}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color="#d4d4d4" />
              </TouchableOpacity>
             );
          })}
        </View>
      </View>

      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, marginBottom: 16 }}>
        <LogOut size={16} color="#a3a3a3" />
        <Text style={{ color: '#A3A3A3', fontWeight: 'bold', fontSize: 14 }}>로그아웃</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', gap: 4 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#D4D4D4' }}>ecocampus+ v2.4.0</Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#E5E5E5' }}>© 2026 ESG Campus Challenge</Text>
      </View>
    </ScrollView>
  );
}
