import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import firebase from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { firebaseApp } from '../App';


export default function LibraryScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Get books from Firebase
    console.log("getFirestore")
    const db = getFirestore(firebaseApp);
    console.log("get collection")
    db.collection('books')
      .get()
      .then((querySnapshot) => {
        const fetchedBooks = [];
        querySnapshot.forEach((doc) => {
          const fetchedBook = { id: doc.id, ...doc.data() };
          fetchedBooks.push(fetchedBook);
        });
        setBooks(fetchedBooks);
      })
      .catch((error) => console.log(error));
  }, []);

  // Render each book item
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.bookContainer}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.bookList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookList: {
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bookContainer: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    marginTop: 8,
  },
});