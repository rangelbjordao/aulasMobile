import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const { getReactNativePersistence } = require("firebase/auth") as any;

const firebaseConfig = {
  apiKey: "AIzaSyB_uiEXipafebzd8388L3KOphZP9-uGzh4",
  authDomain: "projetofirebase-43f88.firebaseapp.com",
  projectId: "projetofirebase-43f88",
  storageBucket: "projetofirebase-43f88.firebasestorage.app",
  messagingSenderId: "27900474636",
  appId: "1:27900474636:web:9a0f5ebb29c10cd5bf8529",
  measurementId: "G-1MHXTS8ERC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
