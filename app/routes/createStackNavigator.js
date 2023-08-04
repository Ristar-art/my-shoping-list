import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screens/login/logIn'; 
import Home from '../screens/home/home';
import SignUp from '../screens/signUp/signUp';
import List from '../screens/list/list';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="List" component={List} options={{ headerShown: false }} />        
    </Stack.Navigator>
  );
};

export default AppNavigator;