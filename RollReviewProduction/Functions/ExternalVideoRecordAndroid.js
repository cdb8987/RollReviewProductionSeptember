import { Text, View, Linking } from 'react-native';


import React from 'react';
import Emoji from 'react-native-emoji';

export default function ExternalVideoRecordandroid(props){
    const { position , technique, createdAt, url, notes } = props
    const d = new Date(createdAt)
    
        return (
            <>
            <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15}}>
                <Emoji name="tv" style={{fontSize: 30}} />
                <View style={{justifyContent: 'center', paddingLeft:5}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>VIDEO {[d.getMonth(), '-', d.getDate(), '-',  d.getFullYear()]}</Text>
                
                </View>

            </View>
            <View style={{ paddingLeft: 15}}>
                {/* <Text>{technique.toUpperCase()} from {position.toUpperCase()} </Text> */}
                <Text style={{paddingTop: 5, paddingRight: 15 }}>{['DESCRIPTION: ', notes]}</Text>
                <Text style={{color: 'blue', paddingBottom: 15}}
                    onPress={() => { Linking.openURL(url);console.log(typeof url, url)}}>
                         WATCH
                </Text>
                
            </View>
            
          

            





            </>
        )


}