import React from 'react'
import {View, Text} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';

import AppBanner from '../Components/AppBanner';

export default function MoreTab(){
  async function lockScreenOrientationtoPortrait() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  console.log('orientation locked')
}
  lockScreenOrientationtoPortrait()
    return (
      <>
      <AppBanner/>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>More</Text>
      </View>
      </>
    )
  }