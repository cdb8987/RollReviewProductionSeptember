import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import {useEffect, useState} from 'react'
import { Divider} from 'react-native-paper';




export default function ClippedVideoPlayback({
  videoRecord, 
  isFocused, 
  duration, 
  selectedVideoKey, 
  onSelect}) {
  //inFocusStatus refers to whether the video is scrolled over and hovered on
  

  const videoRef = React.useRef(null);
  const [status, setStatus] = useState({});

  const triggerAudio = async (videoRef) => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  videoRef.current.playAsync();
  };

  
  useEffect(() => {
    if (status.isPlaying){triggerAudio(videoRef)}
  }, [videoRef, status.isPlaying])




  const endTimeStamp = videoRecord.timestamp>10000? videoRecord.timestamp-10000 + duration : videoRecord.timestamp + duration
  const dateArray=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dateRecord = new Date(videoRecord.createdAt)
  const day = dateArray[dateRecord.getDay()]
  const date = dateRecord.getDate()
  const month = dateRecord.getMonth()+1
  const year = dateRecord.getFullYear()

  return isFocused && selectedVideoKey===videoRecord.recordID?
    <>
    <TouchableOpacity 
    style={styles.container}
    onPress={()=>{
      status.isPlaying? videoRef.current.pauseAsync() : videoRef.current?.playAsync()
    }}>
      <View>
        <Text style={styles.feedText}>{videoRecord.technique} | {videoRecord.position} | {videoRecord.result}</Text>
        <Text >{[day, ' ', month,'-',date, ' ', year ]}</Text>
        <Text>NOTES: {videoRecord.notes}</Text>
        <Text>VIDEO URI{videoRecord.uri}</Text>
        
      </View> 
      <Video
        ref={videoRef}
        style={styles.video}
        source={{uri: videoRecord.uri}}
        // useNativeControls={true}
        positionMillis={videoRecord.timestamp>10000? videoRecord.timestamp -10000: 0}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={true}
        onPlaybackStatusUpdate={(status) => { 
            if(status.positionMillis > endTimeStamp){
                const handleVideoEnd = async()=>{
                await videoRef.current.setPositionAsync(videoRecord.timestamp - 10000)

                }
                handleVideoEnd()
        
                
                // videoRef.current.pauseAsync()
            }
            return setStatus(() => status)
        }
        }
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
      <Divider/>
    </TouchableOpacity>
    </>
  : 

  <>
  <TouchableOpacity
    style={styles.container}
    onPress={()=>{ onSelect()}}
    
    
    >
    <View><Text style={styles.feedText}>{videoRecord.technique} | {videoRecord.position} | {videoRecord.result}</Text><Text >{[day, ' ', month,'-',date, ' ', year ]}</Text><Text>NOTES: {videoRecord.notes}</Text></View>
       
  
  {/* Image will have to be tailored to IOS and Android separately.  Use https://reactnative.dev/docs/images to correc this later */}
  {/* Android */}
  <Image
  source={{uri: `${videoRecord.thumbnailURI}`}}
  style={styles.video}
/>

  {/* IOS */}
  {/* <Image
  source={{uri: 'app_icon'}}
  style={{width: 40, height: 40}}
/> */}
  
  </TouchableOpacity>
  <Divider/>
  </>


}

const styles = StyleSheet.create({
    container:{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10},
    buttons:{flex: 1},
    video: {height: 300, width: 300, justifyContent: 'center', alignItems: 'center'}, 
    feedText:{
      fontSize:24, 
      fontWeight: 'bold'
    }
})