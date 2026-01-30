import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, ClipboardList, User, Award, BarChart3 } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: '/', icon: Home, label: '홈' },
    { id: '/mission', icon: ClipboardList, label: '미션' },
    { id: '/character', icon: Award, label: '성장' },
    { id: '/ranking', icon: BarChart3, label: '랭킹' },
    { id: '/mypage', icon: User, label: '마이' },
  ];

  const getActiveTab = () => {
    if (pathname === '/') return '/';
    if (pathname.startsWith('/mission')) return '/mission';
    return pathname;
  };

  const activeTab = getActiveTab();

  return (
    <View style={{ backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingHorizontal: 24, paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 32 }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => router.push(tab.id as any)}
            style={{ alignItems: 'center', gap: 4 }}
          >
            <View style={{ padding: 6, borderRadius: 12, backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent' }}>
              <Icon size={24} color={isActive ? '#81d18a' : '#a3a3a3'} />
            </View>
            <Text style={{ fontSize: 10, fontWeight: '500', color: isActive ? '#22C55E' : '#A3A3A3' }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
