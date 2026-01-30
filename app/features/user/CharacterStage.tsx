import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

interface CharacterStageProps {
  level: number;
  emoji: string;
  name: string;
  color: string;
}

export function CharacterStage({ level, emoji, name, color }: CharacterStageProps) {
  const scale = useRef(new Animated.Value(1)).current;

  // Simple animation loop for "breathing" effect
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 32, position: 'relative' }}>
      <View style={{
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        borderRadius: 999,
        opacity: 0.2,
        transform: [{ scale: 1.5 }],
        backgroundColor: color
      }} />
      
      <Animated.View 
        style={{ 
          width: 192, 
          height: 192, 
          borderRadius: 999, 
          alignItems: 'center', 
          justifyContent: 'center', 
          shadowColor: color,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 10,
          zIndex: 10,
          backgroundColor: color,
          transform: [{ scale }] 
        }}
      >
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: 999, backgroundColor: 'white', opacity: 0.2 }} />
        <Text style={{ fontSize: 96 }}>{emoji}</Text>
        
        {/* Particles logic omitted for brevity in RN, can use Lottie later */}
      </Animated.View>

      <View style={{ 
        position: 'absolute', 
        bottom: -16, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        paddingHorizontal: 24, 
        paddingVertical: 8, 
        borderRadius: 999, 
        borderWidth: 1, 
        borderColor: 'rgba(255, 255, 255, 0.5)', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        zIndex: 20 
      }}>
         <Text style={{ fontWeight: 'bold', color: '#262626' }}>LV.{level} {name}</Text>
      </View>
    </View>
  );
}
