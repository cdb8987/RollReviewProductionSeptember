import React from "react"
import {View, Text, StyleSheet}from 'react-native'

export default function Dashboardheader(){
    return (
        <>
        <View style={styles.OuterContainer} >
            <View style={styles.LeftContainer}>
                <Text>Profile Image Goes Here</Text>
            </View>
            <View style={styles.MiddleContainer}>
                <Text>MiddleBar goes here</Text>
            </View>
            <View style={styles.RightContainer}>
                <Text>Notifications goes here</Text>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    OuterContainer: {
        flex: 1,
        flexDirection: 'row',
        borderStyle: 'solid', 
        borderWidth: 1
    }, 
    LeftContainer: {
        flex: 2, 
        borderStyle: 'solid', 
        borderWidth: 1 
    }, 
    MiddleContainer: {
        flex: 6, 
        borderStyle: 'solid', 
        borderWidth: 1 
    }, 
    RightContainer: {
        flex: 2, 
        borderStyle: 'solid', 
        borderWidth: 1 
    }, 



})