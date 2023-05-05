import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, getDoc } from 'firebase/firestore';

// Import screens
import LoginScreen from './screens/LoginScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import HomeScreen from './screens/HomeScreen';
import BooksScreen from './screens/BooksScreen';
import RecommendedBooksScreen from './screens/RecommendedBooksScreen';
import LibraryScreen from './screens/LibraryScreen';

// Create navigation stacks for Books and Library screens
const BooksStack = createStackNavigator();
const LibraryStack = createStackNavigator();

// Create Books stack navigator
function BooksStackNavigator() {
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen
        name="Books"
        component={BooksScreen}
        options={{ headerShown: false }}
      />
      <BooksStack.Screen
        name="Recommended Books"
        component={RecommendedBooksScreen}
      />
    </BooksStack.Navigator>
  );
}

// Create Library stack navigator
function LibraryStackNavigator() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <LibraryStack.Screen
        name="Recommended Books"
        component={RecommendedBooksScreen}
      />
    </LibraryStack.Navigator>
  );
}

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const firebaseApp = initializeApp({

    apiKey: "AIzaSyD-TDjWzfCFVCRxKNYOl67fwHzXSwX_0Qs",

    authDomain: "mobilelibapp.firebaseapp.com",

    projectId: "mobilelibapp",

    storageBucket: "mobilelibapp.appspot.com",

    messagingSenderId: "916551904252",

    appId: "1:916551904252:web:ba6e0ca464bdbe4aa96079",

    measurementId: "G-Z27MFC60N6"
    
  });

  console.log("Firebase app initialized");

  const auth = getAuth(firebaseApp);
  console.log("Auth initialized");

  const db = getFirestore(firebaseApp);
  console.log("Firestore initialized");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  if (loading) {
    console.log("Loading...");
    return null; // or a loading indicator
  }

  console.log("Rendering app...");


  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Books') {
                iconName = 'book-open';
              } else if (route.name === 'Library') {
                iconName = 'book';
              }

              return <Feather name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Testing" component={PlaceholderScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Books" component={BooksStackNavigator} />
          <Tab.Screen name="Library" component={LibraryStackNavigator} />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}
