import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { Mission, initialUser, initialMissions } from './mockData';

interface User {
  name: string;
  department: string;
  points: number;
  level: number;
  xp: number;
}

interface IotStatus {
  lights: boolean;
  ac: boolean;
}

interface AppContextType {
  user: User;
  missions: Mission[];
  iotStatus: IotStatus;
  setUser: Dispatch<SetStateAction<User>>;
  setIotStatus: Dispatch<SetStateAction<IotStatus>>;
  toggleIot: (key: keyof IotStatus) => void;
  completeMission: (mission: Mission, success: boolean) => void;
  lastMissionResult: MissionResult | null;
  setLastMissionResult: Dispatch<SetStateAction<MissionResult | null>>;
}

export interface MissionResult {
  points: number;
  bonus: number;
  feedback: string;
  nextMission: Mission;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const [missions] = useState<Mission[]>(initialMissions);
  const [iotStatus, setIotStatus] = useState<IotStatus>({
    lights: true,
    ac: false,
  });
  const [lastMissionResult, setLastMissionResult] = useState<MissionResult | null>(null);

  const toggleIot = (key: keyof IotStatus) => {
    setIotStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completeMission = (mission: Mission, success: boolean) => {
    if (success) {
      const totalPoints = mission.points + (mission.bonusPoints || 0);
      setUser(prev => ({
        ...prev,
        points: prev.points + totalPoints
      }));
      
      setLastMissionResult({
        points: mission.points,
        bonus: mission.bonusPoints || 0,
        feedback: "오늘 당신의 활동으로 캠퍼스가 더 깨끗해졌습니다!",
        // Simple logic for next mission
        nextMission: missions.find(m => m.id !== mission.id) || missions[0]
      });
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, missions, iotStatus, 
      setUser, setIotStatus, toggleIot, completeMission,
      lastMissionResult, setLastMissionResult
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
