import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfR219yp3HvoUbE0ETsClzJDAxjODVt20",
    authDomain: "velzon-96021.firebaseapp.com",
    projectId: "velzon-96021",
    storageBucket: "velzon-96021.appspot.com",
    messagingSenderId: "1019766720517",
    appId: "1:1019766720517:web:bb52f2214aa173db69346c",
    measurementId: "G-VW2G7QRM9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Function for Google sign-in using Popup
const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User signed in:", user);
    return user;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
};

// Function to check authentication state
const checkAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Sign out function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export { auth, checkAuthState, signInWithGooglePopup, logout };
