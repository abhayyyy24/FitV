import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/AuthScreen";

const Stack=createNativeStackNavigator();

const AppNavigator=()=>{
    return(
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Splash" component={SplashScreen}></Stack.Screen>
            <Stack.Screen name="Auth" component={AuthScreen}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AppNavigator;