// auth.js
import { jwtDecode } from "jwt-decode";

/*
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        // Decode the token to extract user information
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded; // Return the decoded token, which includes the user role
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};
*/



export const isAuthenticated = () => {
    return !!localStorage.getItem('jwtToken'); // Check if a JWT token exists
};

