import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase-config';
import { collection, query, where, onSnapshot, doc, updateDoc} from 'firebase/firestore';

function HomePage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [checklists, setChecklists] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
            return;
        }
        const q = query(collection(firestore, 'checklists'), where('userId', '==', currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const lists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChecklists(lists);
        });
        return () => unsubscribe();
    }, [currentUser, navigate]);

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

    const toggleTaskCompletion = async (checklistId, task) => {
        const taskIndex = checklists.findIndex(cl => cl.id === checklistId);
        const tasks = [...checklists[taskIndex].tasks];
        const taskIdx = tasks.findIndex(t => t.description === task.description && t.dueDate === task.dueDate);
        tasks[taskIdx] = { ...tasks[taskIdx], completed: !tasks[taskIdx].completed };

        const checklistDoc = doc(firestore, 'checklists', checklistId);
        await updateDoc(checklistDoc, {
            tasks: tasks
        });
    };

    const deleteTask = async (checklistId, task) => {
        const taskIndex = checklists.findIndex(cl => cl.id === checklistId);
        const tasks = [...checklists[taskIndex].tasks];
        const updatedTasks = tasks.filter(t => t !== task);

        const checklistDoc = doc(firestore, 'checklists', checklistId);
        await updateDoc(checklistDoc, {
            tasks: updatedTasks
        });
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
                                <button onClick={() => toggleTaskCompletion(checklist.id, task)} style={{ color: task.completed ? 'grey' : 'green' }}>✓</button>
                                {task.description} - Due: {new Date(task.dueDate).toLocaleString()}
                                <button onClick={() => deleteTask(checklist.id, task)} style={{ color: 'red' }}>✖</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleShare(checklist.id)} style={{ marginTop: '10px' }}>
                        Share
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
