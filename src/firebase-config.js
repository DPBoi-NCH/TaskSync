import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAA8rKErIIVtaUrcwWRu-JPfJTaPN_UVOA",
  authDomain: "tasksync-sp.firebaseapp.com",
  databaseURL: "https://tasksync-sp-default-rtdb.firebaseio.com",
  projectId: "tasksync-sp",
  storageBucket: "tasksync-sp.appspot.com",
  messagingSenderId: "334119630636",
  appId: "1:334119630636:web:7732e61d8493c2ace71e89",
  measurementId: "G-8LR02CMPLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances for Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };