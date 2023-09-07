// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoEviBTxtud8_IcGBpBMAueERYmiAbq5k",
  authDomain: "dylan-civicly.firebaseapp.com",
  projectId: "dylan-civicly",
  storageBucket: "dylan-civicly.appspot.com",
  messagingSenderId: "111093395915",
  appId: "1:111093395915:web:af3c7003eda9a1967f864e",
  measurementId: "G-GB7P15JFKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = (getStorage(app));
const analytics = getAnalytics(app);

export default storage;

