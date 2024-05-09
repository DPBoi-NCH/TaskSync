import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase-config';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

function HomePage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [checklists, setChecklists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser && !loading) {  // Check if there's no user and loading is done
            navigate('/logout');
            return;
        }
        
        if (currentUser) {
            const q = query(collection(firestore, 'checklists'), where('userId', '==', currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const lists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setChecklists(lists);
                setLoading(false);  // Set loading to false once data is fetched
            }, error => {
                console.error("Error fetching checklists:", error);
                setLoading(false);  // Ensure loading is set to false even on error
            });

            return () => unsubscribe();  // Cleanup subscription on unmount
        }
    }, [currentUser, navigate, loading]);

    if (loading) {
        return <div>Loading...</div>;  // Display loading indicator while loading
    }

    const handleShare = async (checklistId) => {
        const checklistLink = `${window.location.origin}/shared-checklist/${checklistId}`;
        try {
            await navigator.clipboard.writeText(checklistLink);
            alert('Link copied to clipboard! Send it to someone to share this checklist.');
        } catch (err) {
            console.error('Failed to copy link:', err);
            alert('Failed to copy link.');
        }
    };

    const toggleTaskCompletion = async (checklistId, taskIndex) => {
        const checklistRef = doc(firestore, 'checklists', checklistId);
        const checklistSnap = await getDoc(checklistRef);
        if (checklistSnap.exists()) {
            const tasks = [...checklistSnap.data().tasks];
            tasks[taskIndex] = { ...tasks[taskIndex], completed: !tasks[taskIndex].completed };
            await updateDoc(checklistRef, { tasks });
        }
    };

    const deleteTask = async (checklistId, taskIndex) => {
        const checklistRef = doc(firestore, 'checklists', checklistId);
        const checklistSnap = await getDoc(checklistRef);
        if (checklistSnap.exists()) {
            const tasks = [...checklistSnap.data().tasks];
            tasks.splice(taskIndex, 1);  // Remove the task by index
            await updateDoc(checklistRef, { tasks });
        }
    };

    const deleteChecklist = async (checklistId) => {
        await deleteDoc(doc(firestore, 'checklists', checklistId));
    };

    return (
        <div style={{ textAlign: 'center', minHeight: '100vh', position: 'relative' }}>
            <h1>Welcome to TaskSync!</h1>
            {currentUser && <p>Logged in as: {currentUser.email}</p>}
            <button onClick={() => navigate('/create-checklist')} style={{ margin: '20px auto', display: 'block' }}>
                Create New Checklist
            </button>
            {checklists.length > 0 ? checklists.map(checklist => (
                <div key={checklist.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <h2>{checklist.title}</h2>
                    <ul>
                        {checklist.tasks.map((task, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <button onClick={() => toggleTaskCompletion(checklist.id, index)} style={{ color: task.completed ? 'grey' : 'green' }}>✓</button>
                                {task.description} - Due: {new Date(task.dueDate).toLocaleString()}
                                <button onClick={() => deleteTask(checklist.id, index)} style={{ color: 'red' }}>✖</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleShare(checklist.id)} style={{ margin: '10px' }}>
                        Share
                    </button>
                    <button onClick={() => deleteChecklist(checklist.id)} style={{ color: 'red', margin: '10px' }}>
                        Delete Checklist
                    </button>
                </div>
            )) : (
                <p>No checklists found. Start by creating one!</p>
            )}
            <button onClick={() => navigate('/logout')} style={{ position: 'absolute', bottom: 20, right: 20 }}>
                Logout
            </button>
        </div>
    );
}

export default HomePage;
