import React from 'react';
import { View, Text, StyleSheet,ImageBackground,Dimensions,FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TopBar
from '@/components/ui/Topbar';
import { Background } from '@react-navigation/elements';

const screenwidth=Dimensions.get('window').width;
const carwidth=screenwidth-45;

const metricsData=[
  {
    title:'Heart Rate',
    value:'72 bpm',
    icon:'heart',
    isnormal:true,
    healtyrange:'60-100 bpm',
  },
  {
    title:'Stress',
    value:'Moderate',
    icon:'medkit',
    isnormal:true,
    healtyrange:'Low-Moderate',
  },
  {
    title:'Spo₂',
    value:'98%',
    icon:'water',
    isnormal:true,
    healtyrange:'95-100%',
  },
  {
    title:'Sleep',
    value:'7.5 hrs',
    icon:'moon',
    isnormal:true,
    healtyrange:'7-9 hrs',
  },
  {
    title:'Steps',
    value:'855',
    icon:'walk',
    isnormal:true,
    healtyrange:'6000-10000 steps',
  },
  {
    title:'Activity Score',
    value:'85',
    icon:'pulse',
    isnormal:true,
    healtyrange:'90+',
  },
];

export default function Metrics() {
  const renderCard=({item}:any)=>(
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconRow}>
          <Ionicons name={item.icon} size={25} color={Colors.primary}/>
          <View style={[styles.statusDot,{backgroundColor:item.isnormal?'limegreen':'red'},]}
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.value}>{item.value}</Text>
      <Text style={styles.range}>( {item.healtyrange} )</Text>
      </View>
      
    </View>
  );
  return (
    <View style={styles.container}>
      <TopBar title="Metrics"></TopBar>
      <FlatList
      data={metricsData}
      renderItem={renderCard}
      keyExtractor={(item,index)=>index.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor:Colors.background,
    paddingHorizontal:20,
    paddingTop:50,
    },
  list:{
    paddingBottom:20,
  },
  card:{
    width:carwidth,
    backgroundColor:Colors.surface,
    borderRadius:16,
    padding:16,
    marginBottom:16,
  },
  cardHeader:{
    marginBottom:10,
  },
  iconRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:8,
    justifyContent:'space-between',
    paddingRight:8,
  },
  statusDot:{
    width:20,
    height:20,
    borderRadius:10,
  },
  title:{
    marginTop:6,
    fontSize:16,
    fontFamily:'Bold',
    color:Colors.textPrimary
  },
  value:{
    fontSize:24,
    fontFamily:'Bold',
    color:Colors.textPrimary,
    paddingLeft:20,
  },
  range:{
    fontSize:12,
    color:Colors.textSecondary,
    fontFamily:'Regular'
    
  },
  bottom:{
    flex:1,
    flexDirection:'row',
    alignItems:'baseline',
    gap:10
  }

});