import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';

function SignIn() {
  // State hooks for managing form inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hooks for navigation and accessing router state
  const navigate = useNavigate();
  const location = useLocation(); // To access the state passed in the location object

  // Retrieve the path to redirect to after successful login or default to home page
  const { from } = location.state || { from: { pathname: "/" } }; 

  // Handle sign in on form submit
  const signIn = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    // Ensure that the Firebase auth session persists across browser sessions
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Attempt to sign in with provided email and password
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(() => {
        // On success, redirect to the requested page before login or the home page
        navigate(from);
      })
      .catch((error) => {
        // Handle errors like wrong password or no user found and update the UI
        setError("Failed to sign in: " + error.message);
        console.error('Error signing in:', error);
      });
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
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/*  Display error message if any */}
      </form>
    </div>
  );
}

export default SignIn;
