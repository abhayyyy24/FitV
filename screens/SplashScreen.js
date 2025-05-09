import React, { useEffect } from "react";
import {View,Text,StyleSheet,Image} from "react-native"

const SplashScreen=({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace("Auth");
        },2000);
    },[]);

    return(
        <View style={Styles.container}>
            <Image source={require("../assets/logo-color.png")} style={Styles.logo}/>
        </View>
    );
};

const Styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#0469FF",
        
    },
    logo:{
        width:150,
        height:90,
        borderRadius:20,
        shadowColor:"#252525",
        shadowOffset:{heigth:2},
        shadowOpacity:0.3,
        shadowRadius:4,
        elevation:6,
    },

})

export default SplashScreen;