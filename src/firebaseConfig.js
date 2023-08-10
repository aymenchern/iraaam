// src/firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBFniBFVdZcgRmCY-FJ9C6Evf1KxW_yLwU",
    authDomain: "iraamstage.firebaseapp.com",
    projectId: "iraamstage",
    storageBucket: "iraamstage.appspot.com",
    messagingSenderId: "459279439209",
    appId: "1:459279439209:web:416212bb8dc2eb716919f8"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firestore, auth };



