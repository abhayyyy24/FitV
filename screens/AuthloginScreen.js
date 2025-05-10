import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";



const AuthScreen = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let valid = true;
        let tempErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            tempErrors.email = "Please enter a valid email.";
            valid = false;
        }

        if (!password || password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters.";
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };

    const handleLogin = () => {
    if (validateForm()) {
        Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back! 👋',
            position: 'bottom',
        });

        // continue login logic...
    }
};

    return (
        <View style={styles.container}>
            <View style={styles.headercontainer}> 
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.subheading}>Login to continue using the app</Text>
            </View>
            
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                value={email} 
                onChangeText={(text) => {
                    setEmail(text);
                    setErrors(prev => ({ ...prev, email: null }));
                }} 
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                value={password} 
                onChangeText={(text) => {
                    setPassword(text);
                    setErrors(prev => ({ ...prev, password: null }));
                }} 
                secureTextEntry 
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity>g
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.signup}>
                <Text >Don't have an account? </Text><Text onPress={()=>NavigationContainer.navigate("signup")} style={styles.sign}>Create One</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#fff",
        justifyContent:"center"
    },
    headercontainer:{
        alignItems:"center",
        marginBottom:30,
    },
    heading:{
        fontSize:30,
        fontWeight:"bold",
        color:"#0469ff",
    },
    subheading:{
        fontSize:16,
        color:"#252525",
        marginTop:5,
        textAlign:"center",
    },
    input:{
        borderWidth:1,
        borderColor:"#0469ff",
        borderRadius:10,
        padding:15,
        marginBottom:12,
        backgroundColor:"#edfaf9"
    },
    error: {
    color: "red",
    marginBottom: 10,
    fontSize: 13,
  },
  forgotText: {
    color: "#2563eb",
    textAlign: "right",
    marginBottom: 25,
    fontSize: 14,
  },
  button:{
    backgroundColor:"#0469ff",
    paddingVertical:14,
    borderRadius:8,
  },
  buttonText:{
    color:"white",
    textAlign:"center",
    fontWeight:"600",
    fontSize:16,
    textShadowColor: "rgba(0, 0, 0, 0.3)", // soft black shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  signup:{
    fontSize:16,
    color:"black",
    paddingTop:10,
  },
  sign:{
    color:"#0469ff"
  }
});

export default AuthScreen;
