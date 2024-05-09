import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';

function SignUp() {
  // State hooks for form data and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the sign-up form submission
  const signUp = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    
    // Set session persistence to local to keep the user logged in across sessions
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Create a new user with email and password
        return createUserWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // Log for debugging and proceed to post-sign-up actions
        console.log('Account created:', userCredential.user);
        navigate('/profile-setup'); // Redirect user to a profile setup page after successful sign-up
      })
      .catch((error) => {
        // Provide user-friendly error messages and log the detailed error
        const friendlyMessage = error.code === 'auth/email-already-in-use' ? 'This email is already in use.' : 'Failed to create account. Please try again.';
        setError(friendlyMessage);
        console.error('Error signing up:', error.message);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={signUp}>
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
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display errors if there are any */}
      </form>
    </div>
  );
}

export default SignUp;
