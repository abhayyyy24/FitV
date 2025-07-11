import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '@/constants/Colors';


export default function ConfirmEmail({route,navigation}:any){
    const{email}=route.params;

    const handleBackToLogin=()=>{
        navigation.replace('Auth');
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Check your inbox</Text>
            <Ionicons name="mail-unread-outline" size={60} color={Colors.primary}/>
            <Text style={styles.description}>We,ve sent you a confirmation link to:{'\n'}
                <Text style={styles.email}>{email}</Text>
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:30,
        marginTop:200,
        alignItems:'center',
    },
    title:{
        fontSize:24,
        fontFamily:'Bold',
        marginBottom:20,
        color:Colors.textPrimary
    },
    description:{
        fontSize:16,
        fontFamily:'regular',
        textAlign:'center',
        marginBottom:30,
        color:Colors.textPrimary
    },
    email:{
        fontFamily:'Medium',
        color:Colors.textPrimary,
    },
    button:{
        backgroundColor:Colors.primary,
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:10,
    },
    buttonText:{
        fontFamily:'Bold',
        color:'#fff',
        fontSize:16,
    },
});