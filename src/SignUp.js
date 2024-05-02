import React, { useState } from 'react';
import { auth } from './firebase'; // Adjust the path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from firebase/auth

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add state for error handling

  const handleSignUp = async () => {
    try {
      // Use auth object as the first argument
      await createUserWithEmailAndPassword(auth, email, password);
      // User signed up successfully
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message); // Set error state for displaying error message
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p>{error}</p>} {/* Display error message if error state is not null */}
    </div>
  );
};

export default SignUp;
