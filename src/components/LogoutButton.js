// src/components/LogoutButton.js
import React from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;