import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase-config';
import { useAuth } from '../context/AuthContext';

function SharedChecklist() {
    // Extracting the checklist ID from the URL parameters
    const { checklistId } = useParams();
    // Accessing the current user and auth state
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    // State to store the fetched checklist data
    const [checklist, setChecklist] = useState(null);
    // Loading state to manage rendering during data fetching
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Redirect to sign-in if no current user is found
        if (!currentUser) {
            // Store the intended URL to redirect after signing in
            sessionStorage.setItem('redirectAfterLogin', `/shared-checklist/${checklistId}`);
            alert('Please sign in to add shared checklists.');
            navigate('/signin');
            return;
        }

        // Function to fetch checklist data from Firestore
        const fetchChecklist = async () => {
            const docRef = doc(firestore, 'checklists', checklistId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setChecklist({ id: docSnap.id, ...docSnap.data() });
            } else {
                alert('No checklist found with this ID.');
                navigate('/');  // Redirect if the checklist is not found
            }
            setLoading(false);
        };

        fetchChecklist();
    }, [checklistId, currentUser, navigate]);

    // Function to add fetched checklist to the current user's account
    const handleAddChecklist = async () => {
        if (checklist) {
            // Destructure to exclude the original document ID and include the rest of the checklist data
            const { id, ...checklistData } = checklist;
            await addDoc(collection(firestore, 'checklists'), {
                ...checklistData,
                userId: currentUser.uid  // Assign the new user ID to the checklist
            });
            alert('Checklist added to your account!');
            navigate('/');  // Navigate to the home page or list of checklists after adding
        }
    };

    // Display loading indicator while the data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

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
                <p>No checklist data found.</p>
            )}
        </div>
    );
}

export default SharedChecklist;
