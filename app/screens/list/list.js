import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const List = ({ route }) => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState(''); // State to hold the new item to be added
  const { accessToken } = route.params; // Get the accessToken from the route parameters

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch the data from the server using the user's access token over HTTPS
      const response = await fetch('http://localhost:8000/api/user-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        setData(data.shoppingList); // Assuming the shoppingList data is in the 'data' property
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Failed to connect to the server');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  
const addItem = async () => {
  try {
    if (!newItem.trim()) {
     alert('Item cannot be empty');
      return;
    }

    if (/[\\/]/.test(newItem)) {
      alert('Item cannot contain / or \\ characters');
      return;
    }

    const response = await fetch('http://localhost:8000/api/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        item: newItem,
      }),
    });

    if (response.ok) {
      fetchData(); // Fetch the updated data after adding the item
      setNewItem(''); // Clear the input field after adding the item
    } else {
      alert('Failed to add item');
    }
  } catch (error) {
   alert('Failed to connect to the server');
  }
};
  

  const deleteItem = async (item) => {
    try {
      const response = await fetch(`http://localhost:8000/api/delete-item/${item}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        fetchData(); // Fetch the updated data after deleting the item
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to connect to the server');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use the index as key for simplicity
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default List;
