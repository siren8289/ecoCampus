import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Mission } from '../../lib/mockData';

interface MissionCardProps {
  mission: Mission;
  onClick: (mission: Mission) => void;
  variant?: 'grid' | 'list';
}

export function MissionCard({ mission, onClick, variant = 'list' }: MissionCardProps) {
  // Simple mapping for emojis/icons if they are strings in mockData, 
  // but if they are React nodes we might need adjustment. 
  // In mockData they are strings (emojis).
  const Icon = () => <Text style={{ fontSize: 30 }}>{mission.icon}</Text>;

  if (variant === 'grid') {
    return (
      <TouchableOpacity
        onPress={() => onClick(mission)}
        activeOpacity={0.8}
        style={{ 
          width: '100%', 
          backgroundColor: 'white', 
          borderRadius: 24, 
          padding: 20, 
          borderWidth: 1, 
          borderColor: '#F5F5F5', 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 20,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 2,
          elevation: 1
        }}
      >
        <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center' }}>
          <Icon />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: 0.5 }}>{mission.category}</Text>
            {mission.isAIRecommended && (
              <View style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                <Text style={{ color: '#EAB308', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' }}>AI 추천</Text>
              </View>
            )}
          </View>
          <Text style={{ fontWeight: 'bold', marginBottom: 4, lineHeight: 20, color: '#262626' }}>{mission.title}</Text>
          <Text style={{ fontSize: 12, color: '#A3A3A3' }} numberOfLines={1}>{mission.description}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: '#22C55E', fontWeight: 'bold' }}>+{mission.points}P</Text>
          {mission.bonusPoints && <Text style={{ fontSize: 10, color: '#EAB308', fontWeight: 'bold' }}>+{mission.bonusPoints}P</Text>}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={() => onClick(mission)}
      activeOpacity={0.8}
      style={{ 
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 16, 
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 32, 
        borderWidth: 1, 
        borderColor: '#F5F5F5',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1
      }}
    >
      <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center' }}>
        <Icon />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#262626', lineHeight: 20 }}>{mission.title}</Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4 }}>{mission.category}</Text>
      </View>
      <Text style={{ color: '#22C55E', fontWeight: 'bold', fontSize: 18, letterSpacing: -0.5 }}>
        +{mission.points}P
      </Text>
    </TouchableOpacity>
  );
}
