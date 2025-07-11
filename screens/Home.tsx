import React from 'react';
import { View, Text,Image, StyleSheet,ScrollView,Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 3 * 16) / 2;

export default function Home() {

  const userName="Abhay";//placeholder for name
  const Status="Healthy";//placeholder for status
  const Subtitle1="Keep it Up";
  const Subtitle2="Healthy lifestyle on track";
  const color="lime";
  const stepcount="232"
  const kcalcount="32"
  const suggestions = [
  {
    icon: 'water-outline',
    title: 'Stay Hydrated',
    description: 'Drink 2 more glasses of water today to stay energized.',
  },
  {
    icon: 'walk-outline',
    title: 'Move Around',
    description: 'Take a 5-minute walk to reduce inactivity.',
  },
  {
    icon: 'bed-outline',
    title: 'Sleep Tip',
    description: 'Try to get at least 7 hours of sleep tonight.',
  },
];
  const healthQuotes = [
  "Health is wealth.",
  "Your body hears everything your mind says. Stay positive.",
  "Eat clean, stay fit, and live longer.",
  "Take care of your body. It's the only place you have to live.",
  "Sleep is the best meditation.",
  "A fit body, a calm mind. That is true wealth.",
  "Exercise not only changes your body, it changes your mind.",
];
  const today = new Date().getDate();
  const quoteOTheDay=healthQuotes[today %healthQuotes.length]


  return (
    <ScrollView style={styles.container}>
      
      
      <View style={styles.toprow}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
        <Image style={styles.profile} source={require('../assets/images/icon.png')}/>
      </View>


      <View style={styles.headerContainer}>
        
        <Text style={styles.username}>Hi,{userName}!</Text>
      </View>


      <View style={styles.healthcard}>
        <Image
      source={require('../assets/images/contour.png')}
      style={styles.contourImage}
      resizeMode="cover"
       />

        <View style={styles.cardheader}>
          <View style={styles.glow}>
            <Ionicons name='ellipse' size={30} color={color}/>
          </View>
          
          <Text style={styles.healthcardtitle}>{Status}.</Text>
        </View>
        <Text style={styles.subtitle}>{Subtitle1} !</Text>
        <Text style={styles.subtitle}>{Subtitle2} .</Text>
      </View>

      <View style={styles.qcontainer}>
        <Text style={styles.qtext}>{quoteOTheDay}</Text>
      </View>

     
      <View style={styles.Activitysection}>
        <Text style={styles.Activityheader}>Activity Summary</Text>
        <View style={styles.cardrow}>
        <View style={styles.card}>
          <View style={styles.cardtoprow}>
            <Ionicons name='footsteps' size={35} color={Colors.warning}/>
            <Text style={styles.cardheading}>Steps Taken</Text>
          </View>
          <View style={styles.count}>
            <Text>
              <Text style={styles.number}>{stepcount} </Text>
              <Text style={styles.label}>steps</Text>
            </Text>
          </View>
        </View>


        <View style={styles.card}>
          <View style={styles.cardtoprow}>
            <Ionicons name='flame-sharp' size={35} color={Colors.error}/>
            <Text style={styles.cardheading}>Calories</Text>
          </View>
          <View style={styles.count}>
            <Text>
              <Text style={styles.number}>{kcalcount} </Text>
              <Text style={styles.label}>kcal</Text>
            </Text>
          </View>
        </View>
        </View>
      </View>


      <View style={styles.sugsection}>
        <Text style={styles.sugheader}>Suggestions</Text>
        {suggestions.map((item,index)=>(
          <View key={index} style={styles.sugcard}>
            <Ionicons name={item.icon as any} size={28} color={Colors.primary}/>
            <Text style={styles.sugtitle}>{item.title}</Text>
            <Text style={styles.sugtext}>{item.description}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity onPress={()=>AsyncStorage.removeItem('hasSeenOnboarding')}>
        <Text style={styles.reset}>reset</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.background,
    paddingHorizontal:20,
    paddingTop:40,
  },
  headerContainer:{
    marginTop:30,
    marginBottom:2,
    
  },
  toprow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:0,
    paddingRight:10,
    marginTop:10
  },
  logo:{
    width:32,
    height:32,
    resizeMode:'contain',
    borderRadius:16
  },
  profile:{
    width:32,
    height:32,
    resizeMode:'contain',
    borderRadius:16,
  },
  username:{
    fontSize:25,
    fontFamily:'Bold',
    color:Colors.textPrimary,
    lineHeight:35,
  },
  healthcard:{
    backgroundColor:Colors.primary,
    borderRadius:16,
    padding:20,
    marginTop:10,
    overflow:'hidden',
    position:'relative',
    height:180,
  },
  glow:{
  position: 'absolute',
  top: 0,
  right: 0,
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  shadowColor: 'color',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.9,
  shadowRadius: 10,
  elevation: 10,
  backgroundColor: 'transparent',
  },
  contourImage:{
      ...StyleSheet.absoluteFillObject,
      opacity:0.05
  },
  cardheader:{
    flexDirection:'column',
    gap:2,
    
  },
  healthcardtitle:{
    fontSize:45,
    color:'#fff',
    fontFamily:"Bold",
    marginBottom:15,
    marginTop:10,
  },
  subtitle:{
    fontSize:14,
    color:'#fff',
    fontFamily:'Medium',
  },
  qcontainer:{
    marginTop:20,
    alignItems:'center',
  },
  qtext:{
    flex:1,
    maxWidth:'80%',
    textAlign:'center',
    fontFamily:'Italic',
    fontSize:17,
    color:Colors.textPrimary
  },
  Activitysection:{
    marginTop:15,
  },
  Activityheader:{
    fontFamily:"Bold",
    fontSize:25,
    
  },
  cardrow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  card:{
    marginTop:15,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:10,
    width:cardWidth,
    marginBottom:10,
  },
  cardtoprow:{
    flex:1,
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    marginBottom:12,
  },
  cardheading:{
    fontFamily:"Medium",
    fontSize:15,
  },
  count:{
    flex:1,
    flexDirection:'row',
    alignItems:'baseline',
    justifyContent:'center',
    marginBottom:5,
    
  },
  number:{
    justifyContent:'center',
    fontSize:30,
    fontFamily:'Bold'
  },
  label:{
    fontFamily:"Regular"
  },
  sugsection:{
    marginTop:10,
    marginBottom:50,
  },
  sugheader:{
    fontFamily:"Bold",
    fontSize:25,
    marginBottom:5,
  },
  sugcard:{
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    
  },
  sugtitle:{
     fontFamily: 'Bold',
    fontSize: 16,
    marginTop: 8,
    color: Colors.textSecondary,
  },
  sugtext:{
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 4,
    color: Colors.textSecondary,
  },
  reset:{
    fontSize:20,
    marginBottom:50,
  }
});