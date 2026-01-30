import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Lightbulb, Thermometer } from 'lucide-react-native';

interface IoTControlProps {
  iotStatus: { lights: boolean; ac: boolean };
  onToggle: (key: 'lights' | 'ac') => void;
}

export function IoTControl({ iotStatus, onToggle }: IoTControlProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <TouchableOpacity 
        onPress={() => onToggle('lights')}
        activeOpacity={0.8}
        style={{ 
          flex: 1, 
          padding: 24, 
          borderRadius: 32, 
          borderWidth: 2, 
          alignItems: 'center', 
          gap: 16,
          backgroundColor: iotStatus.lights ? 'white' : '#22C55E',
          borderColor: iotStatus.lights ? '#F5F5F5' : '#22C55E'
        }}
      >
        <View style={{ 
          width: 56, 
          height: 56, 
          borderRadius: 16, 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: iotStatus.lights ? 'rgba(234, 179, 8, 0.1)' : 'rgba(255, 255, 255, 0.2)'
        }}>
          <Lightbulb 
            size={28} 
            color={iotStatus.lights ? '#ffe48a' : '#ffffff'} 
            fill={iotStatus.lights ? '#ffe48a' : 'none'}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: iotStatus.lights ? '#262626' : 'white' }}>강의실 전등</Text>
          <Text style={{ 
            fontSize: 10, 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: 2, 
            marginTop: 2,
            color: iotStatus.lights ? '#A3A3A3' : 'rgba(255, 255, 255, 0.8)'
          }}>
            {iotStatus.lights ? '현재 켜짐' : '절전 완료'}
          </Text>
        </View>
        <View style={{ 
          width: 48, 
          height: 24, 
          borderRadius: 999, 
          padding: 4, 
          position: 'relative',
          backgroundColor: !iotStatus.lights ? 'rgba(34, 197, 94, 0.5)' : '#E5E5E5',
          borderColor: !iotStatus.lights ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderWidth: !iotStatus.lights ? 1 : 0
        }}>
          <View style={{ 
            width: 16, 
            height: 16, 
            backgroundColor: 'white', 
            borderRadius: 999,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            transform: [{ translateX: !iotStatus.lights ? 24 : 0 }] 
          }} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onToggle('ac')}
        activeOpacity={0.8}
        style={{ 
          flex: 1, 
          padding: 24, 
          borderRadius: 32, 
          borderWidth: 2, 
          alignItems: 'center', 
          gap: 16,
          backgroundColor: !iotStatus.ac ? 'white' : '#22C55E',
          borderColor: !iotStatus.ac ? '#F5F5F5' : '#22C55E'
        }}
      >
        <View style={{ 
          width: 56, 
          height: 56, 
          borderRadius: 16, 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: !iotStatus.ac ? '#F5F5F5' : 'rgba(255, 255, 255, 0.2)'
        }}>
          <Thermometer 
            size={28} 
            color={!iotStatus.ac ? '#a3a3a3' : '#ffffff'} 
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: !iotStatus.ac ? '#262626' : 'white' }}>냉난방기</Text>
          <Text style={{ 
            fontSize: 10, 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: 2, 
            marginTop: 2,
            color: !iotStatus.ac ? '#A3A3A3' : 'rgba(255, 255, 255, 0.8)'
          }}>
            {!iotStatus.ac ? '운전 중지' : '운영 중'}
          </Text>
        </View>
        <View style={{ 
          width: 48, 
          height: 24, 
          borderRadius: 999, 
          padding: 4, 
          position: 'relative',
          backgroundColor: iotStatus.ac ? 'rgba(34, 197, 94, 0.5)' : '#D4D4D4',
          borderColor: iotStatus.ac ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderWidth: iotStatus.ac ? 1 : 0
        }}>
          <View style={{ 
            width: 16, 
            height: 16, 
            backgroundColor: 'white', 
            borderRadius: 999,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            transform: [{ translateX: iotStatus.ac ? 24 : 0 }]
          }} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
