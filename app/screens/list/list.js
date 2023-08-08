import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';


const image = {
  uri: 'https://images.pexels.com/photos/5875032/pexels-photo-5875032.jpeg?auto=compress&cs=tinysrgb&w=1600',
};
const List = ({ route }) => {
  const [data, setData] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const { accessToken } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.19:8000/api/user-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        setData(data.shoppingList);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Failed to connect to the server');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {editItemId === item._id ? (
        <>
          <TextInput
            style={styles.editInput}
            value={newItemName}
            onChangeText={setNewItemName}
          />
          <TextInput
            style={styles.amountText}
            value={newItemAmount}
            onChangeText={setNewItemAmount}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveEdit(item._id)}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.amount}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item._id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item._id)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const startEdit = (itemId) => {
    const selectedItem = data.find(item => item._id === itemId);
    setEditItemId(itemId);
    setNewItemName(selectedItem.name);
    setNewItemAmount(selectedItem.amount);
  };

  const saveEdit = async (itemId) => { 
    try {
      const response = await fetch(`http://192.168.1.19:8000/api/edit-item/${itemId}`,  {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          newItemName: newItemName,
          newItemAmount: newItemAmount,
        }),
      });

      if (response.ok) {
        fetchData();
        setEditItemId(null);
        setNewItemName('');
        setNewItemAmount('');
      } else {
        console.error('Failed to save edit');
      }
    } catch (error) {
      console.error('Failed to connect to the server');
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://192.168.1.19:8000/api/delete-item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to connect to the server');
    }
  };

  const addItem = async () => {
    try {
      if (!newItemName.trim() || !newItemAmount.trim()) {
        alert('Item name and amount cannot be empty');
        return;
      }

      if (/[\\/]/.test(newItemName) || /[\\/]/.test(newItemAmount)) {
        alert('Item name and amount cannot contain / or \\ characters');
        return;
      }

      const response = await fetch('http://192.168.1.19:8000/api/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          itemName: newItemName,
          itemAmount: newItemAmount,
        }),
      });

      if (response.ok) {
        fetchData();
        setNewItemName('');
        setNewItemAmount('');
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      alert('Failed to connect to the server');
    }
  };

  return (
    <View>
<ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
     
     
      <FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item, index) => index.toString()}
/>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={newItemAmount}
          onChangeText={setNewItemAmount}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
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
  editInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    right: 3,
    position: 'absolute',
    zIndex: 2,
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    right: 65,
    position: 'absolute',
    zIndex: 2,
  },
  editButtonText: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
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
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-end', 
    position: 'absolute',
   
  },
});

export default List;
