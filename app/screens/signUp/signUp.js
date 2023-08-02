import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/customInputs/customInputs';
import CustomButton from '../../components/customButtons/customButtons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setName,
  setEmail,
  setPassword,
  setPasswordRepeat,
  setLoading,
  setError,
  clearError,
  clearForm,
} from './signUpSlice'; 
export default function SignUp() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { name, email, password, passwordRepeat, isLoading, error } = useSelector(
    (state) => state.signUp
  );

  const onRegisterPressed = () => {
    navigation.navigate('LogIn');
  };

  const onSignInPress = () => {
    navigation.navigate('LogIn');
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    // Set isLoading to true to show loading spinner or disable the button
    dispatch(setLoading(true));

    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, 
          email,
          password,
          passwordRepeat,
        }),
      });

      // Check the status code of the response
      if (response.status === 200) {
        // The response is successful, continue with your logic here
        const data = await response.json();
        console.log(data);
        // Dispatch the actions to update the state
        dispatch(setLoading(false));
        dispatch(clearError());
        dispatch(clearForm());
      } else {
        // The response is not successful, handle the error
        const errorData = await response.json();
        dispatch(setLoading(false));
        dispatch(setError(errorData.message)); // Replace 'message' with the correct error property from the API response
      }
    } catch (error) {
      // Handle other errors, e.g., network error
      console.error('Error during fetch:', error);
      dispatch(setLoading(false));
      dispatch(setError('An error occurred while registering. Please try again later.'));
    }
  };

  return (
    
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
          <View>
            <CustomInput
              placeholder="Username"
              value={name}
              setValue={(value) => dispatch(setName(value))}
            />
            <CustomInput
              placeholder="Email"
              value={email}
              setValue={(value) => dispatch(setEmail(value))}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              setValue={(value) => dispatch(setPassword(value))}
              secureTextEntry
            />
            <CustomInput
              placeholder="Repeat Password"
              value={passwordRepeat}
              setValue={(value) => dispatch(setPasswordRepeat(value))}
              secureTextEntry
            />
            <CustomButton text="Register" onPress={handleRegister} />
          </View>
          <CustomButton
            text="Have an account? Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});
