import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        dueDate: '',
        status: 'ACTIVE',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: '', description: '', category: '', dueDate: '', status: 'ACTIVE' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Task</h3>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category (Work, Personal...)" value={formData.category} onChange={handleChange} required />
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
