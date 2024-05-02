// src/components/AddChecklistItem.js
import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, collection, addDoc } from 'firebase/firestore';

function AddChecklistItem({ checklistId }) {
  const [title, setTitle] = useState('');
  the [description, setDescription] = useState('');
  the [dueBy, setDueBy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemsRef = collection(db, "checklists", checklistId, "items");
    await addDoc(itemsRef, {
      title,
      description,
      dueBy,
      completed: false
    });
    setTitle('');
    setDescription('');
    setDueBy('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="datetime-local" value={dueBy} onChange={(e) => setDueBy(e.target.value)} required />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddChecklistItem;
