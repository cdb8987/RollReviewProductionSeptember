import React from "react";
import {act} from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddPositionInputText from '../../Components/Modals/AddPositionInputText.js'
import { Button}from 'react-native'
import {TextInput} from 'react-native-paper'



test('renders AddPositionInputText snapshot',  () => {
    const handleAdd = jest.fn()
    const setPositions = jest.fn()
    const onDismiss = jest.fn()
    
    const renderer = new ShallowRenderer()
    const tree = renderer.render(<AddPositionInputText 
        handleAdd={handleAdd}
        positions={["Back Control", "Durkaposition", "Guard", "Mount", "Neweventposition", "Newposition", "Newposition2", "Newposition3", "Newposition4", "Newposition5", "Newposition6", "Newrollposition", "Newtutorialposition", "Productionposition", "Side Control", "Testytreest"]}
        setPositions={setPositions}
        onDismiss={onDismiss}
    />);

    expect(tree).toMatchSnapshot();
    
});