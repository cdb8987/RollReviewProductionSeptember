import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Dimensions, View, Text} from 'react-native';
import RollingScreen from '../Components/RollingScreen'
import TutorialsScreen from '../Components/TutorialsScreen'
import NotesScreen from '../Components/NotesScreen';
import { useContext, useEffect, useState, useRef } from 'react';
import { PositionSelectionChoicesContext } from '../Components/Contexts/PositionsSelectionChoicesContext';
import { TechniqueSelectionChoicesContext } from '../Components/Contexts/TechniqueSelectionChoicesContext';
import { EventSelectionChoicesContext } from '../Components/Contexts/EventSelectionChoicesContext';
import { techniqueSelectionContext } from '../Components/Contexts/techniqueSelectionContext';
import { positionSelectionContext } from '../Components/Contexts/positionSelectionContext';
import {refreshContentFeedContext}from '../Components/Contexts/refreshContentFeedContext'
import EmptyPlaceholderScreen from '../Components/EmptyPlaceholderScreen';
import {MaterialCommunityIcons, AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import DropdownSingleSelect from '../Components/DropdownSingleSelect';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';
import AppBanner from '../Components/AppBanner';

const Tab = createMaterialTopTabNavigator();


export default function DashboardTab() { 
  
  const isFocused = useIsFocused()

  useEffect(()=>{
    
    async function lockScreenOrientationtoPortrait(){
      
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
     console.log('orientation locked')
    }  
    if(isFocused){lockScreenOrientationtoPortrait()}
  }, [isFocused])

  
  
  
  const {techniqueSelection, setTechniqueSelection} = useContext(techniqueSelectionContext) 
  const {positionSelection, setpositionSelection} = useContext(positionSelectionContext)
  
  const positionList = [...useContext(PositionSelectionChoicesContext)]
  const techniqueList = [...useContext(TechniqueSelectionChoicesContext)]

  
  
  const eventList = useContext(EventSelectionChoicesContext)


  

  
  

  
  return (
    <>
    
    <techniqueSelectionContext.Provider value={techniqueSelection}>
    <positionSelectionContext.Provider value={positionSelection}>
    <AppBanner/>
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}} >
        <DropdownSingleSelect inputOptions={positionList} labelName={'Position'} onSelectCallback={setpositionSelection}/>
      </View>
      <View style={{flex: 1}} >
        <DropdownSingleSelect inputOptions={techniqueList} labelName={'Technique'} onSelectCallback={setTechniqueSelection}/>
      </View>
    </View>
    
    <Tab.Navigator 
      initialLayout={{width: Dimensions.get('window').width}
      
    }>
      
      <Tab.Screen name="Notes" 
        component={NotesScreen}
        options={{
          title: 'Notes',
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="notebook" size={24} color="black" />
          ),
        }} 
      />

      <Tab.Screen 
      name="Tutorials" 
      component={TutorialsScreen} 
      options={{
        title: 'Tutorials',
        tabBarIcon: ({ focused, color, size }) => (
          <AntDesign name="youtube" size={24} color="black" />
        ),
      }}
      />
      

      <Tab.Screen 
      name="Rolling" 
      component={RollingScreen} 
      options={{
        title: 'Rolling',
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name="kabaddi" size={24} color="black" />
        ),
      }}
      />
    </Tab.Navigator>
    
    </positionSelectionContext.Provider>
    </techniqueSelectionContext.Provider>
    
    </>
  
  );
}

