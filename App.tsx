import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigation/Navigation';
import { supabase } from './utlis/supabaseClient';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Bold: require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    Medium: require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
    Regular: require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    Light: require('./assets/fonts/PlusJakartaSans-Light.ttf'),
    Italic: require('./assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
  });

  const[initialRoute,setInitialRoute]=useState<string|null>(null);

  useEffect(()=>{
    const checkAppState=async()=>{
      const seen=await AsyncStorage.getItem('hasSeenOnboarding');
      const{data:{session}}=await supabase.auth.getSession();

      if(session){
        setInitialRoute('MainApp');
      }else if(seen==='true'){
        setInitialRoute('Auth');
      }else{
        setInitialRoute('Onboarding');
      }
    };
    checkAppState();
  },[]);

  useEffect(()=>{
    if (fontsLoaded && initialRoute!==null){
      SplashScreen.hideAsync();
    }
  },[fontsLoaded,initialRoute]);

  const handleOnboardingComplete=async()=>{
    await AsyncStorage.setItem('hasSeenOnboarding','true');
    setInitialRoute('Auth');
  };

  if(!fontsLoaded||!initialRoute)return null;

  return(
    <AppNavigator initialRoute={initialRoute} onDone={handleOnboardingComplete}/>
  );
}
