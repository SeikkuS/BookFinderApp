import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../App';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { addBookToLibrary } from "../dbFunctions";
// API KEY 
const API_KEY = 'AIzaSyBMTdJFDO3m2t1TzCXjTHMjUVgnDVIKd8c';

export default function BooksScreen() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
      const data = await response.json();
      setBooks(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    const book = item.volumeInfo;
  
    const handleAddToLibrary = () => {
      const bookData = {
        title: book.title,
        authors: book.authors?.join(', '),
        publisher: book.publisher,
        thumbnail: book.imageLinks?.thumbnail,
      };
      addBookToLibrary(bookData);
    };
  
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, backgroundColor: "#81A1C1" }}>
        <Image
          source={{ uri: book.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200.png?text=No+Image' }}
          style={{ width: 80, height: 120 }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontSize: 18 }}>{book.title}</Text>
          <Text style={{ fontSize: 14 }}>{book.authors?.join(', ')}</Text>
          <Text style={{ fontSize: 12 }}>{book.publisher}</Text>
          <TouchableOpacity
            onPress={handleAddToLibrary}
            style={{ backgroundColor: '#BD93F9', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 }}
          >
            <Text style={{ color: '#fff' }}>Add to Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor:"#3B4252" }}>
      <TextInput
        placeholder="Search books"
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, backgroundColor:"#81A1C1" }}
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={{ backgroundColor: '#BD93F9', padding: 10, borderRadius: 5, alignItems: 'center' }}
      >
        <Text style={{ color: '#fff' }}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1,
                 backgroundColor:"#3B4252",
                 color: "#BD93F9" }}
      />
    </View>
  );
}