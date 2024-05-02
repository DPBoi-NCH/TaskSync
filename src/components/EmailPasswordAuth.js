// src/components/EmailPasswordAuth.js
import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function EmailPasswordAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = async () => {
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>{isNewUser ? 'Sign Up' : 'Sign In'}</button>
      <button onClick={() => setIsNewUser(!isNewUser)}>{isNewUser ? 'Switch to Sign In' : 'Switch to Sign Up'}</button>
    </div>
  );
}

export default EmailPasswordAuth;
