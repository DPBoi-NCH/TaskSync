// src/components/GoogleSignIn.js
import React from 'react';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function GoogleSignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default GoogleSignIn;