import React from 'react'
import {useState} from 'react'
import { Button}from 'react-native'
import {TextInput} from 'react-native-paper'


export default function AddTechniqueInputText({handleAdd,techniques, setTechniques, onDismiss}){
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
                    if(newItem && !techniques.includes(newItem)){console.log(text,  'added')
                    handleAdd(techniques, setTechniques, newItem)
                    onDismiss()}
                    
                    else{console.log(newItem, 'already in list'); onDismiss()}
                }}
                title={'ADD'}
                
            ></Button>
            </>

        )
}



