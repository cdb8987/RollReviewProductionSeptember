import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Notesinput from './NotesInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useContext, useState, useRef } from 'react'
import { PositionSelectionChoicesContext } from '../Contexts/PositionsSelectionChoicesContext';
import { TechniqueSelectionChoicesContext } from '../Contexts/TechniqueSelectionChoicesContext';
import { Modal, Portal, Button} from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { techniqueSelectionContext } from '../Contexts/techniqueSelectionContext';
import { positionSelectionContext } from '../Contexts/positionSelectionContext';
import { SetPositionsContext } from '../Contexts/SetPositionsContext';
import { SetTechniquesContext } from '../Contexts/SetTechniquesContext';
import DropdownSingleSelect from '../DropdownSingleSelect';
import {Foundation} from '@expo/vector-icons'
import AddInputPositionText from './AddPositionInputText';
import AddTechniqueInputText from './AddTechniqueInputText'
import { handleAddPosition, handleAddTechnique } from '../../Functions/functions';


export default function InputDrillModal({
  visible, 
  setVisible
  
}){
    
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, flex: 1};
    // const SelectionChoices = useContext(SelectionChoicesContext)
    const positions = useContext(PositionSelectionChoicesContext)
    const techniques = useContext(TechniqueSelectionChoicesContext)
    const setPositions = useContext(SetPositionsContext)
    const setTechniques = useContext(SetTechniquesContext)
    const {positionSelection, setpositionSelection} = useContext(positionSelectionContext)
    const {techniqueSelection, setTechniqueSelection} = useContext(techniqueSelectionContext)
    const [addPositionModalVisible, setAddPositionModalVisible] = useState(false)
    const [addTechniqueModalVisible, setAddTechniqueModalVisible] = useState(false)
    
    
    
    
    const TopBar = () => (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {hideModal()}} />
          <Text>DRILL</Text>
        </Appbar.Header>
    );


    const AddPositionTextInputModal = ()=>{
      return (
        <Modal style={{flex: 1}} transparent={true}visible={addPositionModalVisible} onDismiss={hideAddPositionModal} contentContainerStyle={containerStyle}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => {hideAddPositionModal()}} />
                <Text>POSITION</Text>
                <AddInputPositionText 
                  handleAdd={handleAddPosition}
                  positions={positions}
                  setPositions={setPositions}
                  onDismiss={hideAddPositionModal}
                  />
                
            </Appbar.Header>
            
            
            </Modal>
          
      )
    }

    const AddTechniqueTextInputModal = ()=>{


      
      return (
        <Modal style={{flex: 1}} transparent={true}visible={addTechniqueModalVisible} onDismiss={hideAddTechniqueModal} contentContainerStyle={containerStyle}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => {hideAddTechniqueModal()}} />
                <Text>TECHNIQUE</Text>
                <AddTechniqueInputText 
                  handleAdd={handleAddTechnique}
                  techniques={techniques}
                  setTechniques={setTechniques}
                  onDismiss={hideAddTechniqueModal}
                  />
                
            </Appbar.Header>
            
            
            </Modal>
          
      )
    }



      const hideAddPositionModal = ()=>setAddPositionModalVisible(false)
      const hideAddTechniqueModal = ()=>setAddTechniqueModalVisible(false)




    let drillRecord = useRef({});

    const updateDrillPositionSelection = function(positionChoice){
      drillRecord['position'] = positionChoice;
     
    }
    const updateDrillTechniqueSelection = function(techniqueChoice){
      drillRecord['technique'] = techniqueChoice
    }
    const updateDrillRoundsSelection = function(roundsChoice){
      drillRecord['rounds'] = roundsChoice
    }
    const updateDrillNotes = (notes)=>{
      drillRecord['notes'] = notes;
    }
    const handleLogDrill = async () => {
      let drillingHistory;
      
      const getData = async ()=>{
        if(await AsyncStorage.getItem('drillingHistory')===null){
          const initialData = await JSON.stringify({ "data":[] })
          await AsyncStorage.setItem('drillingHistory', initialData)
        }
        let storedData = await AsyncStorage.getItem('drillingHistory')
        return storedData
      }      
      const updateData = async (storedData)=>{
        if(!drillRecord.rounds){console.log('no rounds!');return null}
        drillingHistory = await JSON.parse(storedData)
        const d = new Date()
        drillRecord['createdAt'] = d
        drillRecord['recordType'] = 'drill'
        drillRecord['recordID'] = d.getTime()
        for(let i of ['rounds', 'position', 'technique', 'notes' ]){
          if(!drillRecord[i]){
            drillRecord[i]=''
          }
        }

        drillingHistory.data.push(drillRecord)
        await AsyncStorage.setItem('drillingHistory', JSON.stringify(drillingHistory))
        
      }
      
      await updateData(await getData())

      setpositionSelection('placeholder') //triggers global re-render and persists values
      setpositionSelection(String(positionSelection))
      setTechniqueSelection('placeholder')
      setTechniqueSelection(String(techniqueSelection))
    
    

    }

    return(
        
        <Portal>
        <Modal style={{flex: 1}} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          
        <KeyboardAwareScrollView>
        <View style={styles.containerStyle} >
        
            <TopBar/>
            <View style={styles.TextInputContainer}>
                
                <View style={{flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                  <DropdownSingleSelect 
                  inputOptions={positions} 
                  labelName={'Position'} 
                  onSelectCallback={updateDrillPositionSelection}/>
                </View>
                <View style={{flex: 1}}>
                  <Button onPress={()=>{setAddPositionModalVisible(true)}}><Foundation name="plus" size={24} color="black" /></Button>
                </View>
                </View>



                <View style={{flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                  <DropdownSingleSelect 
                  inputOptions={techniques} 
                  labelName={'Technique'} 
                  onSelectCallback={updateDrillTechniqueSelection}/>
                </View>
                <View style={{flex: 1}}>
                  <Button onPress={()=>setAddTechniqueModalVisible(true)}><Foundation name="plus" size={24} color="black" /></Button>
                </View>
                </View>

 
                <DropdownSingleSelect
                style={styles.dropdown} 
                inputOptions={['1', '2', '3', '4', '5', '6', '7', '8', '9']} 
                labelName={'Rounds'} 
                onSelectCallback={updateDrillRoundsSelection}/>
                

            </View>
            <View style={styles.DropdownContainerverticalpadding}>
            </View>
            
            
            <View style={styles.notes}>
              <Notesinput updateNotes={updateDrillNotes}/>
            </View>
            
            
            
            
            
            <Button style={styles.button} 
               
              buttonColor="white"
              textColor='black'
              onPress={(async () => {
                handleLogDrill('test'); 
                hideModal()
                
              })}
              mode="outlined"
            >
             LOG DRILL </Button>
              <View style={styles.DropdownContainerverticalpadding}></View>      
        </View>
        </KeyboardAwareScrollView>
        </Modal>
         <AddPositionTextInputModal />
         <AddTechniqueTextInputModal/> 
        </Portal>

    )

}

const styles = StyleSheet.create({
    containerStyle: {
      width: "100%",
      flex: 1,

      backgroundColor: 'white',
      
     
    },
    
    button:{
      flex: 2,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center', 
    backgroundColor: '#6699ff'
  }, 
  TextInputContainer:{
      backgroundColor: 'white',
      flex: 2,
  },
    DropdownContainerverticalpadding: {
      flex: 1
  },
  header:{
    backgroundColor: 'white',
    fontSize: 25,
    fontWeight: 'bold', 

  }, 
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  notes:{
    flex: 1,
    backgroundColor: 'white',
  }, 
  dropdown:{
    flex: 7

  }, 
  addButton:{
    flex: 1
  }
  
  });