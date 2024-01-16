import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, Entypo, Feather, AntDesign } from '@expo/vector-icons';
import DashboardTab from './DashboardTab';
import RecordTab from './RecordTab'
import StatsTab from './StatsTab'
import MoreTab from './MoreTab'
import EmptyPlaceholderScreen from '../Components/EmptyPlaceholderScreen';





const Tab = createMaterialBottomTabNavigator();


function BottomNavigationBar() {
  
  
  
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