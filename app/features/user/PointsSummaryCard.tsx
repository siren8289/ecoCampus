import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Wallet } from 'lucide-react-native';

interface PointsSummaryCardProps {
  points: number;
}

export function PointsSummaryCard({ points }: PointsSummaryCardProps) {
  return (
    <View style={{ position: 'relative' }}>
      <View style={{ 
        backgroundColor: 'white', 
        borderRadius: 32, 
        padding: 32, 
        marginTop: 16, 
        borderWidth: 1, 
        borderColor: '#F5F5F5', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.05, 
        shadowRadius: 1, 
        overflow: 'hidden' 
      }}>
        <View style={{ zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: 1.65 }}>Available Balance</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text style={{ fontSize: 48, fontWeight: 'bold', letterSpacing: -1, color: '#171717' }}>{points.toLocaleString()}</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#22C55E' }}>P</Text>
            </View>
          </View>
          <View style={{ width: 56, height: 56, borderRadius: 22, backgroundColor: 'rgba(34, 197, 94, 0.05)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.1)' }}>
            <Wallet size={28} color="#81d18a" />
          </View>
        </View>
        
        <View style={{ zIndex: 10, flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: '#FAFAFA', paddingVertical: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(229, 229, 229, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#525252' }}>충전하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, backgroundColor: '#22C55E', paddingVertical: 16, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>교환하기</Text>
          </TouchableOpacity>
        </View>

        <View style={{ position: 'absolute', top: 0, right: 0, width: 128, height: 128, backgroundColor: 'rgba(34, 197, 94, 0.05)', borderRadius: 999, transform: [{translateX: 64}, {translateY: -64}] }} />
      </View>
    </View>
  );
}
