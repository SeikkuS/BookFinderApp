import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseApp } from '../App'; // import firebaseApp from App.js
import { View, Text, FlatList } from 'react-native';

// Create a Firestore instance using firebaseApp
const db = getFirestore(firebaseApp);

export default function LibraryScreen() {
  const [libraryData, setLibraryData] = useState([]);

  useEffect(() => {
    
    const fetchLibraryData = async () => {
      const libraryRef = collection(db, 'library');
      const librarySnap = await getDocs(libraryRef);
      const libraryData = librarySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLibraryData(libraryData);
    };
    fetchLibraryData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <Text style={{ fontSize: 14 }}>{item.author}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>My Library</Text>
      {libraryData.length > 0 ? (
        <FlatList
          data={libraryData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />
      ) : (
        <Text>You don't have any books in your library.</Text>
      )}
    </View>
  );
}