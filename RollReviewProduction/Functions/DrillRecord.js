import React from 'react';
import {Text, View} from 'react-native';
import { Entypo } from '@expo/vector-icons';



export default function Drillrecord(props){
    const { position , technique, rounds, notes, createdAt} = props
    
    const d = new Date(createdAt)
    const noteDisplay = (notes !== '')? `NOTES:  ${notes}` : null
    // return (
        
    //     <>
    //     <View >
    //         <Text >Drill Notes {createdAt}</Text>
            
    //     </View>
    //     <View>
    //         <Text>{rounds} rounds from {position} via {technique}</Text>
    //         <Text>NOTES:  {notes}</Text>
    //     </View>
    //     </>
    // )

        return (
    <>
    <View style={{flexDirection: 'row'}}>
        {/* <Emoji name="man-lifting-weights" style={{fontSize: 30}} /> */}
        <Entypo name="open-book" size={24} color="black" />

        <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>DRILLING {[d.getMonth(), '-', d.getDate(), '-',  d.getFullYear()]}</Text>
        
        </View>

    </View>
    <View >
        <Text style={{textTransform: 'uppercase'}}>{rounds} ROUNDS {technique} from {position} </Text>
        <Text style={{paddingTop: 5, paddingBottom: 15, paddingLeft: 15, paddingRight: 15 }}>{noteDisplay}</Text>
    </View>
    </>
        )

}