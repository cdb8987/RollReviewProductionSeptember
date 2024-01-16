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
import DropdownSingleSelect from '../DropdownSingleSelect';
import {Foundation} from '@expo/vector-icons'
import AddInputPositionText from './AddPositionInputText';
import AddTechniqueInputText from './AddTechniqueInputText'
import { handleAddPosition, handleAddTechnique } from '../../Functions/functions';
import { SetPositionsContext } from '../Contexts/SetPositionsContext';
import { SetTechniquesContext } from '../Contexts/SetTechniquesContext';




export default function EventTaggingModal({
  visible, 
  setVisible, 
  timestamp, 
  eventType, 
  addLocalVideoClipRecord, 
  generateThumbnailatTimeStamp, 
  videoRecord,
  modalSelected
  

  
}){
    
  //   console.log('\nvisible', visible, 
  // '\nsetVisible', setVisible, 
  // '\ntimestamp',timestamp, 
  // '\neventType',eventType, 
  // '\naddLocalVideoClipRecord',addLocalVideoClipRecord, 
  // '\ngenerateThumbnailatTimeStamp',generateThumbnailatTimeStamp, 
  // '\nvideoRecord',videoRecord,
  // '\nmodalSelected',modalSelected,)

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    
    const containerStyle = {backgroundColor: 'white', padding: 20, flex: 1};
    // const SelectionChoices = useContext(SelectionChoicesContext)
    
    const positions = useContext(PositionSelectionChoicesContext)
    const techniques = useContext(TechniqueSelectionChoicesContext)
    const setPositions = useContext(SetPositionsContext)
    const setTechniques = useContext(SetTechniquesContext)
    const [addPositionModalVisible, setAddPositionModalVisible] = useState(false)
    const [addTechniqueModalVisible, setAddTechniqueModalVisible] = useState(false)
    
    
    const TopBar = () => (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {hideModal()}} />
          <Text>TAG {eventType} at {timestamp/1000}</Text>
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




    let eventRecord = useRef({});

    const updateEventPositionSelection = function(positionChoice){
      eventRecord['position'] = positionChoice
      
    }
    const updateEventTechniqueSelection = function(techniqueChoice){
      eventRecord['technique'] = techniqueChoice
    }
    
    const updateEventNotes = (notes)=>{
      eventRecord['notes'] = notes
    }
    const handleLogEvent = async () => {
      let localVideoHistory;
      
      const getData = async ()=>{
        if(await AsyncStorage.getItem('LocalVideoHistory')===null){
          const initialData = await JSON.stringify({ "data":[] })
          await AsyncStorage.setItem('LocalVideoHistory', initialData)
        }
        let storedData = await AsyncStorage.getItem('LocalVideoHistory')
        return storedData
      }      
      const updateData = async (storedData)=>{
        localVideoHistory = await JSON.parse(storedData)
        const d = new Date()
        eventRecord['createdAt'] = d
        eventRecord['recordType'] = 'localVideoClip'
        eventRecord['recordID'] = d.getTime()
        eventRecord['result']=eventType
        eventRecord['uri']=videoRecord.uri
        eventRecord['thumbnailURI']=await generateThumbnailatTimeStamp(videoRecord.uri, timestamp)
        eventRecord['timestamp']=timestamp
        
        for(let i of ['position', 'technique', 'notes' ]){
          if(!eventRecord[i]){
            
            eventRecord[i]=''
          }
        }

        localVideoHistory.data.push(eventRecord)
        await AsyncStorage.setItem('LocalVideoHistory', JSON.stringify(localVideoHistory))
        
      }
      
      await updateData(await getData())

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
                  onSelectCallback={updateEventPositionSelection}/>
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
                  onSelectCallback={updateEventTechniqueSelection}/>
                </View>
                <View style={{flex: 1}}>
                  <Button onPress={()=>setAddTechniqueModalVisible(true)}><Foundation name="plus" size={24} color="black" /></Button>
                </View>
                </View>


                
            </View>
            <View style={styles.DropdownContainerverticalpadding}>
            </View>
            
            
            <View style={styles.notes}>
              <Notesinput updateNotes={updateEventNotes}/>
            </View>
            
            
            
            
            
            <Button style={styles.button} 
               
              buttonColor="white"
              textColor='black'
              onPress={(async () => {
                handleLogEvent(); 
                hideModal()
                
              })}
              mode="outlined"
            >
             TAG {eventType} </Button>
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