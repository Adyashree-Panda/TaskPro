
import axios from 'axios';

export const signupUser = (userData) => async (dispatch) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
        const res = await axios.post('http://localhost:5000/api/auth/signup', userData);
        dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'SIGNUP_FAILURE', payload: error.response?.data || 'Signup failed' });
    }
};
export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        // Save user/token in localStorage if needed
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data || 'Login failed' });
    }
};

