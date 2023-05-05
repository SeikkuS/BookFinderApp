import { firebase } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from './App';

const db = getFirestore(firebaseApp);

// Function to search books using the Google Books API
export const searchBooks = async (searchTerm) => {
  const apiKey = 'your_api_key_here';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const books = data.items.map((item) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '',
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.thumbnail
          : '',
      };
    });
    return books;
  } catch (error) {
    console.log(error);
  }
};

// Function to add a book to the database
export const addBook = async (bookData) => {
  try {
    await db.collection('books').doc().set(bookData);
    console.log('Book added successfully!');
  } catch (error) {
    console.log(error);
  }
};

// Function to get all books from the database
export const getBooks = async () => {
  try {
    const snapshot = await db.collection('books').get();
    const fetchedBooks = [];
    snapshot.forEach((doc) => {
      const fetchedBook = { id: doc.id, ...doc.data() };
      fetchedBooks.push(fetchedBook);
    });
    return fetchedBooks;
  } catch (error) {
    console.log(error);
  }
};