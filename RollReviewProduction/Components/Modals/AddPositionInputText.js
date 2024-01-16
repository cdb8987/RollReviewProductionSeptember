
import React from 'react'
import {useState} from 'react'
import { Button, View}from 'react-native'
import {TextInput} from 'react-native-paper'


export default function AddPositionInputText({handleAdd,positions, setPositions, onDismiss }){

        const [text, setText] = useState('')
        

        return (
            <>
            <TextInput
                style={{height: 40, flex: 1, backgroundColor: 'white'}}
                placeholder="..."
                onChangeText={(newText) => {setText(newText)}}
                defaultValue={text}
                outlined={true}
                />
            <Button 
                style={{marginTop: 15}}
                compact={true} 
                mode={'contained'} 
                onPress={()=>{
                    const newItem = text.charAt(0).toUpperCase()+text.slice(1)
                    if(newItem && !positions.includes(newItem)){
                    handleAdd(positions, setPositions, newItem)
                    onDismiss()}
                    
                    else{ onDismiss()}
                }}
                title={'ADD'}
                
            ></Button>
            </>

        )

        
}



