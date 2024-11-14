import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotAuthorized() {
  const navigate = useNavigate();
  const goToLogin = () => navigate('/');

  return (
    <div>
      <h1>not Authorized</h1>
      <button onClick={goToLogin}>back to Login</button>
    </div>
  );
}

export default NotAuthorized;