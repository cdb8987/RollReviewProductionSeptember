import React from 'react'
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useContext} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import {addLocalVideoFullRecord} from '../Functions/functions'
import { useIsFocused } from '@react-navigation/native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SetVideoCameraScreenSelected } from './Contexts/SetVideoCameraScreenSelected';

export default function VideoCameraScreen(){
  const [camera, setCamera] = useState(null)
  const [thumbnailImage, setThumbnailImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [recordingVideo, setRecordingVideo]= useState(false)
  // let recordingVideo = false
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = Camera.useMicrophonePermissions();
  const [height, setHeight] = useState(100)
  const setVideoScreenSelected = useContext(SetVideoCameraScreenSelected)
  const isFocused = useIsFocused()
  const [recordingIndicatorVisible, setRecordingIndicatorVisible]=useState(true)

  useEffect(()=>{
   
    async function unLockScreenOrientationtoPortrait(){
  await ScreenOrientation.unlockAsync();
  
 
  
} 
    if(isFocused){unLockScreenOrientationtoPortrait();  setVideoScreenSelected(true)}
  }, [isFocused])

  
  



  
    if (!cameraPermission || !microphonePermission){
      return <View></View>
    }
  
    if (!cameraPermission.granted || !microphonePermission.granted){
      return (
      <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>We need Camera/Microphone permissions to record videos.  </Text>
      <Button onPress={requestCameraPermission} title="grant cameraPermission" />
      <Button onPress={requestMicrophonePermission} title="grant microphonePermission" />
    </View>)
    } 
  
    
    //What is the parent of onCameraReady?
  

  

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function generateThumbnail(videoURI){
    try {
      
      const thumbnail = await VideoThumbnails.getThumbnailAsync(
        videoURI,
        {
          time: 0,
        }
        
      );
  
      setThumbnailImage(thumbnail.uri);
      return thumbnail
    } catch (e) {
      console.warn(e);
    }
  }

  async function ToggleRecordVideo(){
    if(!camera){return}
    
    if(!recordingVideo){
      setRecordingVideo(true)
      const videoRecording = await camera.recordAsync()
      const thumbnail = await generateThumbnail(videoRecording.uri)
      
      setVideo(videoRecording.uri)
      const filename = new Date().getTime();
      const videoMediaStoragePath = FileSystem.documentDirectory + filename + '.mp4';
      const thumbnailMediaStoragePath = FileSystem.documentDirectory + (filename + 1) + '.jpg';
     
      await FileSystem.copyAsync({
           from: videoRecording.uri,
           to: videoMediaStoragePath
      });
      await FileSystem.copyAsync({
        from: thumbnail.uri,
        to: thumbnailMediaStoragePath
      })
      await FileSystem.deleteAsync(videoRecording.uri)
   
   ;
      
      
      addLocalVideoFullRecord(videoMediaStoragePath, thumbnailMediaStoragePath)
    }
    else if(recordingVideo){
      setRecordingVideo(false)
      camera.stopRecording()
      console.log('RECORDING ENDED')

    }
    
  }

  const recordingIndicator = recordingVideo? 
    <View ><Text style={{color: 'red', fontSize: 24}}>Recording...</Text></View> : null

    return(
      isFocused?
      
      <View style={styles.container}>
      <Camera 
      style={styles.camera} 
      type={type}
      ref={(r)=>setCamera(r)}
      
      >
        
        <View style={styles.FlipbuttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <MaterialIcons name="flip-camera-ios" size={75} color="black" />
          </TouchableOpacity>
        </View>
        


        <View style={styles.buttonGroup}>
        {recordingIndicator}
        <View >
          <TouchableOpacity 
          style={styles.RecordbuttonContainer} 
          onPress={ToggleRecordVideo}
          >
          </TouchableOpacity>
        </View>
        </View>
      </Camera>
    </View>

    :

    null
    )
  
  }

    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      camera: {
        flex: 1
      }, 
      buttonGroup:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-end'},
      FlipbuttonContainer: {
        height: 100,
        width: 100, 
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center', 
        justifyContent: 'center'
      }, 
      RecordbuttonContainer: {
        height: 100,
        width: 100, 
        backgroundColor: 'red',
        borderRadius: 50,
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 15
      }, 
      button: {
        
        
      }, 
      text: {
        
      },
    }); 