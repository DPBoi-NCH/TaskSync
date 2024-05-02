import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const signIn = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home page on success
    } catch (error) {
      setError(error.message);
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={signIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignIn;
