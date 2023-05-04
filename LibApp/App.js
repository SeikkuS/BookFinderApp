import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import 'firebase/auth'; // Import the auth module from Firebase
import { firebaseConfig } from './FireBaseConfig'; // Import your Firebase configuration object

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

  // Initialize Firebase
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null; // or a loading indicator
  }

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
