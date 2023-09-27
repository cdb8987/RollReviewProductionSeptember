import React from 'react'
import {Image, Dimensions, View} from 'react-native'
export default function AppBanner(){
    return (
        <View style={{alignItems: 'center' }}>
            <Image
            source={require('../assets/RollReview2.png')}
            style={{width: Dimensions.get('window').width}}/>
        </View>
    )
    
}