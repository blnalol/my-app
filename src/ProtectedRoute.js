import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './auth';
import React, { useEffect, useState } from 'react';


/*
const ProtectedRoute = ({ element: Component }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authenticatedUser = isAuthenticated();
        console.log("Authenticated User:", authenticatedUser); // Debugging line
        setUser(authenticatedUser);
    }, []); // Run only once when the component mounts

    if (user === null) {
        console.log("Loading..."); // Debugging line
        // While checking, return null or a loading indicator to prevent multiple re-renders
        return null;
    }

    if (!user) {
        console.log("User not authenticated. Redirecting..."); // Debugging line
        // Redirect if not authenticated
        return <Navigate to="/" />;
    }

    return <Component />;
};

export default ProtectedRoute;
*/

const ProtectedRoute = ({ element: Element, requiredRole }) => {
    const user = isAuthenticated(); // Check if user is authenticated

    if (!user) {
        // Notify and redirect if the user is not authenticated
        alert('Access denied. Please log in first.');
        return <Navigate to="/" />;
    }

    // Retrieve the user's role from localStorage
    const userRole = localStorage.getItem('role');

    // Check if the user's role matches the required role
    if (requiredRole && userRole !== requiredRole) {
        // Notify and redirect if the user's role does not match the required role
        alert('Access denied. Insufficient permissions.');
        return <Navigate to="/NotAuthorized" />;
    }

    // Render the protected component if all checks pass
    return <Element />;
};

export default ProtectedRoute;

/*
const ProtectedRoute = ({ element: Element }) => {
    if (!isAuthenticated()) {
        alert('Access denied. Please log in first.');
        return <Navigate to="/" />;
    }

    return <Element />;
};

export default ProtectedRoute;
*/