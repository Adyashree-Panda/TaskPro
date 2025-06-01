
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
