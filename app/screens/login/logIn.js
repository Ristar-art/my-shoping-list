import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomInputs = ({ placeholder, value, setValue, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
    />
  );
};

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

export default function LogIn({ navigation }) {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  async function handleLogin() {
    // Your login logic here

    // For demonstration purposes, I'm just setting a dummy isLoggedIn value to true after login
    const isLoggedIn = true;

    if (isLoggedIn) {
      alert('Login successful');
      navigation.navigate('Home'); // Navigate to Home page after successful login
    } else {
      alert('Please check your username and password');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <CustomInputs placeholder="user name" value={name} setValue={setUsername} />
        <CustomInputs
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Sign In" onPress={handleLogin} />
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
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
