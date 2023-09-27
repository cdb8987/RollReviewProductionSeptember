import React from 'react'
import InputDrillModal from './InputDrillModal';
import InputRollModal from './InputRollModal'
import InputTutorialModal from './InputTutorialModal'
import InputLocalVideoModal from './InputLocalVideoModal'
import RedPlusFAB from '../RedPlusFAB';
import {useState}from 'react'

export default function ModalContainer(){
    
    
    const [InputDrillModalVisible, setInputDrillModalVisible] = useState(false)
    const [InputRollModalVisible, setInputRollModalVisible] = useState(false)
    const [InputLocalVideoModalVisible, setLocalVideoModalVisible] = useState(false)
    const [InputTutorialModalVisible, setInputTutorialModalVisible] = useState(false)
    const [FABVisible, setFABVisible] = useState(true)
    
    return (
      <>
        <InputDrillModal 
            visible={InputDrillModalVisible}
            setVisible={setInputDrillModalVisible}
            

            />
          
        <InputRollModal 
            visible={InputRollModalVisible}
            setVisible={setInputRollModalVisible}
            

          />
          
        <InputLocalVideoModal 
            visible={InputLocalVideoModalVisible}
            setVisible={setLocalVideoModalVisible}
            

          />
          
        <InputTutorialModal 
            visible={InputTutorialModalVisible}
            setVisible={setInputTutorialModalVisible}
            
          />
         
          
        <RedPlusFAB 
          visible={FABVisible}
          style={{
            position: 'absolute',
            marginRight: 10, 
            marginBottom: 110
          }}
          setInputDrillModalVisible={setInputDrillModalVisible}
          setInputRollModalVisible={setInputRollModalVisible}
          setLocalVideoModalVisible={setLocalVideoModalVisible}
          setInputTutorialModalVisible={setInputTutorialModalVisible}

          />
      </>
    )
}

        