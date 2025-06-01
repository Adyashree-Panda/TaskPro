import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trash = () => {
    const [deletedTasks, setDeletedTasks] = useState([]);

    const fetchDeletedTasks = async () => {
        const res = await axios.get('http://localhost:5000/api/tasks');
        const deleted = res.data.filter(task => task.status === 'DELETED');
        setDeletedTasks(deleted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
    };

    useEffect(() => {
        fetchDeletedTasks();
    }, []);

    return (
        <div>
            <h2>Deleted Tasks</h2>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {deletedTasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.category}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Trash;
