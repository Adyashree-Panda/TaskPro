import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/api/tasks');
        const sorted = sortTasks(res.data);
        setTasks(sorted);
    };

    const sortTasks = (tasks) => {
        const now = new Date();
        return tasks
            .map(task => ({
                ...task,
                isOverdue: task.status === 'ACTIVE' && new Date(task.dueDate) < now
            }))
            .sort((a, b) => {
                if (a.isOverdue && !b.isOverdue) return -1;
                if (!a.isOverdue && b.isOverdue) return 1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
    };

    const handleAddTask = async (taskData) => {
        await axios.post('http://localhost:5000/api/tasks', taskData);
        fetchTasks();
    };

    const handleStatusChange = async (taskId, status) => {
        await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status });
        fetchTasks();
    };

    const handleDelete = async (taskId) => {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <TaskForm onSubmit={handleAddTask} />
            <h3>Active & Overdue Tasks</h3>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} style={{ backgroundColor: task.isOverdue ? '#ffcdd2' : '' }}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.category}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td>{task.status}</td>
                            <td>
                                {task.status === 'ACTIVE' && (
                                    <>
                                        <button onClick={() => handleStatusChange(task.id, 'COMPLETED')}>Mark Complete</button>
                                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
