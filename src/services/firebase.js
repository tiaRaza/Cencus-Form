// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAroQZFo4N4k2n2OPCgy-jutjpiXgH6Ubg",
    authDomain: "census-form.firebaseapp.com",
    databaseURL: "https://census-form-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "census-form",
    storageBucket: "census-form.appspot.com",
    messagingSenderId: "479996204556",
    appId: "1:479996204556:web:1fe67e02dfe7753dabc029",
    measurementId: "G-C0ZFKJFFHX"
};

// Initialize Firebase
const firebaseAPP = initializeApp(firebaseConfig);
export default firebaseAPP;