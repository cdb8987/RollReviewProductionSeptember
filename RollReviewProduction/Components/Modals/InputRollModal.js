import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Notesinput from './NotesInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useContext, useState, useRef } from 'react'
import { PositionSelectionChoicesContext } from '../Contexts/PositionsSelectionChoicesContext';
import { TechniqueSelectionChoicesContext } from '../Contexts/TechniqueSelectionChoicesContext';
import { Modal, Portal, Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { techniqueSelectionContext } from '../Contexts/techniqueSelectionContext';
import { positionSelectionContext } from '../Contexts/positionSelectionContext';
import DropdownSingleSelect from '../DropdownSingleSelect';
import {Foundation} from '@expo/vector-icons'
import AddInputPositionText from './AddPositionInputText';
import AddTechniqueInputText from './AddTechniqueInputText'
import { handleAddPosition, handleAddTechnique } from '../../Functions/functions';
import { SetPositionsContext } from '../Contexts/SetPositionsContext';
import { SetTechniquesContext } from '../Contexts/SetTechniquesContext';


export default function InputRollModal({visible, setVisible}){
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
          <Text>ROLL</Text>
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


    let rollRecord = useRef({});

    const updateRollPositionSelection = function(positionChoice){
       
      rollRecord['position'] = positionChoice;
      }
      const updateRollTechniqueSelection = function(techniqueChoice){
        rollRecord['technique'] = techniqueChoice
      }
      const updateRollResultSelection = function(resultChoice){
        rollRecord['result'] = resultChoice
      }
      const updateRollNotes = (notes)=>{
        rollRecord['notes'] = notes;
        
      }
      const handleLogRoll = async (notes) => {
        let rollingHistory;
        
        const getData = async ()=>{
          if(await AsyncStorage.getItem('rollingHistory')===null){
            const initialData = await JSON.stringify({ "data":[] })
            await AsyncStorage.setItem('rollingHistory', initialData)
          }
          let storedData = await AsyncStorage.getItem('rollingHistory')
          return storedData
        }      
        const updateData = async (storedData)=>{
          if(!rollRecord.result){console.log('rollRecordResult does not exist'); return}
          rollingHistory= await JSON.parse(storedData)
          const d = new Date()
          rollRecord['createdAt'] = d
          rollRecord['recordType'] = 'roll'
          rollRecord['recordID'] = d.getTime()
          for(let i of ['result', 'position', 'technique', 'notes' ]){
            if(!rollRecord[i]){
              rollRecord[i]=''
            }
          }
          rollingHistory.data.push(rollRecord)
          await AsyncStorage.setItem('rollingHistory', JSON.stringify(rollingHistory))
          
        }
  
        await updateData(await getData())

        setpositionSelection('placeholder')
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
                  onSelectCallback={updateRollPositionSelection}/>
                </View>
                <View style={{flex: 1}}>
                  <Button onPress={()=>setAddPositionModalVisible(true)}><Foundation name="plus" size={24} color="black" /></Button>
                </View>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                  <DropdownSingleSelect 
                  inputOptions={techniques} 
                  labelName={'Technique'} 
                  onSelectCallback={updateRollTechniqueSelection}/>
                </View>
                <View style={{flex: 1}}>
                  <Button onPress={()=>setAddTechniqueModalVisible(true)}><Foundation name="plus" size={24} color="black" /></Button>
                </View>
            </View>
                

                <DropdownSingleSelect
                style={styles.dropdown} 
                inputOptions={['Win', "Loss"]} 
                labelName={'Result'} 
                onSelectCallback={updateRollResultSelection}/>


            </View>
            <View style={styles.DropdownContainerverticalpadding}>
            </View>
            
            
            <View style={styles.notes}>
              <Notesinput updateNotes={updateRollNotes}/>
            </View>
            
            
            
            
            
            <Button style={styles.button} 
               
              buttonColor="white"
              textColor='black'
              onPress={(async () => {handleLogRoll('test'); hideModal()})}
              mode="outlined"
            >
             LOG ROLL </Button>
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
  }
  
  });