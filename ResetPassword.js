import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (pass) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setError('Password must be 8+ chars with upper, lower, number');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/auth/reset-password', {
                email: state.email,
                newPassword: password,
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Reset failed');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
