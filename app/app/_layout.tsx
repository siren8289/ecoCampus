import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider } from '../lib/AppContext';
import { Header } from '../components/ui/Header';
import { BottomNav } from '../components/ui/BottomNav';
import { View, StyleSheet } from 'react-native';

export default function Layout() {
  const pathname = usePathname();

  return (
    <AppProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea} edges={['top']}>
             <Header />
             <View style={styles.content}>
                <Slot />
             </View>
             <BottomNav />
          </SafeAreaView>
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
