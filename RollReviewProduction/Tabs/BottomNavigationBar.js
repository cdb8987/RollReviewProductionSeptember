import * as React from 'react';
import { View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, Entypo, Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import DashboardTab from './DashboardTab';
import RecordTab from './RecordTab'
import StatsTab from './StatsTab'
import MoreTab from './MoreTab'
import VideoCameraScreen from '../Components/VideoCameraScreen'
import RollReviewScreen from '../Components/RollReviewScreen';




const Tab = createMaterialBottomTabNavigator();


function BottomNavigationBar() {
  console.log('Bottom Navigation Loaded')
  
  
  return (
      <>
      
      <Tab.Navigator 
      initialRouteName='Dashboard'
       
      
      >
        
        <Tab.Screen 
        name='Dashboard'
        
        component={DashboardTab} 
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => (
            <MaterialIcons name="dashboard" size={24} color="black" />
          )
        }}
        
        />
        
        <Tab.Screen 
          name='Record' 
          component={RecordTab} 
          options={{
            tabBarLabel: 'Record',
            tabBarIcon: () => (
              <Entypo name="controller-record" size={24} color="red" />
            )
          }}
          />
        <Tab.Screen 
            name='Stats' 
            component={StatsTab} 
            options={{
              tabBarLabel: 'Stats',
              tabBarIcon: () => (
                <AntDesign name="piechart" size={24} color="black" />
              )
            }}
            />
        <Tab.Screen 
            name='More' 
            component={MoreTab} 
            options={{
              tabBarLabel: 'More',
              tabBarIcon: () => (
                <Feather name="more-horizontal" size={24} color="black" />
            )}}
        />

      </Tab.Navigator>
      
      

 


      </>
    
  );
}

export default BottomNavigationBar;