import React from "react";
import {act} from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddPositionInputText from '../../Components/Modals/AddPositionInputText.js'
import AddTechniqueInputText from '../../Components/Modals/AddTechniqueInputText.js'
// import EventTaggingModal from '../../Components/Modals/EventTaggingModal.js'
import InputDrillModal from '../../Components/Modals/InputDrillModal.js'
// import InputLocalVideoModal from '../../Components/Modals/InputLocalVideoModal.js'
// import InputRollModal from '../../Components/Modals/InputRollModal.js'
// import InputTutorialModal from '../../Components/Modals/InputTutorialModal.js'
// import ModalContainer from '../../Components/Modals/ModalContainer.js'
// import Notesinput from '../../Components/Modals/Notesinput.js'  


import { Button}from 'react-native'
import {TextInput} from 'react-native-paper'
import { SetPositionsContext } from "../../Components/Contexts/SetPositionsContext.js";
import { SetTechniquesContext } from "../../Components/Contexts/SetTechniquesContext.js";
import { techniqueSelectionContext } from "../../Components/Contexts/techniqueSelectionContext.js";
import { positionSelectionContext } from "../../Components/Contexts/positionSelectionContext.js";



jest.mock('./SetPositionsContext');
jest.mock('./SetTechniquesContext');
jest.mock('./techniqueSelectionContext');
jest.mock('./positionSelectionContext');




// //Checks Shallow Rendered Snapshot for AddPositionInputText.js
// test('Shallow Render matches snapshot: AddPositionInputText',  () => {
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<AddPositionInputText 
//     />);
    
//     expect(tree).toMatchSnapshot();
    
// });

// //Checks Shallow Rendered Snapshot for AddTechniqueInputText.js
// test('Shallow Render matches snapshot: AddTechniqueInputText',  () => {
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<AddTechniqueInputText 
//     />);
    

//     expect(tree).toMatchSnapshot();
    
// });

// //Checks Shallow Rendered Snapshot for EnterURLInputbox.js
// test('Shallow Render matches snapshot: EnterURLInputbox',  () => {
    
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<EventTaggingModal 
//     />);
    

//     expect(tree).toMatchSnapshot();
    
// });

//Checks Shallow Rendered Snapshot for InputDrillModal.js


test('Shallow Render matches snapshot: InputDrillModal',  () => {
    
    SetPositionsContext.mockReturnValue({
    setPositions: jest.fn(), 
  });
    SetTechniquesContext.mockReturnValue({
    SetTechniquesContext: jest.fn(), 
  });
    techniqueSelectionContext.mockReturnValue({
    techniqueSelectionContext: '', 
    });

    positionSelectionContext.mockReturnValue({
    positionSelectionContext: '', 
  });





    const renderer = new ShallowRenderer()
    const tree = renderer.render(<InputDrillModal 
    />);
    

    expect(tree).toMatchSnapshot();
    
});

// //Checks Shallow Rendered Snapshot for InputLocalVideoModal.js
// test('Shallow Render matches snapshot: InputLocalVideoModal',  () => {
    
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<InputLocalVideoModal 
//     />);
    

//     expect(tree).toMatchSnapshot();
    
// });

// //Checks Shallow Rendered Snapshot for InputRollModal.js
// test('Shallow Render matches snapshot: InputRollModal',  () => {
    
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<InputRollModal 
//     />);
    

//     expect(tree).toMatchSnapshot();
    
// });

// //Checks Shallow Rendered Snapshot for InputTutorialModal.js
// test('Shallow Render matches snapshot: InputTutorialModal',  () => {
    
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<InputTutorialModal 
//     />);
    

//     expect(tree).toMatchSnapshot();
    
// });

// //Checks Shallow Rendered Snapshot for ModalContainer.js
// test('Shallow Render matches snapshot: ModalContainer',  () => {
    
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<ModalContainer 
//     />);
    

//     expect(tree).toMatchSnapshot();
    
// });

// //Checks Shallow Rendered Snapshot for Notesinput.js
// test('Shallow Render matches snapshot: Notesinput',  () => {
    
//     const renderer = new ShallowRenderer()
//     const tree = renderer.render(<Notesinput 
//     />);
    

//     expect(tree).toMatchSnapshot();
    
// });