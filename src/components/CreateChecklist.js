import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Ensure this is correctly imported

function CreateChecklist() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([{ description: '', dueDate: '' }]);

    const handleAddTask = () => {
        setTasks([...tasks, { description: '', dueDate: '' }]);
    };

    const handleTaskChange = (index, field, value) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, [field]: value };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const handleSubmit = async () => {
        if (!title || tasks.some(task => !task.description || !task.dueDate)) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            await addDoc(collection(firestore, 'checklists'), {
                title,
                tasks,
                userId: currentUser.uid
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating checklist:', error);
            alert('Failed to create checklist.');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Create a New Checklist</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Checklist Title"
                style={{ display: 'block', margin: '0 auto 10px' }}
            />
            {tasks.map((task, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={task.description}
                        onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                        placeholder="Task Description"
                        style={{ marginBottom: '5px', width: '300px' }}
                    />
                    <input
                        type="datetime-local"
                        value={task.dueDate}
                        onChange={(e) => handleTaskChange(index, 'dueDate', e.target.value)}
                        style={{ marginBottom: '10px', width: '300px' }}
                    />
                </div>
            ))}
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={handleSubmit}>Finish</button>
        </div>
    );
}

export default CreateChecklist;
