// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Navbar from './Navbar';
import Login from './Login'
import ProtectedRoute from './ProtectedRoute';
import NotAuthorized from './NotAuthorized';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/NotAuthorized" element={<NotAuthorized />} />
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/about" element={<ProtectedRoute element={About} />} />
        <Route path="/contact" element={<ProtectedRoute element={Contact} requiredRole="admin" />} />
      </Routes>
    </Router>
  );
}

export default App;