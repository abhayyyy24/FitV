import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface TopBarProps{
    title:string;
    showback?:boolean;
}

export default function TopBar({title,showback=true}:TopBarProps){
    const navigation=useNavigation();

    return(
        <View style={styles.container}>
            {showback &&(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='arrow-back' size={24} color='black'/>
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        paddingVertical:10,
        
    },
    title:{
        fontSize:20,
        fontFamily:'Bold',
        
    }
})