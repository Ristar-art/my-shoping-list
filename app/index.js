// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './screens/login/loginSlice';
import signUpReducer from './screens/signUp/signUpSlice';
import AppNavigator from './routes/createStackNavigator'; 
const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
    // Add other reducers if you have them
  },
});

export default function App() {
  return (
    <Provider store={store}>  
      <AppNavigator/>     
    </Provider>
  );
}
