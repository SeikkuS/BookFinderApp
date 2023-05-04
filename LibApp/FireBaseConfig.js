// Import the functions you need from the SDKs you need

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD-TDjWzfCFVCRxKNYOl67fwHzXSwX_0Qs",

  authDomain: "mobilelibapp.firebaseapp.com",

  projectId: "mobilelibapp",

  storageBucket: "mobilelibapp.appspot.com",

  messagingSenderId: "916551904252",

  appId: "1:916551904252:web:ba6e0ca464bdbe4aa96079",

  measurementId: "G-Z27MFC60N6"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);