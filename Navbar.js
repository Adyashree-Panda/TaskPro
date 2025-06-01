import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local/session storage if used
        // e.g. localStorage.removeItem("token");
        navigate('/login');
    };

    return (
        <nav style={{ marginBottom: '20px' }}>
            <Link to="/dashboard">Dashboard</Link> |{' '}
            <Link to="/history">History</Link> |{' '}
            <Link to="/trash">Trash</Link> |{' '}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
