import React from 'react';
import {Text, View} from 'react-native';
import Emoji from 'react-native-emoji';

export default function Rollrecord(props){
    const { position , technique, result, notes, createdAt } = props
    const emoji = (result=='Win')? <Emoji name="white_check_mark" style={{fontSize: 30}} /> : <Emoji name="x" style={{fontSize: 30}} />
    const d = new Date(createdAt)
    // const dateString = `${}`
    const noteDisplay = (notes !== '')? `NOTES:  ${notes}` : null

    return (
        
        <>
        <View style={{flexDirection: 'row'}}>
            {emoji}
            <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{result} {[d.getMonth(), '-', d.getDate(), '-',  d.getFullYear()]}</Text>
            
            </View>
  
        </View>
        <View >
            <Text style={{textTransform: 'uppercase'}}>{position} via {technique}</Text>
            <Text style={{paddingTop: 5, paddingBottom: 15, paddingLeft: 15, paddingRight: 15}}>{noteDisplay}</Text>
        </View>
        </>
    )


}


