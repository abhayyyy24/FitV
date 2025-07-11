import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function DataUsage({navigation}:any){
    const handleAgree= async()=>{
        await AsyncStorage.setItem('hasSeenOnBoarding','true');
        navigation.replace('Auth');
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Your Data,Your Control</Text>
            <Text style={styles.description}>
                We use your health Data to :
            </Text>

            <View style={styles.points}>
                <View style={styles.point}>
                    <Ionicons name='analytics' size={40} color={Colors.primary}></Ionicons>
                    <Text style={styles.pointtext}>Generate personalized insights.</Text>
                </View>
                <View style={styles.point}>
                    <Ionicons name="bar-chart-outline" size={40} color={Colors.primary}></Ionicons>
                    <Text style={styles.pointtext}>Track progress over time.</Text>
                </View>
                <View style={styles.point}>
                    <Ionicons name='alert-circle' size={40} color={Colors.primary}></Ionicons>
                    <Text style={styles.pointtext}>Alert you to health concerns.</Text>
                </View>
            </View>
            
            
            <Text style={styles.note}>We do not sell your data or use it anywhere else.</Text>

            <TouchableOpacity style={styles.button} onPress={handleAgree}>
                <Ionicons name='shield-checkmark-outline' size={20} color={Colors.surface}></Ionicons>
                <Text style={styles.buttonText}>I Agree</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.background,
        padding:30,
        
    },
    title:{
        fontSize:24,
        fontFamily:"Bold",
        marginBottom:15,
        color:Colors.textPrimary,
        marginTop:50,
        textAlign:'center'
    },
    description:{
        fontFamily:'Regular',
        fontSize:16,
        marginBottom:15,
        color:Colors.textSecondary,
        marginTop:30,
    },
    points:{
        marginVertical:20,
        marginTop:50,
    },
    point:{
        flexDirection:'column',
        gap:10,
        alignItems:'center',
        marginTop:-20,
    },
    pointtext:{
        fontSize:14,
        fontFamily:'Medium',
        color:Colors.primary,
        height:100,
    },
    note:{
        fontSize:13,
        color:Colors.textPrimary,
        fontFamily:'Regular',
        marginBottom:50,
        textAlign:'center'
    },
    button:{
        backgroundColor:Colors.primary,
        padding:15,
        borderRadius:15,
        alignItems:'center',
        marginBottom:30,
        flexDirection:'row',
        justifyContent:'center',
        gap:5,
    },
    buttonText:{
        color:'white',
        fontFamily:'Bold',
        fontSize:16,
    }
})
