import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <>
        <Stack screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#18181B' }
        }}>
          <Stack.Screen name="+not-found" />
          <Stack.Screen 
            name="onboarding"
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{
              animation: 'fade',
            }} 
          />
        </Stack>
        <StatusBar style="light" />
      </>
    </ThemeProvider>
  );
}