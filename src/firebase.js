import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEfz20GOqZjQgRHuyVCai1SSAgty_R6wo",
    authDomain: "to-do-app-3c1cc.firebaseapp.com",
    projectId: "to-do-app-3c1cc",
    storageBucket: "to-do-app-3c1cc.appspot.com",
    messagingSenderId: "919086015471",
    appId: "1:919086015471:web:1bb6e01c58730036728c1a",
    measurementId: "G-T61943J48X"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db};