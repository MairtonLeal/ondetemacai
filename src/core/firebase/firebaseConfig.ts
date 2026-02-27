import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyB7f5NPqFjNu7MWWtVQf5KxHrT9v5bs0UU',
    authDomain: 'ionic-projetos.firebaseapp.com',
    databaseURL: 'https://ionic-projetos-default-rtdb.firebaseio.com',
    projectId: 'ionic-projetos',
    storageBucket: 'ionic-projetos.appspot.com',
    messagingSenderId: '652513321041',
    appId: '1:652513321041:web:0073a845f2994e55989870',
    measurementId: 'G-5N0R5HD50Q',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);