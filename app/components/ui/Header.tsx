import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { useRouter } from 'expo-router';
export function Header() {
  const router = useRouter();

  return (
    <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', paddingVertical: 16, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }}>
      <TouchableOpacity 
        onPress={() => router.push('/')}
        activeOpacity={0.7}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        <View style={{ backgroundColor: '#10B981', padding: 6, borderRadius: 8 }}>
          <Leaf size={20} color="#ffffff" />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#059669', letterSpacing: -0.5 }}>ecocampus+</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => router.push('/ranking')}
        activeOpacity={0.8}
        style={{ position: 'relative' }}
      >
        <View style={{ width: 32, height: 32, borderRadius: 999, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: '600' }}>JD</Text>
        </View>
        <View style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, backgroundColor: '#EF4444', borderWidth: 2, borderColor: 'white', borderRadius: 999 }} />
      </TouchableOpacity>
    </View>
  );
}
