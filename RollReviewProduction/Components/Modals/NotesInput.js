import { TextInput } from 'react-native';
import React, { useState } from "react";


export default function Notesinput(props){
    const {updateNotes} = props
    const [text, setText] = useState('');
    updateNotes(text)
    return (
        <TextInput
            style={{height: 120, flex: 1}}
            placeholder="Enter Notes Here"
            onChangeText={(newText) => {setText(newText)}}
            defaultValue={text}
            multiline={true}


        />
    )
}