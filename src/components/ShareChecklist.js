// src/components/ShareChecklist.js
import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

function ShareChecklist({ checklistId }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleShare = async () => {
    const userId = await convertEmailToUserId(email); // This function needs implementation
    if (!userId) {
      setError('User not found');
      return;
    }
    setError('');
    const checklistRef = doc(db, "checklists", checklistId);
    await updateDoc(checklistRef, {
      sharedWith: arrayUnion(userId)
    }).catch(error => {
      console.error("Error sharing checklist:", error);
      setError('Failed to share checklist');
    });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email to share" />
      <button onClick={handleShare}>Share Checklist</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ShareChecklist;

async function convertEmailToUserId(email) {
  // Placeholder: implement your method to find a user ID by email
  return null;
}
