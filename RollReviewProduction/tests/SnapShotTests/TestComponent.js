import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import testComponentChild from './testComponentChild'
import { useState } from 'react'
export default function TestComponent(){
        const [count, setCount] = useState(0)
        const incrementCount = ()=>{setCount(()=>count + 1)}
        
        return (<View>
                    <TouchableOpacity
                        onPress={incrementCount}
                        testID={'incrementCount'}
                    >
                        <Text>incrementCount</Text>
                    </TouchableOpacity>
                    <testComponentChild/>
                    <Text
                    testID={'countDisplay'}
                    >{count}</Text>
                </View>)
}