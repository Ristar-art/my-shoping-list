// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ text, onPress, type }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (type === 'TERTIARY') {
    buttonStyles.push(styles.tertiaryButton);
    textStyles.push(styles.tertiaryText);
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue', // Change the color as per your requirement
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white', // Change the text color as per your requirement
    fontSize: 16,
    fontWeight: 'bold',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderColor: 'blue', // Change the border color as per your requirement
    borderWidth: 2,
  },
  tertiaryText: {
    color: 'blue', // Change the text color for tertiary button
  },
});

export default CustomButton;
