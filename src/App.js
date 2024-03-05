import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

firebase.initializeApp({
  apiKey: "AIzaSyAA8rKErIIVtaUrcwWRu-JPfJTaPN_UVOA",
  authDomain: "tasksync-sp.firebaseapp.com",
  databaseURL: "https://tasksync-sp-default-rtdb.firebaseio.com",
  projectId: "tasksync-sp",
  storageBucket: "tasksync-sp.appspot.com",
  messagingSenderId: "334119630636",
  appId: "1:334119630636:web:7732e61d8493c2ace71e89",
  measurementId: "G-8LR02CMPLG"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      </header>
    </div>
  );
}

export default App;
