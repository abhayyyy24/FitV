import React from "react";
import {View,Text,StyleSheet, Button,TouchableOpacity} from "react-native"
import { TextInput } from "react-native-gesture-handler";

const AuthScreen=()=>{
    return(
        <View style={styles.container}>
            <Text>Login</Text>
            <Text>Login to continue using the app</Text>
            <Text >Email</Text>
            <Text>Password</Text>
            <Text>Forgot Password?</Text>
            
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1
    }
});

export default AuthScreen;