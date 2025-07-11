import React from 'react';
import { View, Text, StyleSheet,ScrollView,Dimensions } from 'react-native';
import Colors from '@/constants/Colors';
import {AreaChart,Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import TopBar from '@/components/ui/Topbar';
import {Defs,LinearGradient,Stop} from 'react-native-svg';


const screenWidth=Dimensions.get('window').width;
const cardWidth=(screenWidth-50)/2;


const insights=[
  {
    id:'1',
    title:'Heart Rate',
    values:[78,85,88,90,87,84],
    threshold:90,
    unit:'bpm',
  },
    {
    id:'2',
    title:'Stress',
    values:[30, 35, 40, 25, 28, 20, 22],
    threshold:40,
    unit:'%',
  },
    {
    id:'3',
    title:'SpO₂',
    values:[78,85,88,90,87,84],
    threshold:95,
    unit:'%',
  },
    {
    id:'4',
    title:'Sleep',
    values:[6, 5.5, 7, 6.8, 6, 5, 6.5],
    threshold:7,
    unit:'hrs',
  },
    {
    id:'5',
    title:'Steps',
    values:[780,850,888,908,878,884],
    threshold:905,
    unit:'steps',
  },
    {
    id:'6',
    title:'Activity Score',
    values:[78,85,88,90,87,84],
    threshold:70,
    unit:'',
  },
];

const getMessage=(avg:number,threshold:number,title:string)=>{
  if (title==="Heart Rate")return avg>threshold? 'Too high! Try to Stay Calm':"Heart Rate is in Healty Range";
  if (title==="Stress")return avg>threshold? 'Take time to relax': "Stress under Control";
  if (title==="SpO₂")return avg<threshold? 'Oxygen Levels Low':"Healty Oxygen levels";
  if (title==="Sleep")return avg<threshold? 'Improve your sleep':"Well rested!";
  if (title==="Steps")return avg<threshold? 'Walk a bit more':"You are a great walker";
  if (title==="Activity Score")return avg<threshold? 'Be more active':"You are a active!";
  return "";
}
export default function Insights() {
  return (
    <ScrollView style={styles.container}>
      <TopBar title="Insights" />

      <Text style={styles.headerText}>This Week’s Insights</Text>

      <View style={styles.cardsContainer}>
        {insights.map((item) => {
          const avg = item.values.reduce((a, b) => a + b, 0) / item.values.length;
          const feedback = getMessage(avg, item.threshold, item.title);

          return (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <AreaChart
                style={styles.chart}
                data={item.values}
                contentInset={{ top: 10, bottom: 10 }}
                curve={shape.curveNatural}
                svg={{
                  fill: 'url(#gradient)',
                }}
              >
                <Grid />
                <Defs key="gradient">
                  <LinearGradient id="gradient" x1="0" y="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor={Colors.primary} stopOpacity={0.7} />
                    <Stop offset="100%" stopColor={Colors.primary} stopOpacity={0.1} />
                  </LinearGradient>
                </Defs>
              </AreaChart>

              <Text style={styles.unitText}>Avg: {avg.toFixed(1)} {item.unit}</Text>
              <Text style={styles.feedbackText}>{feedback}.</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1,
    backgroundColor:Colors.background,
    paddingHorizontal:20,
    paddingTop:50,
  },
  headerText:{
    fontSize:20,
    fontFamily:'Bold',
    marginBottom:15,
    color:Colors.textPrimary,
    textAlign:'center',
    marginTop:20,
  },
  cardsContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    
  },
  card:{
    width:cardWidth,
    backgroundColor:Colors.surface,
    borderRadius:12,
    padding:12,
    marginBottom:5,
    elevation:1,
  },
  cardTitle:{
    fontSize:18,
    fontFamily:"Bold",
    marginBottom:6,
    color:Colors.textPrimary,
  },
  chart:{
    height:80,
    marginBottom:10,
  },
  unitText:{
    fontSize:14,
    fontFamily:'Medium',
    color:Colors.textSecondary,
  },
  feedbackText:{
    fontSize:14,
    fontFamily:'Bold',
    marginTop:4,
    color:Colors.textPrimary
  }
});