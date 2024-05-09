import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Importing useAuth from context

function CreateChecklist() {
    const { currentUser } = useAuth(); // Accessing the current user from the Auth context
    const navigate = useNavigate(); // Hook for navigation
    const [title, setTitle] = useState(''); // State to hold the title of the checklist
    const [tasks, setTasks] = useState([{ description: '', dueDate: '' }]); // State to hold tasks with description and due date

    // Function to add a new task to the list
    const handleAddTask = () => {
        setTasks([...tasks, { description: '', dueDate: '' }]);
    };

    // Function to handle changes to task fields
    const handleTaskChange = (index, field, value) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, [field]: value }; // Update the specific task's field
            }
            return task;
        });
        setTasks(newTasks);
    };

    // Function to handle checklist submission
    const handleSubmit = async () => {
        if (!title || tasks.some(task => !task.description || !task.dueDate)) {
            alert('Please fill out all fields.'); // Ensure all fields are filled
            return;
        }
        try {
            await addDoc(collection(firestore, 'checklists'), {
                title,
                tasks,
                userId: currentUser.uid // Include the user ID to link the checklist to the user
            });
            navigate('/'); // Navigate to the homepage after successful creation
        } catch (error) {
            console.error('Error creating checklist:', error); // Log errors if the creation fails
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
