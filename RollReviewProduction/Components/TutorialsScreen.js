import React from "react";
import {View, FlatList, StyleSheet} from 'react-native';
import {useState, useContext, useEffect}from 'react'
import { techniqueSelectionContext } from './Contexts/techniqueSelectionContext.js';
import { positionSelectionContext } from './Contexts/positionSelectionContext.js';
import {retrieveFilteredTutorials} from '../Functions/functions.js';
import TutorialPlayback from "./TutorialPlayback";
import { useIsFocused } from '@react-navigation/native'

export default function TutorialsScreen(){
    const positionSelection = useContext(positionSelectionContext)
    const techniqueSelection= useContext(techniqueSelectionContext)
    const [tutorialsFeed, setTutorialsFeed] = useState([])
    const isFocused = useIsFocused()
    const [selectedVideoKey, setSelectedVideoKey] = useState(null)
    
    
    useEffect(()=>{async function getData(){ retrieveFilteredTutorials(positionSelection,techniqueSelection, setTutorialsFeed)} getData(); 
        
        
        }, [positionSelection, techniqueSelection])
        
    const renderVideoCard = (item) => {
        const isYoutubeVideo = ()=>{
            try{return item.item.url.includes('youtu.be')}
            catch{return false}
        }

        
        
        if(isYoutubeVideo()){
            const youtubeVideoCode = item.item.url.substring(item.item.url.indexOf('youtu.be')+9, item.item.url.indexOf('youtu.be')+20)
            
            return (<TutorialPlayback
                youtubevideoId={youtubeVideoCode}
                thumbNailURL={item.item.YoutubeThumbNailURL}
                technique={item.item.technique}
                position={item.item.position}
                notes={item.item.notes}
                videoRecord={item.item}
                selectedVideoKey={selectedVideoKey}
                onSelect={()=>{console.log('selectedVideo?.item.recordID', selectedVideoKey,'item.item.recordID', item.item.recordID ); setSelectedVideoKey(item.item.recordID)}}
                isFocused={isFocused}
            />)   

            
            
            ;
        }}
        
 
    return (
        
        <View >
            
            <FlatList
                
                horizontal={false}
                data={tutorialsFeed}
                keyExtractor={(item, index) => item.recordID}
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