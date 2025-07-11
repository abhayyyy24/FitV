import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
//screens
import Home from '../screens/Home'
import Metrics from '../screens/Metrics'
import Insights from '../screens/Insights'
import Coach from '../screens/Coach'
import Profile from '../screens/Profile'

const Tab=createBottomTabNavigator();

export default function BottomTabs(){
    return(
            <Tab.Navigator 
            screenOptions={({route})=>({
                headerShown:false,
                tabBarActiveTintColor:"#0A80ED",
                tabBarInactiveTintColor:"#999",
                tabBarLabelStyle: {
                fontFamily: 'Bold', // 👈 this is from your loaded fonts
                fontSize: 10,
                },
                tabBarButton: (props) => (
                  <Pressable
                    {...props}
                     android_ripple={{ color: 'transparent' }}
                     style={props.style}
                   >
                     {props.children}
                </Pressable>
                    ),
                tabBarStyle: {
                    elevation: 0, // remove Android shadow
                    shadowOpacity: 0, // remove iOS shadow
                    borderTopWidth: 0, // remove top border
                    backgroundColor: '#fff', // or match your theme
                },
                tabBarIcon:({color,size})=>{
                    let iconName:keyof typeof Ionicons.glyphMap;

                    switch(route.name){
                        case 'Home':
                            iconName='home';
                            break;
                        case 'Metrics':
                            iconName='flame';
                            break;
                        case 'Insights':
                            iconName='analytics';
                            break;
                        case 'Coach':
                            iconName='chatbubbles'
                            break;
                        case 'Profile':
                            iconName='person-circle';
                            break;
                        default:
                            iconName='ellipse'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
            >
                <Tab.Screen name='Home' component={Home}/>
                <Tab.Screen name='Metrics' component={Metrics}/>
                <Tab.Screen name='Insights' component={Insights}/>
                <Tab.Screen name='Coach' component={Coach}/>
                <Tab.Screen name='Profile' component={Profile}/>
            </Tab.Navigator>
        
    );
}