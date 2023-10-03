import React from 'react'

import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {Divider} from 'react-native-paper'
import YoutubePlayer from 'react-native-youtube-iframe';



export default function TutorialPlayback({youtubevideoId, thumbNailURL, technique, position, notes, videoRecord, selectedVideoKey, onSelect, isFocused}){
    
    
    



    return isFocused && selectedVideoKey===videoRecord.recordID?

        <>
        
        <View style={{flex: 1}}>
        <Text style={styles.feedText} > {technique} | {position}</Text><Text style={{alignContent:"center", justifyContent: 'center'}}>NOTES: {notes}</Text>
          
          
            <YoutubePlayer
            height={300}
            play={true}
            videoId={youtubevideoId}
            
            />
        </View>
        </>

        :
        

        <TouchableOpacity
    style={styles.container}
    onPress={()=>{onSelect()}}
    
    
    >
      
      <View><Text style={styles.feedText} > {technique} | {position}</Text><Text>NOTES: {notes}</Text></View>
  
  {/* Image will have to be tailored to IOS and Android separately.  Use https://reactnative.dev/docs/images to correc this later */}
  {/* Android */}
 
  <Image
    source={{uri: `${thumbNailURL}`}}
    style={styles.video}
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
    video: {height: 300, width: "100%", justifyContent: 'center', alignItems: 'center'}, 
    feedText:{
      fontSize:24, 
      fontWeight: 'bold' 
      

    }
})