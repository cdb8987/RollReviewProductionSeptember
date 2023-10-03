import React from "react";
import {View, FlatList, StyleSheet} from 'react-native';
import {useState, useEffect, useContext} from 'react'
import VideoPlayback from './VideoPlayback'
import {getData} from '../Functions/functions'
import { useIsFocused } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SetVideoCameraScreenSelected } from "./Contexts/SetVideoCameraScreenSelected";

export default function RollReviewScreen(){
    const isFocused = useIsFocused()
    const setvideoCameraScreenSelected=useContext(SetVideoCameraScreenSelected)

    useEffect(()=>{
    async function lockScreenOrientationtoPortrait(){
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
     setvideoCameraScreenSelected(false)
    }  
    if(isFocused){lockScreenOrientationtoPortrait()}
  }, [isFocused])
    const [selectedVideoKey, setSelectedVideoKey] = useState(null)
    
    const [videos, setVideos] = useState()
   
    
    useEffect(()=>{const getURIs = async ()=>{
        const LocalVideoHistory = await getData('LocalVideoHistory');

   
        const FullVideosArray = []
        for(let i of LocalVideoHistory.data){
            if(i.recordType==='localVideoFull'){
                FullVideosArray.push(i)
            }
        }
        
        setVideos(FullVideosArray);
         }; 
         getURIs()
        }, [isFocused])
    
    
    
   

    const renderVideoCard = (item) => {return <VideoPlayback  
        videoRecord={item.item}
        selectedVideoKey={selectedVideoKey}
        onSelect={()=>{setSelectedVideoKey(item.item.recordID)}}
         
        isFocused={isFocused}/>}
    
    return (

        
        <View style={{flex: 1}}>
            
            {/* {videoCards} */}
            <FlatList
            
                horizontal={false}
                data={videos}
                keyExtractor={(item, index) => {return item.recordID}}
                renderItem={renderVideoCard}
            />
            
            
              
                
            
        </View>
    )
}

const styles = StyleSheet.create({
    FAB: {
        position: 'absolute',
        marginRight: 100
    }
})