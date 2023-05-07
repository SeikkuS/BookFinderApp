# Mobile Course Final Project

## Used Modules:

- React-Native
- Expo
- Firebase (Firestore and Authentication)
- React-Navigation

This App was made for a course handling Mobile App programming. 

The app uses fetch functions to search for data on books with a search term from the Google Books API. Accessing the API requires an API-key which I acquired through the Google Cloud Console by registering my project and requesting an API-Key for the correct API through it.

In addition it uses a database (Firestore) for storing the data of the books the user has selected. This data will then be printed out into the "My Library" section of the application. 

The authentication is a simple email and password access, that you can register into. The account is used to access the database.

The application has a simple bottom screen nav bar the user can use to navigate between 3 pages.

Sources:

Firebase Documentation: https://firebase.google.com/docs

Google Books API Documentation: https://developers.google.com/books/docs/v1/using

React-Native Documentation: https://reactnative.dev/docs/getting-started
