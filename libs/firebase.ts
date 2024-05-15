// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnDTjI_2pL4mGYdEX0AvUGyiyluep22YA",
  authDomain: "e-shop-vid-20d51.firebaseapp.com",
  projectId: "e-shop-vid-20d51",
  storageBucket: "e-shop-vid-20d51.appspot.com",
  messagingSenderId: "216859411073",
  appId: "1:216859411073:web:44fdc1da5a990a8f7dc380"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp