import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase-config';
import { useAuth } from '../context/AuthContext';

function SharedChecklist() {
    const { checklistId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [checklist, setChecklist] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            alert('Please sign in to add shared checklists.');
            navigate('/signin');
            return;
        }
        const fetchChecklist = async () => {
            const docRef = doc(firestore, 'checklists', checklistId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setChecklist({ id: docSnap.id, ...docSnap.data() });
            } else {
                alert('No checklist found with this ID.');
                navigate('/');  // Redirect if the checklist is not found
            }
        };

        fetchChecklist();
    }, [checklistId, currentUser, navigate]);

    const handleAddChecklist = async () => {
        if (checklist) {
            // Remove the existing id and ensure the checklist is added under the current user's id
            const { id, ...checklistData } = checklist;
            await addDoc(collection(firestore, 'checklists'), {
                ...checklistData,
                userId: currentUser.uid  // Assign the new user ID
            });
            alert('Checklist added to your account!');
            navigate('/');  // Navigate to the home page or list of checklists
        }
    };

    return (
        <div>
            <h1>Shared Checklist</h1>
            {checklist ? (
                <div>
                    <p>Title: {checklist.title}</p>
                    <ul>
                        {checklist.tasks.map((task, index) => (
                            <li key={index}>{task.description} - Due by: {new Date(task.dueDate).toLocaleString()}</li>
                        ))}
                    </ul>
                    <button onClick={handleAddChecklist}>Add this Checklist to My Account</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SharedChecklist;
