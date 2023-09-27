import * as React from 'react';
import { FAB, Portal, PaperProvider  } from 'react-native-paper';
import {StyleSheet} from 'react-native'
import {BottomNavigationHeightContext} from './Contexts/BottomNavigationHeightContext';
import { useContext, useState } from 'react';
import InputDrillModal from './Modals/InputDrillModal';

const RedPlusFAB = ({
  style, 
  visible, 
  setInputDrillModalVisible,
  setInputRollModalVisible,
  setLocalVideoModalVisible, 
  setInputTutorialModalVisible
}) => {
  
  
  
  
  
  
  const FABPadding = useContext(BottomNavigationHeightContext)
  // const FABPadding = BottomNavigationBar.currentHeight
  
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  

  return (
    //style={styles.OuterContainer} layered={true}
      <Portal >
      
        <FAB.Group
          open={open}
          visible={visible}
          style={style}
          // icon={open ? 'calendar-today' : 'plus'}
          icon={'plus'}
          actions={[
            // { icon: 'video-plus', 
            // label: ' Video',
            // onPress: () => setLocalVideoModalVisible(true) },
            
            {
              icon: 'kabaddi',
              label: 'Roll',
              onPress: () => setInputRollModalVisible(true),
            },
            {
              icon: 'youtube',
              label: 'Tutorial',
              onPress: () => setInputTutorialModalVisible(true),
            },
            {
              icon: 'note',
              label: 'Drill',
              onPress: () => setInputDrillModalVisible(true),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
      
    
  );
};

export default RedPlusFAB;

const styles = StyleSheet.create({
  OuterContainer: {
      flex: 2,

  }
})