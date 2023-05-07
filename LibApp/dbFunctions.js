import { collection, addDoc} from 'firebase/firestore';
import {  db } from './App';

// Function to search books using the Google Books API


export const addBookToLibrary = async (book) => {
  try {
    const libraryRef = collection(db, 'library');
    await addDoc(libraryRef, book);
    console.log('Book added to library:', book);
  } catch (error) {
    console.error(error);
  }
};

// Function to get all books from the database
export const getBooks = async () => {
  try {
    const snapshot = await db.collection('library').get();
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