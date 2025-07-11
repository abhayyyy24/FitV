import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import Onboarding from '@/screens/Onboarding';
import DataUsage from '@/screens/DataUsage';
import BottomTabs from './BottomTabs';
import Auth from '@/screens/Auth';
import ConfirmEmail from '@/screens/ConfirmEmail';
const Stack = createNativeStackNavigator();

export default function AppNavigator({ initialRoute,
  onDone,
  }: {
  initialRoute: string;
  onDone: () => void;}) {
  
  
    return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Onboarding">
          {({ navigation }) => (
            <Onboarding onDone={() => navigation.replace('DataUsage')} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DataUsage" component={DataUsage} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="MainApp" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
