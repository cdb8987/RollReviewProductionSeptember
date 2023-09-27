import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Notesinput from './NotesInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useContext, useState, useRef } from 'react'
import { PositionSelectionChoicesContext } from '../Contexts/PositionsSelectionChoicesContext';
import { TechniqueSelectionChoicesContext } from '../Contexts/TechniqueSelectionChoicesContext';
import { Modal, Portal, Button } from 'react-native-paper';
import EnterURLInputbox from './EnterUrlInputBox';
import { Appbar } from 'react-native-paper';
import { techniqueSelectionContext } from '../Contexts/techniqueSelectionContext';
import { positionSelectionContext } from '../Contexts/positionSelectionContext';
import {getYoutubeMeta} from 'react-native-youtube-iframe';
import DropdownSingleSelect from '../DropdownSingleSelect';
import {Foundation} from '@expo/vector-icons'
import AddInputPositionText from './AddPositionInputText';
import AddTechniqueInputText from './AddTechniqueInputText'
import { handleAddPosition, handleAddTechnique } from '../../Functions/functions';
import { SetPositionsContext } from '../Contexts/SetPositionsContext';
import { SetTechniquesContext } from '../Contexts/SetTechniquesContext';

export default function InputTutorialModal({visible, setVisible}){
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
          <Text>TUTORIAL</Text>
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



    let videoRecord = useRef({});

    const updateVideoPositionSelection = function(positionChoice){
        videoRecord['position'] = positionChoice;
        
      }
      const updateVideoTechniqueSelection = function(techniqueChoice){
        videoRecord['technique'] = techniqueChoice
        
      }
      
      const updateVideoNotes = (notes)=>{
        videoRecord['notes'] = notes;
        
      }
      const updateVideoURL = (url)=>{
          videoRecord['url'] = url;
          
        }

      
      

      const getYoutubeThumbNailURL = async (videoId)=>{
        try{
            const meta = await getYoutubeMeta(videoId);
            
            return meta.thumbnail_url
            
        }
        catch(error){console.log(error, 'THUMBNAIL FUNCTION FAILED')}
        
    }
      
      const handleLogVideo = async () => {
        if(!videoRecord.url.includes('youtu.be')){
          alert('Roll Review only integrates Youtube Videos in this version.  Please enter link from the "share/copy link" option in Youtube .  \n\nEXAMPLE:\n\n https://youtu.be/GshEzcqlUbY?si=ZYj9frOypZmbZAx_ \n\n Stay tuned for additional integrations in future versions!')
          return false
        }
        
        let videoHistory;
        
        const getData = async ()=>{
          if(await AsyncStorage.getItem('videoHistory')===null){
            const initialData = await JSON.stringify({ "data":[] })
             
            await AsyncStorage.setItem('videoHistory', initialData)
          }
          let storedData = await AsyncStorage.getItem('videoHistory')
         
          return storedData
        }      
        const updateData = async (storedData)=>{
          if(!videoRecord.url){return null}
          videoHistory= await JSON.parse(storedData)
          const d = new Date()
          videoRecord['createdAt'] = d
          videoRecord['recordType'] = 'video'
          videoRecord['recordID'] = d.getTime()

          if(videoRecord.url.includes('youtu.be')){
            const youtubeVideoCode = videoRecord.url.substring(videoRecord.url.indexOf('youtu.be')+9, videoRecord.url.indexOf('youtu.be')+20)
            
            videoRecord['YoutubeThumbNailURL'] = await getYoutubeThumbNailURL(youtubeVideoCode)
            
          }
          
          for(let i of ['url', 'position', 'technique', 'notes']){
            if(!videoRecord[i]){
              videoRecord[i]=''
            }
          }
          let validLink = false
          try{
            const response = await fetch(videoRecord.url)
            if(response.status == 200){validLink = true}
          }
          catch(error){alert('The link you entered appears to be broken.  Please check your entry and try again.')}
    
          if(validLink){
            videoHistory.data.push(videoRecord)
            
            await AsyncStorage.setItem('videoHistory', JSON.stringify(videoHistory))
            
          }
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
                  onSelectCallback={updateVideoPositionSelection}/>
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
                 onSelectCallback={updateVideoTechniqueSelection}/>
                </View>
                <View style={{flex: 1}}>
                  <Button onPress={()=>setAddTechniqueModalVisible(true)}><Foundation name="plus" size={24} color="black" /></Button>
                </View>
            </View>
                
  
      
                
                <EnterURLInputbox style={styles.notes} updateVideoURL={updateVideoURL}/>


            </View>
            <View style={styles.DropdownContainerverticalpadding}>
            </View>
            
            
            <View style={styles.notes}>
              <Notesinput updateNotes={updateVideoNotes}/>
            </View>
            

            <Button style={styles.button} 
               
              buttonColor="white"
              textColor='black'
              onPress={(async () => {handleLogVideo('test'), hideModal()})}
              mode="outlined"
            >
             ADD TUTORIAL </Button>
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