import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        question1: '',
        answer1: '',
        question2: '',
        answer2: '',
        question3: '',
        answer3: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/verify-security', formData);
            navigate('/reset-password', { state: { email: formData.email } });
        } catch (err) {
            setError(err.response?.data || 'Verification failed');
        }
    };

    return (
        <div>
            <h2>Verify Identity</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="question1" placeholder="Security Question 1" onChange={handleChange} required />
                <input name="answer1" placeholder="Answer 1" onChange={handleChange} required />
                <input name="question2" placeholder="Security Question 2" onChange={handleChange} required />
                <input name="answer2" placeholder="Answer 2" onChange={handleChange} required />
                <input name="question3" placeholder="Security Question 3" onChange={handleChange} required />
                <input name="answer3" placeholder="Answer 3" onChange={handleChange} required />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
