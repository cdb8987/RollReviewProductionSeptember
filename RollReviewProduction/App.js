// import React from 'react'
// import {View, Text} from 'react-native'
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native'
// import BottomNavigationBar from './Tabs/BottomNavigationBar'

// export default function App(){
//   return (
//     <NavigationContainer >
               
//             <BottomNavigationBar />   
        
//     </NavigationContainer>
//            )
// }










//

import 'react-native-gesture-handler';
import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View,  SafeAreaView, Platform, StatusBar, Text, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import BottomNavigationBar from './Tabs/BottomNavigationBar'
import { PaperProvider } from 'react-native-paper';
import { useState, useEffect} from 'react'
import { PositionSelectionChoicesContext } from './Components/Contexts/PositionsSelectionChoicesContext';
import { TechniqueSelectionChoicesContext } from './Components/Contexts/TechniqueSelectionChoicesContext';
import {EventSelectionChoicesContext} from './Components/Contexts/EventSelectionChoicesContext'
import { BottomNavigationHeightContext } from './Components/Contexts/BottomNavigationHeightContext'

import ModalContainer from './Components/Modals/ModalContainer';
import {AndroidContext} from './Components/Contexts/AndroidContext'
import {BackgroundImageContext} from './Components/Contexts/BackgroundImageContext'
import { techniqueSelectionContext } from './Components/Contexts/techniqueSelectionContext';
import {positionSelectionContext}from './Components/Contexts/positionSelectionContext' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetPositionsContext } from './Components/Contexts/SetPositionsContext';
import { SetTechniquesContext } from './Components/Contexts/SetTechniquesContext';
import { trimVideoWithFFmpeg } from './Functions/functions';


const testInputPath = 'file:///data/user/0/com.cdb8987.ReactNativeDrills/files/1704636486860.mp4'
const testOutputPath = `file:///data/user/0/com.cdb8987.ReactNativeDrills/files/1704636486860_IWASCLIPPEDPROGRAMMATICALLY.mp4`
trimVideoWithFFmpeg(testInputPath, 0, 1, testOutputPath)


const isAndroid = Platform.OS == 'android'

export default function App() {


  //"npm": "^9.8.1",
  
  let startingPositions = [ "Guard", "Mount", "Side Control", "Back Control"  ]
  let startingTechniques = [ "Armbar", "Escape", "Head and Arm Choke", "Kimura", "Lapel Choke", "Rear Naked Choke", "Sweep", "Triangle Choke", "Americana"]


  
  const [positions, setPositions]=useState([])
  const [techniques, setTechniques]=useState([])

  useEffect(()=>{

    const loadPositionsAndTechniques = async function(){
      if(await AsyncStorage.getItem('startingPositions')){
        let storedPositions = await JSON.parse(await AsyncStorage.getItem('startingPositions'))
        if(String(storedPositions.sort()) !== String(positions.sort())) {console.log('STORED POSITIONS ARE NOT THE SAME AS STATE POSITIONS'); setPositions(storedPositions) } 
      }
      else{
        console.log('positions Set to Starting Positions')
        AsyncStorage.setItem('startingPositions', JSON.stringify(startingPositions) );
        setPositions(startingPositions)
      }
      if(await AsyncStorage.getItem('startingTechniques')){
        console.log('technques Set to Starting techniques')
        let storedTechniques = await JSON.parse(await AsyncStorage.getItem('startingTechniques'))
        if(String(storedTechniques.sort())!==String(techniques.sort())){
          console.log('Setting Technique State Values to:', storedTechniques); 
          setTechniques(storedTechniques); 
          console.log('STORED TECHNIQUES ARE NOT THE SAME AS STATE TECHNIQUES')}
      }
      else{
        console.log('techniques Set to Starting techniques')
        AsyncStorage.setItem('startingTechniques', JSON.stringify(startingTechniques) );
        setTechniques(startingTechniques)
        
      }
    }; 
    loadPositionsAndTechniques()
  
  }, [positions, techniques])
  


  const selectionOptions = { 
    'eventList': ['Improved Position', 'Lost Position', 'Attempted Submission', 'Defended Submission', 'Win', 'Loss']
  }
  const [positionSelection, setpositionSelection] = useState('')
  const [techniqueSelection, setTechniqueSelection] = useState('')
  
  
  return (
    <techniqueSelectionContext.Provider value={{techniqueSelection, setTechniqueSelection}}>
    <positionSelectionContext.Provider value={{positionSelection, setpositionSelection}}>
    
      
    <BackgroundImageContext.Provider value={null}>
    <AndroidContext.Provider value={isAndroid}>
    <PositionSelectionChoicesContext.Provider value={positions}>
    <TechniqueSelectionChoicesContext.Provider value={techniques}>
    <SetPositionsContext.Provider value={setPositions}>
    <SetTechniquesContext.Provider value={setTechniques}>
    <EventSelectionChoicesContext.Provider value={selectionOptions}>
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          
          

          <ModalContainer/>  
          <NavigationContainer >
            <BottomNavigationHeightContext.Provider value={75}>  
              <BottomNavigationBar />   
            </BottomNavigationHeightContext.Provider>    
          </NavigationContainer>   
        </View>
      </SafeAreaView>
    </PaperProvider>
    </EventSelectionChoicesContext.Provider>
    </SetTechniquesContext.Provider>
    </SetPositionsContext.Provider>
    </TechniqueSelectionChoicesContext.Provider>
    </PositionSelectionChoicesContext.Provider>
    </AndroidContext.Provider>
    </BackgroundImageContext.Provider>
    </positionSelectionContext.Provider>
    </techniqueSelectionContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    paddingTop: Platform.OS == 'android'? StatusBar.currentHeight : 0
  },
  
});





