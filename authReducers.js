const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'SIGNUP_SUCCESS':
            return { ...state, loading: false, success: true, user: action.payload };
        case 'SIGNUP_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
