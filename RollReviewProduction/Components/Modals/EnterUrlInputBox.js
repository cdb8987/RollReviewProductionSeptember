import {  TextInput} from 'react-native';
import React, { useState } from "react";


export default function EnterURLInputbox(props){
    const {updateVideoURL} = props
    const [text, setText] = useState('');
    updateVideoURL(text)
    return (
        <TextInput
            style={{height: 40, flex: 1, backgroundColor: 'white'}}
            placeholder="Enter Video URL Link Here ..."
            onChangeText={(newText) => {setText(newText)}}
            defaultValue={text}
        />
    )
}