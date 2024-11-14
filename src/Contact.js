import React from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  const goToHome = () => navigate('/Home');
  const goToAbout = () => navigate('/about');

  return (
    <div>
      <h1>Contact Page</h1>
      <button onClick={goToHome}>Go to Home</button>
      <button onClick={goToAbout}>Go to About</button>
    </div>
  );
}

export default Contact;

 {/*
    import React from 'react';

function Contact() {
  return <h1>Contact Page</h1>;
}

export default Contact;
    */}
