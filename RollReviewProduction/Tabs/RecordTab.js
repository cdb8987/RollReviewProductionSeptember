import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, Entypo  } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VideoCameraScreen from '../Components/VideoCameraScreen';
import RollReviewScreen from '../Components/RollReviewScreen';
import AppBanner from '../Components/AppBanner';
import { SetVideoCameraScreenSelected } from '../Components/Contexts/SetVideoCameraScreenSelected';



const Tab = createMaterialTopTabNavigator();

export default function RecordTab(){
  
  const [videoCameraScreenSelected, setVideoCameraScreenSelected] = useState(false)
  
  const appBanner= videoCameraScreenSelected? null: <AppBanner/>
  return (
    <>
    <SetVideoCameraScreenSelected.Provider value={setVideoCameraScreenSelected}>
    {appBanner}
    <Tab.Navigator 
      initialLayout={{width: Dimensions.get('window').width}
      
      
    }>
      
      <Tab.Screen 
      name="ROLL REVIEW" 
      component={RollReviewScreen} 
      options={{
        title: 'ROLL REVIEW',
        tabBarIcon: ({ focused, color, size }) => (
          <Entypo name="video" size={24} color="black" />
        ),
      }} />

    <Tab.Screen 
      name="RECORD" 
      component={VideoCameraScreen} 
      options={{
        title: 'RECORD',
        tabBarIcon: ({ focused, color, size }) => (
          <FontAwesome5 name="video" size={24} color="black" />
        ),
      }} />
      
      
    </Tab.Navigator>
    </SetVideoCameraScreenSelected.Provider>
    </>
    
    
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  }, 
  buttonContainer: {
    height: 100,
    width: 100, 
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center', 
    justifyContent: 'center'
  }, 
  button: {
    
  }, 
  text: {
    
  },
}); 


