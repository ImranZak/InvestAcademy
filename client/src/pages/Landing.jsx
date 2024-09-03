import React, { useState } from 'react';
import './Landing.css';

const Landing = () => {
  const [section, setSection] = useState(1);

  const handleNextSection = (nextSection) => {
    setSection(nextSection);
  };

  return (
    <div className="landing-container">
      {section === 1 && (
        <div className="section">
          <h1>Invest Academy</h1>
          <button className="cta-button" onClick={() => handleNextSection(2)}>
            Get Started
          </button>
        </div>
      )}
      {section === 2 && (
        <div className="section">
          <h2>Are you new to investing?</h2>
          <div className="button-container">
            <button className="cta-button" onClick={() => window.location.href = '/learning-mode'}>
              Yes, I’d like to learn the basics
            </button>
            <button className="cta-button" onClick={() => handleNextSection(3)}>
              No, I know the basic concepts
            </button>
          </div>
        </div>
      )}
      {section === 3 && (
        <div className="section">
          <h2>What kind of learning experience would you prefer?</h2>
          <div className="button-container">
            <button className="cta-button" onClick={() => window.location.href = '/guided-trading'}>
              Something simple to get started
            </button>
            <button className="cta-button" onClick={() => window.location.href = '/real-life-scenario'}>
              I’d like a challenge
            </button>
            <button className="cta-button" onClick={() => window.location.href = '/ai-trading-mode'}>
              Surprise me
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
