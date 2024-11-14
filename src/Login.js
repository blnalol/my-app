import React, { useState } from 'react';
import { login } from './AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const goToHome = () => navigate('/Home');
    localStorage.removeItem('jwtToken')

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            alert('Login successful');
            goToHome();
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;