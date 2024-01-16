import React from 'react'
import {View, Text, FlatList}from 'react-native'
import {retrieveFilteredNotes} from '../Functions/functions.js';
import {useState, useEffect, useContext}from 'react'
import Rollrecord from '../Functions/RollRecord.js';
import Drillrecord from '../Functions/DrillRecord.js';
import { techniqueSelectionContext } from './Contexts/techniqueSelectionContext.js';
import { positionSelectionContext } from './Contexts/positionSelectionContext.js';




export default function NotesScreen (){
    const positionSelection = useContext(positionSelectionContext)
    const techniqueSelection= useContext(techniqueSelectionContext)
    const [notesFeed, setNotesFeed] = useState([])
    useEffect(()=>{async function getData(){ retrieveFilteredNotes(positionSelection,techniqueSelection, setNotesFeed)} getData()
   
        
        }, [positionSelection, techniqueSelection])
    
        const renderJSXitem = (record) => {
            if(record.item.recordType==='drill'){return (
            
            <Drillrecord
                key={record.item.createdAt} 
                position={record.item.position} 
                technique={record.item.technique} 
                rounds={record.item.rounds} 
                notes={record.item.notes} 
                createdAt={record.item.createdAt} 
                recordType={record.item.recordType}
                />
            )
        }; 
            if(record.item.recordType==='roll'){
            return(
            <Rollrecord 
                key={record.item.createdAt} 
                position={record.item.position} 
                technique={record.item.technique} 
                result={record.item.result} 
                notes={record.item.notes} 
                createdAt={record.item.createdAt} 
                recordType={record.item.recordType}
                />
            )
        }
        else{  return <View><Text>Incorrectly formatted.  not finding drill or roll.  </Text></View>}
        }

        return (
            
            <View >
                
                <FlatList
                    
                    horizontal={false}
                    data={notesFeed}
                    keyExtractor={(item, index) => item.recordID}
                    renderItem={renderJSXitem}
                />
                
                {/* <RedPlusFAB style={styles.FAB}
                /> */}
                  
                    
                
            </View>
        )
}
