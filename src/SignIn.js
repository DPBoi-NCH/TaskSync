import React, { useState } from 'react';
import { auth } from './firebase'; // Adjust the path as needed
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword from firebase/auth

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add state for error handling

  const handleSignIn = async () => {
    try {
      // Use auth object as the first argument
      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError(error.message); // Set error state for displaying error message
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p>{error}</p>} {/* Display error message if error state is not null */}
    </div>
  );
};

export default SignIn;
