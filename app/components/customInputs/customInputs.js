// CustomInputs.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInputs = ({ placeholder, value, setValue, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => setValue(text)}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default CustomInputs;
