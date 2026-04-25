import React,{useState} from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,TouchableWithoutFeedback, Keyboard,Alert} from 'react-native';
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/utlis/supabaseClient";


export default function Auth({navigation}:any){
  const[isLogin,setIsLogin]=useState(true);
  const [showPassword,setShowPassword]=useState(false);
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');

  const validateForm=()=>{
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)){
      setError('Please Enter a Valid email adress.');
      return false;
    }

    if (password.length<6){
      setError('Password must be at least 6 characters.');
      return false;
    }

    if(!isLogin && name.trim().length<3){
      setError('Name must be at least 3 characters.')
      return false;
    }
    setError('');
    return true;
  };


  const handleAuth= async ()=>{
    const isValid=validateForm();
    if(!isValid) return;

    if(isLogin){
      const{error}= await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if(error){
        Alert.alert('Login failed',error.message);
      }else{
        navigation.reset({
          index:0,
          routes:[{name:'MainApp'}],
        });
      }
    }else{
      const {error}=await supabase.auth.signUp({
        email,
        password,
        options:{
          data:{name},
        },
      });
      if(error){
        Alert.alert('Signp failed',error.message);
      }else{
        navigation.navigate('ConfirmEmail',{email});
      }
    }
  };


  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo}/>
      <Text style={styles.name}>FitV</Text>

      <Text style={styles.heading}>{isLogin?'Login to your account':'Create a new account'}</Text>
      
      {error !== '' && (
       <Text style={styles.errorText}>{error}</Text>
      )}
      <View style={styles.form}>
        {!isLogin &&(
          <View style={styles.inputwrapper}>
            <Ionicons name='person-circle-outline' size={20} color={Colors.primary} style={styles.inputicon}/>
            <TextInput placeholder="UserName"
            placeholderTextColor='#999'
            style={styles.input}
            onChangeText={setName}
          />
          </View>
          
        )}
        <View style={styles.inputwrapper}>
          <Ionicons name='mail-open-outline' size={20} color={Colors.primary} style={styles.inputicon}/>
        <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={setEmail}
        />
        </View>
        <View style={styles.inputwrapper}>
          <Ionicons name='key-outline' size={20} color={Colors.primary} style={styles.inputicon}/>
        <TextInput
        placeholder="Password"
        placeholderTextColor="999"
        secureTextEntry={!showPassword}
        style={styles.input}
        onChangeText={setPassword}
        />
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
        <Ionicons name={showPassword?'eye-outline':'eye-off-outline'} size={20} color={Colors.primary} style={styles.inputicon}/>
        </TouchableOpacity>
        </View>
        {isLogin && (
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.googleBtn}>
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleBottom}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.toggleText}>
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <Text style={styles.toggleAction}>
              {isLogin ? 'Sign up' : 'Login'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Medium',
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.textSecondary,
  },
  form: {
    marginBottom: 20,
  },
  inputwrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 15,
  backgroundColor: '#fff',
},
inputicon: {
  marginRight: 10,
},
  input: {
   flex: 1,
  height: 50,
  fontFamily: 'Regular',
  fontSize: 15,
  color: '#333',
  
  },
  forgot: {
    textAlign: 'right',
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'Medium',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Bold',
    fontSize: 16,
  },
  or: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 15,
  },
  googleBtn: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    backgroundColor:'#fff'
  },
  googleText: {
    fontFamily: 'Medium',
    fontSize: 14,
    color: '#333',
  },
  toggleBottom: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: Colors.textSecondary,
  },
  toggleAction: {
    color: Colors.primary,
    fontFamily: 'Bold',
  },
  errorText:{
    fontFamily:"Regular",
    fontSize:14,
    color:Colors.error
  }
});
