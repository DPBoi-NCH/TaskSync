import React from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      <h1>Welcome to My Checklist App</h1>
      <SignUp />
      <SignIn />
    </div>
  );
}

export default App;
