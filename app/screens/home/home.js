import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, View, Dimensions, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/customButtons/customButtons';
import CustomComponent from '../../components/customComponrnts/customComponents';

const { width, height } = Dimensions.get('window');
const image = {  
  uri: 'https://images.pexels.com/photos/5875032/pexels-photo-5875032.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

export default function Home({ navigation }) {
  const [shoppingList, setShoppingList] = useState([]);
  const [item, setItem] = useState('');

  const onSignInPressed = () => {
    // validate user
    navigation.navigate('LogIn');
  };

  const addItemToList = () => {
    if (item.trim() !== '') {
      setShoppingList([...shoppingList, item.trim()]);
      setItem('');
    }
  };

  const deleteItemFromList = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.main}>
          <CustomComponent text="Support us by buying the merchandise" />
          <CustomButton text="Get Started" onPress={onSignInPressed} />
        </View>
        <View style={styles.shoppingListContainer}>
          <Text style={styles.shoppingListHeader}>Shopping List:</Text>
          <FlatList
            data={shoppingList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.shoppingListItemContainer}>
                <Text style={styles.shoppingListItem}>{item}</Text>
                <TouchableOpacity onPress={() => deleteItemFromList(index)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter an item..."
            value={item}
            onChangeText={setItem}
            onSubmitEditing={addItemToList}
          />
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
  shoppingListContainer: {
    flex: 1,
    padding: 16,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  shoppingListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  shoppingListItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  shoppingListItem: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
