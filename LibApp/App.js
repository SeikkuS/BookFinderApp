import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BooksScreen from './screens/BooksScreen';
import LibraryScreen from './screens/LibraryScreen';
import SignupPage from './screens/SignupPage';

const BooksStack = createStackNavigator();
const LibraryStack = createStackNavigator();

function BooksStackNavigator() {
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen name="Books" component={BooksScreen} options={{ headerShown: false }} />
    </BooksStack.Navigator>
  );
}

function LibraryStackNavigator() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" options={{ headerShown: false }} >
        {(props) => <LibraryScreen {...props} db={db} />}
      </LibraryStack.Screen>
    </LibraryStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD-TDjWzfCFVCRxKNYOl67fwHzXSwX_0Qs",
  authDomain: "mobilelibapp.firebaseapp.com",
  projectId: "mobilelibapp",
  storageBucket: "mobilelibapp.appspot.com",
  messagingSenderId: "916551904252",
  appId: "1:916551904252:web:ba6e0ca464bdbe4aa96079",
  measurementId: "G-Z27MFC60N6"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {db};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
    return null; // or a loading indicator
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupPage}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
  
  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#3B4252",
            paddingTop: 5,
          },
          headerStyle: {
            backgroundColor: "#3B4252"
          },
          headerTitleStyle: {
            fontWeight:'bold',
            fontSize: 22,
            color: '#BD93F9'
          },
          headerTitleAlign:"center",
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
          activeTintColor: '#BD93F9',
          inactiveTintColor: '#D8DEE9',
          style: {
            backgroundColor: '#D8DEE9',
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.5,
          },
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Books"
          component={BooksStackNavigator}
        />
        <Tab.Screen
          name="Library"
          component={LibraryStackNavigator}
        />
      </Tab.Navigator>
    );
  }
}