import React from "react";
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useState, useEffect, useRef, useContext} from 'react'
import VideoPlayback from './VideoPlayback'
import {getData} from '../Functions/functions'
import ClippedVideoPlayback from "./ClippedVideoPlayback";
import { useIsFocused } from '@react-navigation/native';
import { techniqueSelectionContext } from './Contexts/techniqueSelectionContext.js';
import { positionSelectionContext } from './Contexts/positionSelectionContext.js';
import DropdownSingleSelect from "./DropdownSingleSelect";






export default function RollingScreen(){
    const isFocused = useIsFocused()
    const [videos, setVideos] = useState()
    const flatListRef = useRef(null);
    const positionSelection = useContext(positionSelectionContext)
    const techniqueSelection= useContext(techniqueSelectionContext)
    const [selectedVideoKey, setSelectedVideoKey] = useState(null)
    const [videoPlaybackChildUpdated, setVideoPlaybackChildUpdated] = useState(false)
    
    const resultOptions = ['Improved Position', 'Lost Position', 'Attempted Submission', 'Defended Submission', 'Win', 'Loss']
    const [resultSelection, setResultSelection] = useState('')
    
    useEffect(()=>{const getURIs = async ()=>{
        const LocalVideoHistory = await getData('LocalVideoHistory');

  
      const clipsArray = []
      for(let i of LocalVideoHistory.data){
          
        if(i.recordType==='localVideoClip' ){
            try{
            
            if(!positionSelection && !techniqueSelection){
                
                    clipsArray.push(i)   
                
            }
            
            else if(positionSelection && !techniqueSelection){
                
                    if(i.position == positionSelection){
                        clipsArray.push(i)
                    }
                
            }
            else if(techniqueSelection && !positionSelection){
                
                    if(i.technique == techniqueSelection){
                        clipsArray.push(i)
                    }
                
            }
            else if(techniqueSelection && positionSelection){
                
                    if(i.position == positionSelection){
                        if(i.technique == techniqueSelection){
                            clipsArray.push(i)
                        }    
                    }
                
            }
            else{console.log('NOT ADDED:  ', i)}
            
            }
            catch(error){console.log('line 70 ROllingScreen.js', error)}
        }
      }
      clipsArray.reverse()
      if(resultSelection === ''){setVideos(clipsArray)}
      else{const filteredClipsArray = clipsArray.filter(x=>x.result === resultSelection); setVideos(filteredClipsArray)}
      
    
      
      
         }; 
         getURIs()
        }, [isFocused, positionSelection,techniqueSelection, resultSelection, videoPlaybackChildUpdated])

    const renderVideoClipCard =(item) => {return <ClippedVideoPlayback   
    duration={15000} 
    videoRecord={item.item}
    selectedVideoKey={selectedVideoKey}
    onSelect={()=>{ setSelectedVideoKey(item.item.recordID)}}
    isFocused={isFocused}
    videoPlaybackChildUpdated={videoPlaybackChildUpdated}
    setVideoPlaybackChildUpdated={setVideoPlaybackChildUpdated}
    />}

    return (

        
        <View style={{flex: 1}}>
            
            <DropdownSingleSelect 
                style={styles.dropdown}
                inputOptions={resultOptions} 
                labelName={'Filter Events'} 
                onSelectCallback={setResultSelection}/>

            <FlatList
                ref={flatListRef}
            
                horizontal={false}
                data={videos}
                keyExtractor={(item, index) => {return item.recordID}}
                renderItem={renderVideoClipCard}
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