import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../App';

export default function BooksScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const booksCollectionRef = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCollectionRef);
      const booksList = booksSnapshot.docs.map(doc => doc.data());
      setBooks(booksList);
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is a placeholder FOR THE BOOKS screen</Text>
      <Text>{JSON.stringify(books)}</Text>
    </View>
  );
}