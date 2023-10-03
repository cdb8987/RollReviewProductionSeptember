import {
    Appbar,
    DarkTheme,
    DefaultTheme,
    Provider,
    Surface,
    ThemeProvider,
  } from "react-native-paper";
  import React, { useState, useMemo } from "react";
  import { StyleSheet } from "react-native";
  import DropDown from "react-native-paper-dropdown";
  
  function DropdownMultipleSelect({inputOptions, labelName, onSelectCallback}) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [selection, setSelection] = useState('');
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    
    const options = useMemo(
        () => {return [ ...['--None--'],...[...inputOptions].sort()].map((option)=> {if(option==='--None--'){return {label: option, value: '', key: option}}return {label: option, value: option, key: option}}) 
        },
        []
      );

    const setValueFunction = (value)=> {setSelection(value), onSelectCallback(value)}

    
  
    return (
          <>
              <DropDown
                label={labelName}
                mode={"outlined"}
                visible={showMultiSelectDropDown}
                showDropDown={() => setShowMultiSelectDropDown(true)}
                onDismiss={() => setShowMultiSelectDropDown(false)}
                value={selection}
                setValue={setValueFunction}
                list={options}
                multiSelect
              />
            
      </>
    );
  }
  
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      flex: 1,
      margin: 20,
      justifyContent: "center",
    },
  });
  
  export default DropdownMultipleSelect;