// src/components/ChecklistItems.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, collection, onSnapshot, updateDoc } from 'firebase/firestore';

function ChecklistItems({ checklistId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = collection(db, "checklists", checklistId, "items");
    const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, [checklistId]);

  const toggleCompletion = async (item) => {
    const itemRef = doc(db, "checklists", checklistId, "items", item.id);
    await updateDoc(itemRef, {
      completed: !item.completed
    });
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <input type="checkbox" checked={item.completed} onChange={() => toggleCompletion(item)} />
          {item.title} - {item.description} (Due by: {new Date(item.dueBy).toLocaleString()})
        </li>
      ))}
    </ul>
  );
}

export default ChecklistItems;
