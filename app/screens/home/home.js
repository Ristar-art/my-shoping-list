import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const image = {
  uri: 'https://images.pexels.com/photos/5875032/pexels-photo-5875032.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

const CustomButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const CustomComponent = ({ text }) => (
  <View style={styles.component}>
    <Text style={styles.componentText}>{text}</Text>
  </View>
);

export default function Home({ navigation }) {
  const onSignInPressed = () => {
    // Navigate to the login screen
    navigation.navigate('LogIn');
  };

  useEffect(() => {
    // Fetch the access token from storage (or wherever you store it after login)
    const storedAccessToken = 'YOUR_STORED_ACCESS_TOKEN';
    if (!storedAccessToken) {
      // If the access token is not available, navigate to the login screen
      navigation.navigate('LogIn');
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.main}>
          <CustomComponent text="Support us by buying the merchandise" />
          <CustomButton text="Sign in" onPress={onSignInPressed} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  component: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  componentText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
