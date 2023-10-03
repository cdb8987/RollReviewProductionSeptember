import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDown from "react-native-paper-dropdown";

function DropdownSingleSelect({ inputOptions, labelName, onSelectCallback }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selection, setSelection] = useState("");
  const options = [...["--None--"], ...[...inputOptions]].sort().map((option) => {
    if (option === "--None--") {
      return { label: option, value: "", key: option };
    }
    return {
      label: option,
      value: option,
      key: option,
    };
  });

  const setValueFunction = (value) => {
    setSelection(value), onSelectCallback(value);
  };


 
  return (
    <>
      <DropDown
        label={labelName}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={selection}
        setValue={setValueFunction}
        list={options}
        style={{ flex: 1 }}
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

export default DropdownSingleSelect;
