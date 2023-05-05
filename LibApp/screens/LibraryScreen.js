import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../App';
import { View, Text, FlatList } from 'react-native';

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
        <Text style={{ fontSize: 16 }}>Your library is empty.</Text>
      )}
    </View>
  );
}