import * as React from 'react';
import { View, StyleSheet,  TouchableOpacity, Text, Image, Alert, Dimensions } from 'react-native';
import { Video,Audio, ResizeMode } from 'expo-av';

import { useState, useRef, useEffect} from 'react'
import {addLocalVideoClipRecord} from '../Functions/functions'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';
import { Divider } from 'react-native-paper';
import EventTaggingModal from './Modals/EventTaggingModal';
import { Button } from 'react-native-paper';
import Emoji from 'react-native-emoji';
import { displayDeleteConfirmationAlert } from '../Functions/functions';


export default function VideoPlayback({videoRecord,  isFocused, onSelect, selectedVideoKey, videoPlaybackChildUpdated, setVideoPlaybackChildUpdated}) {
  const dateArray=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dateRecord = new Date(videoRecord.createdAt)
  const day = dateArray[dateRecord.getDay()]
  const date = dateRecord.getDate()
  const month = dateRecord.getMonth()+1
  const year = dateRecord.getFullYear()
  const [eventTaggingModalSelected, setEventTaggingModalSelected] = useState(false)
  

  const eventTypeSelection =useRef(null)
  const modalTimeStamp = useRef(null)
  const videoRef = useRef(null);
  const PlaybackTimeRef = useRef(null);
  const [status, setStatus] = useState({});
  
  
  
  const triggerAudio = async (videoRef) => {
  if(!eventTaggingModalSelected){
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    videoRef.current.playAsync();}
    
  };

  
  

  

  
  useEffect(() => {
    if (status.isPlaying){triggerAudio(videoRef)}
  }, [videoRef, status.isPlaying])

  
  async function generateThumbnailatTimeStamp(videoURI, timeStamp){
    try {
      
      const thumbnail = await VideoThumbnails.getThumbnailAsync(
        videoURI,
        {
          // time: timeStamp-10000,
          time: timeStamp,
        }
        
      );
      
      const filename = new Date().getTime();
      const thumbnailMediaStoragePath = FileSystem.documentDirectory + (filename) + '.jpg';
  
      await FileSystem.copyAsync({
        from: thumbnail.uri,
        to: thumbnailMediaStoragePath
   });
   
      
    
     return thumbnailMediaStoragePath
    } catch (e) {
      console.warn(e);
    }
  }
    
  async function openEventModal(eventType, video){
    
    await video.current.pauseAsync();
    eventTypeSelection.current=eventType;
    modalTimeStamp.current=Number(String(PlaybackTimeRef.current));
    
    await setEventTaggingModalSelected(true)
    
     
     
    
     
    
  }




  return isFocused && selectedVideoKey===videoRecord.recordID?

    <>
    <EventTaggingModal
      visible={eventTaggingModalSelected}
      setVisible={setEventTaggingModalSelected}
      timestamp={modalTimeStamp.current}
      eventType={eventTypeSelection.current}
      addLocalVideoClipRecord={addLocalVideoClipRecord}
      generateThumbnailatTimeStamp={generateThumbnailatTimeStamp}
      videoRecord={videoRecord}
      modalSelected={eventTaggingModalSelected}
      
    />
    <View style={styles.container}>
      <View><Text style={styles.feedText}>{[day, ' ', month,'-',date, ' ', year ]}</Text></View>  

      <Video
        ref={videoRef}
        style={styles.video}
        source={{uri: videoRecord.uri}}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={true}
        
        
        
        onPlaybackStatusUpdate={(status) => {PlaybackTimeRef.current = status.positionMillis;  return setStatus(() => status)}}
      />
      <View style={{ position: 'absolute', top: 80, left: 0, right: 0, alignItems: 'center' }}>
        
          <View style={{flexDirection:"row"}}>
            <View >
              <Button style={{flexDirection:"row"}}
              mode="contained-tonal"
              onPress={()=>openEventModal('Lost Position', videoRef)}>
                <Text>(-)Position</Text>
                <Emoji name="x" style={{fontSize: 15}} />
              </Button>
              <View style={{height: 10}}></View> 
              <Button onPress={()=>openEventModal('Improved Position', videoRef)} mode="contained-tonal" style={{flexDirection:"row"}}>
                <Text>(+)Position</Text>
                <Emoji name="white_check_mark" style={{fontSize: 15}} />
              </Button>
            </View>
            <View style={{width: 10}}></View>
            <View>
              <Button style={{flexDirection:"row"}}
              mode="contained-tonal"
              onPress={()=>openEventModal('Defended Submission', videoRef)}>
                <Text>SUB Defense</Text>
                {/* <Emoji name="x" style={{fontSize: 15}} /> */}
              </Button>
              <View style={{height: 10}}></View>
              <Button onPress={()=>openEventModal('Attempted Submission', videoRef)} mode="contained-tonal" style={{flexDirection:"row"}}>
                <Text>SUB Attempt</Text>
                {/* <Emoji name="white_check_mark" style={{fontSize: 15}} /> */}
              </Button>
            </View>
            <View style={{width: 10}}></View>
            <View>
              <Button style={{flexDirection:"row"}}
              mode="contained-tonal"
              onPress={()=>openEventModal('Loss', videoRef)}>
                <Text>LOSS</Text>
                <Emoji name="x" style={{fontSize: 15}} />
              </Button>
              <View style={{height: 10}}></View>
              <Button onPress={()=>openEventModal('Win', videoRef)} mode="contained-tonal" style={{flexDirection:"row"}}>
                <Text>WIN</Text>
                <Emoji name="white_check_mark" style={{fontSize: 15}} />
              </Button>
            </View>
          </View>
          
      </View>
      
    <Divider/>
    </View>
    </>
  
  : <TouchableOpacity
    style={styles.container}
    onPress={()=>{onSelect()}}
    onLongPress={()=>displayDeleteConfirmationAlert(videoRecord, videoPlaybackChildUpdated, setVideoPlaybackChildUpdated)}
    >
      
      <View><Text style={styles.feedText}>{[day, ' ', month,'-',date, ' ', year ]}</Text></View>
  
  {/* Image will have to be tailored to IOS and Android separately.  Use https://reactnative.dev/docs/images to correc this later */}
  {/* Android */}
  <Image
  source={{uri: `${videoRecord.thumbnailURI}`}}
  style={styles.thumbnail}
/>
  

  {/* IOS */}
  {/* <Image
  source={{uri: 'app_icon'}}
  style={{width: 40, height: 40}}
/> */}
  <Divider/>
  </TouchableOpacity>

  
}

const styles = StyleSheet.create({
    container:{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10},
    buttons:{flex: 1},
    video: { height: Dimensions.get('window').width, width: Dimensions.get('window').width,  justifyContent: 'center', alignItems: 'center'}, 
    thumbnail: {height: 300, width: 300, justifyContent: 'center', alignItems: 'center'}, 
    feedText:{
      fontSize:24, 
      fontWeight: 'bold'
    }

})