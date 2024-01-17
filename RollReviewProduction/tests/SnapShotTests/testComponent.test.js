import React from 'react'
import {View, Text} from 'react-native'
import renderer, {act} from 'react-test-renderer';
import TestComponent from './TestComponent.js'
import testComponentChild from './testComponentChild.js'

test('Counter Button Increments by 1', ()=>{
    //Arrange
    const tree = renderer.create(<TestComponent/>)
    const testInstance = tree.root

    const countDisplay = testInstance.findByProps({testID: 'countDisplay'})
    const incrementButton = testInstance.findByProps({testID: 'incrementCount'})
    //check initial state
    expect(countDisplay.props.children).toEqual(0);
    
    // Act
    act(()=>{incrementButton.props.onPress()})
    
    expect(countDisplay.props.children).toEqual(1);
    act(()=>{incrementButton.props.onPress()})
    expect(countDisplay.props.children).toEqual(2);

    expect(tree).toMatchSnapshot()
    
    
    

    //Assert
})
