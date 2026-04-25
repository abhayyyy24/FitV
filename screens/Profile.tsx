import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,Switch,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TopBar from '@/components/ui/Topbar';
import { supabase } from '@/utlis/supabaseClient';
import { Alert } from 'react-native';


const status='connected'


export default function Profile({navigation}:any) {
  
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  //User name and email
  useEffect(()=>{
    const fetchUserData=async()=>{
      const{data:{user},error}=await supabase.auth.getUser();

      if(user){
        setName(user.user_metadata?.name||'unnamed');
        setEmail(user.email||'');
      }else{
        console.log('User fetch error:',error?.message);
      }
    };
    fetchUserData();
  },[]);

  //Logout function
  const handleLogout=async()=>{
    const{error}=await supabase.auth.signOut();
    if(error){
      Alert.alert('Logout failed',error.message);
    }else{
      navigation.reset({
        index:0,
        routes:[{name:'Auth'}],
      });
    }
  };
  
  const[notificationsEnabled,setNotificationsEnabled]=useState(false);
  const[darkModeEnabled,setDarkModeEnabled]=useState(false);


  return (
    <ScrollView style={styles.container}>
      <TopBar title="Profile"/>
      
      <View style={styles.profilesection}>
        <Image style={styles.avatar} source={require('../assets/images/icon.png')}/>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <Text style={styles.sectiontitle}>Device</Text>
      <View style={styles.row}>
  <View style={styles.rowLeft}>
    <View style={styles.iconbox}>
      <Ionicons name='watch-outline' size={20} color='black' />
    </View>
    <Text style={styles.rowtext}>Smartwatch Sync</Text>
  </View>
  <Text style={styles.rowstatus}>{status}</Text>
</View>

<Text style={styles.sectiontitle}>Prefrences</Text>
<View style={styles.row}>
  <View style={styles.rowLeft}>
    <View style={styles.iconbox}>
      <Ionicons name='notifications-outline' size={20} color='black' />
    </View>
    <Text style={styles.rowtext}>Notifications</Text>
  </View>
  <Switch 
    value={notificationsEnabled}
    onValueChange={setNotificationsEnabled}
    trackColor={{false:'#ddd',true:Colors.primary}}
    thumbColor={notificationsEnabled? '#fff':'#fff'}
    ios_backgroundColor='#ddd'
  />
</View>

<View style={styles.row}>
  <View style={styles.rowLeft}>
    <View style={styles.iconbox}>
      <Ionicons name='moon-outline' size={20} color='black' />
    </View>
    <Text style={styles.rowtext}>Dark Mode</Text>
  </View>
  <Switch 
    value={darkModeEnabled}
    onValueChange={setDarkModeEnabled}
    trackColor={{false:'#ddd',true:Colors.primary}}
    thumbColor={notificationsEnabled? '#fff':'#fff'}
    ios_backgroundColor='#ddd'
  />
</View>



      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     backgroundColor:Colors.background,
     paddingHorizontal:20,
     paddingTop:50,
  },
  profilesection:{
    alignItems:'center',
    fontFamily:'Bold',
    marginTop:30
  },
  avatar:{
    width:150,
    height:150,
    borderRadius:45,
    resizeMode:'contain',
    marginBottom:10,
    
  },
  name:{
    fontSize:20,
    fontFamily:'Bold'
  },
  email:{
    fontSize:14,
    fontFamily:'Regular',
    color:Colors.textSecondary
  },
  sectiontitle:{
    fontSize:20,
    fontFamily:'Bold',
    marginTop:20,
    marginBottom:10,
  },
  row:{
    backgroundColor:Colors.surface,
    borderRadius:12,
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10,
  },
  rowLeft:{
    flexDirection:'row',
    alignItems:'center',
  },
  iconbox:{
    width:32,
    height:32,
    backgroundColor:'fff',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginRight:12,
  },
  rowtext:{
    fontSize:15,
    color:Colors.textSecondary,
    fontFamily:'Medium'
  },
  rowstatus:{
    fontSize:15,
    color:Colors.textSecondary,
    fontFamily:'Medium',
  },
  logoutButton:{
    marginTop:30,
    backgroundColor:'#FF3131',
    padding:14,
    borderRadius:12,
    alignItems:'center',
  },
  logoutText:{
    fontSize:15,
    fontFamily:'Bold',
  }
});