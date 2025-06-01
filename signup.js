import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../actions/authActions';

const securityQuestions = [
    "What was your childhood nickname?",
    "In what city did you meet your spouse?",
    "What is the name of your favorite childhood friend?",
    "What street did you live on in third grade?",
    "What is your oldest sibling’s birthday month and year?",
    "What is the middle name of your youngest child?",
    "What is your favorite team?",
    "What is your favorite movie?",
    "What was your first car?",
    "What school did you attend for sixth grade?"
];

const Signup = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        question1: '',
        answer1: '',
        question2: '',
        answer2: '',
        question3: '',
        answer3: ''
    });

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (pass) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, question1, question2, question3 } = formData;
        if (!validateEmail(email)) {
            alert("Invalid email format");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters and include uppercase, lowercase and number");
            return;
        }
        if (new Set([question1, question2, question3]).size < 3) {
            alert("Security questions must be unique");
            return;
        }

        dispatch(signupUser(formData));
    };

    return (
        <div className="signup-form">
            <h2>Signup</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Signup successful!</p>}
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                {[1, 2, 3].map((num) => (
                    <div key={num}>
                        <select
                            name={`question${num}`}
                            value={formData[`question${num}`]}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Security Question {num}</option>
                            {securityQuestions.map((q, i) => (
                                <option key={i} value={q}>{q}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name={`answer${num}`}
                            placeholder={`Answer ${num}`}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}

                <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
            </form>
        </div>
    );
};

export default Signup;
