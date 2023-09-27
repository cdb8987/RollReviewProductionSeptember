import React from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Piechart from './PieChart.js';
import { useContext, useEffect } from 'react'
import { AndroidContext } from './Contexts/AndroidContext.js'
import { PositionSelectionChoicesContext } from './Contexts/PositionsSelectionChoicesContext.js';
import { TechniqueSelectionChoicesContext } from './Contexts/TechniqueSelectionChoicesContext.js';
import { useIsFocused } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import AppBanner from './AppBanner.js';




export default function StatsScreen(){
    
    const isAndroid = useContext(AndroidContext)
    const positions = useContext(PositionSelectionChoicesContext)
    const techniques = useContext(TechniqueSelectionChoicesContext)
    const isFocused = useIsFocused()
    useEffect(()=>{
    async function lockScreenOrientationtoPortrait(){
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }  
    if(isFocused){lockScreenOrientationtoPortrait()}
  }, [isFocused])

    const countPositionRounds = async(positions) => {
        
        
        let drillingHistory = await JSON.parse(await AsyncStorage.getItem('drillingHistory'))
        const returnArray = []
        
        //  THESE OPERATIONS ARE 0(n^2).  In the future, we will include a master object which is updated with each new log record.  This will be simpler than iterating across all records on each render.  
        for(const pos of positions){ 
          let count = 0; 
          for(const drill of drillingHistory.data){
            if(drill.position === pos ){ 
              count += Number(drill.rounds)
            }
          }
          returnArray.push([pos, count])
        }
       
          return returnArray   
      }
    
      const countTechniqueRounds = async(techniques) => {
        let drillingHistory = await JSON.parse(await AsyncStorage.getItem('drillingHistory'))
        const returnArray = []
        for(const tech of techniques){
          let count = 0; 
          for(const drill of drillingHistory.data){
            if(drill.technique === tech ){ 
              count += Number(drill.rounds)
            }
          }
          returnArray.push([tech, count])
        }
       
          return returnArray   
      }
      const countPositionWins = async(positions) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        let localVideoHistory = await JSON.parse(await AsyncStorage.getItem('LocalVideoHistory'))
        const returnArray = []
    
        for(const pos of positions){ 
          let count = 0; 
          for(const roll of [...rollingHistory.data, ...localVideoHistory.data]){
            if(roll.position === pos ){ 
              if(roll.result == 'Win') {count += 1}
              
            }
          }
          returnArray.push([pos, count])
        }
        
          
          
          return returnArray   
      }
      const countPositionLosses = async(positions) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        let localVideoHistory = await JSON.parse(await AsyncStorage.getItem('LocalVideoHistory'))
        const returnArray = []
    
        for(const pos of positions){ 
          let count = 0; 
          for(const roll of [...rollingHistory.data, ...localVideoHistory.data]){
            if(roll.position === pos ){ 
              if(roll.result == 'Loss') {count += 1}
            }
          }
          returnArray.push([pos, count])
        }
          
          return returnArray   
      }
      const countTechniqueWins = async(techniques) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        let localVideoHistory = await JSON.parse(await AsyncStorage.getItem('LocalVideoHistory'))
        const returnArray = []

        
    
        for(const tech of techniques){ 
          let count = 0; 
          for(const roll of [...rollingHistory.data, ...localVideoHistory.data]){
            if(roll.technique === tech ){ 
              if(roll.result == 'Win') {count += 1}
            }
          }
          returnArray.push([tech, count])
        }
          return returnArray   
      }
      const countTechniqueLosses = async(techniques) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        let localVideoHistory = await JSON.parse(await AsyncStorage.getItem('LocalVideoHistory'))
        const returnArray = []
    
        for(const tech of techniques){ 
          let count = 0; 
          for(const roll of [...rollingHistory.data, ...localVideoHistory.data]){
            if(roll.technique === tech ){ 
              if(roll.result == 'Loss') {count += 1}
            }
          }
          returnArray.push([tech, count])
        }
          return returnArray   
      }





    return isFocused?
        
        <>
        <AppBanner/>
        <ScrollView>
        
            <View>
                
                <Piechart title={"Wins (Position)"} dataToCount={positions} chartData={countPositionWins}/>
                <Piechart title={"Losses (Position)"} dataToCount={positions} chartData={countPositionLosses}/>

                <Piechart title={"Wins (Technique)"} dataToCount={techniques} chartData={countTechniqueWins}/>

                <Piechart title={"Losses (Technique)"} dataToCount={techniques} chartData={countTechniqueLosses}/> 
                
               

                <Piechart title={'#Drilling Rounds(position)'} dataToCount={positions} chartData={countPositionRounds}/>
                <Piechart title={'#Drilling Rounds(technique)'} dataToCount={techniques} chartData={countTechniqueRounds}/>
                
            </View>

        </ScrollView>
        </>
    : 
    null

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#19c37d',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', 
      
      
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    TrainingPlanheader: {
        fontSize: 25,
        fontWeight: 'bold', 
        padding: 15,
        marginTop: 30
    },
    Historyheader: {
      fontSize: 25,
      fontWeight: 'bold', 
      padding: 15,
      
  }

  })