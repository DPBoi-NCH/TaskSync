import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyAA8rKErIIVtaUrcwWRu-JPfJTaPN_UVOA",
  authDomain: "tasksync-sp.firebaseapp.com",
  databaseURL: "https://tasksync-sp-default-rtdb.firebaseio.com",
  projectId: "tasksync-sp",
  storageBucket: "tasksync-sp.appspot.com",
  messagingSenderId: "334119630636",
  appId: "1:334119630636:web:7732e61d8493c2ace71e89",
  measurementId: "G-8LR02CMPLG"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(firebaseApp);
