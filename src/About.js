import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToContact = () => navigate('/contact');

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={goToHome}>Go to Home</button>
      <button onClick={goToContact}>Go to Contact</button>
    </div>
  );
}

export default About;

 {/* */}

{/*
    import React from 'react';

function About() {
  return <h1>About Page</h1>;
}

export default About;
*/}
