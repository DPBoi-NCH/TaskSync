// src/components/App.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import GoogleSignIn from './GoogleSignIn';
import EmailPasswordAuth from './EmailPasswordAuth';
import LogoutButton from './LogoutButton';  // Import the LogoutButton component
import ChecklistItems from './ChecklistItems';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h1>Welcome to TaskSync!</h1>
      {user ? (
        <div>
          <p>Signed in as {user.email}</p>
          <LogoutButton /> 
          <ChecklistItems checklistId="exampleChecklistId" />
        </div>
      ) : (
        <div>
          <GoogleSignIn />
          <EmailPasswordAuth />
        </div>
      )}
    </div>
  );
}

export default App;