// src/utils/authFetch.js

const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

    const authOptions = {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`, // Add JWT to Authorization header
        },
    };

    // Make the API call
    const response = await fetch(url, authOptions);
    
    // Check for token expiration and handle it if needed
    if (response.status === 401) {
        console.warn('Token expired or unauthorized.');
        // Redirect to login or refresh the token if you have a refresh mechanism
    }

    return response;
};

export default authFetch;