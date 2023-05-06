import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../App';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Create a Firestore instance using firebaseApp
const db = getFirestore(firebaseApp);

export default function LibraryScreen() {
  const [libraryData, setLibraryData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchLibraryData = async () => {
      const libraryRef = collection(db, 'library');
      const librarySnap = await getDocs(libraryRef);
      const libraryData = librarySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLibraryData(libraryData);
    };
    fetchLibraryData();
  }, []);

  const toggleFavorite = async (item) => {
    const bookRef = doc(db, 'library', item.id);
    await updateDoc(bookRef, { favorite: !item.favorite });
    const updatedLibraryData = [...libraryData];
    const index = updatedLibraryData.findIndex((book) => book.id === item.id);
    updatedLibraryData.splice(index, 1);
    item.favorite = !item.favorite;
    if (item.favorite) {
      updatedLibraryData.unshift(item);
    } else {
      updatedLibraryData.push(item);
    }
    setLibraryData(updatedLibraryData);
    toggleFavorites(item.id);
  };

  const toggleFavorites = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite) => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const isFavorite = (id) => favorites.includes(id);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#2E3440",
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      activeOpacity={0.7}
      onPress={() => console.log(item)}
    >
      <View style={{ marginRight: 16 }}>
        <Text style={{ color: "#D8DEE9", fontSize: 18 }}>{item.title}</Text>
        <Text style={{ color: "#81A1C1", fontSize: 14, marginTop: 4 }}>
          By: {item.authors}
        </Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        {item.favorite ? (
          <Icon name="star" size={24} color="#BD93F9" />
        ) : (
          <Icon name="star-o" size={24} color="#D8DEE9" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ 
      flex: 1, 
      padding: 10, 
      backgroundColor: '#3B4252' 
    }}>
      <Text style={{ 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10,
        color: '#ECEFF4' 
      }}>My Library</Text>
      {libraryData.length > 0 ? (
        <FlatList
          data={libraryData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />
      ) : (
        <Text style={{ color: '#ECEFF4' }}>You don't have any books in your library.</Text>
      )}
    </View>
  );
}