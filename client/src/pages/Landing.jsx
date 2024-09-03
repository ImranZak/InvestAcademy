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
            <button className="cta-button" onClick={() => handleNextSection(3)}>
              Yes, I’d like to learn the basics
            </button>
            <button className="cta-button" onClick={() => handleNextSection(4)}>
              No, I know the basic concepts
            </button>
          </div>
        </div>
      )}
      {section === 3 && (
        <div className="section">
          <h2>Learning Mode</h2>
          <p>Teaches basics of trading itself</p>
          <p>Courseware/Article-based</p>
          <button className="placeholder-button" onClick={() => alert('This will lead to the Learning Mode feature.')}>
            Start Learning
          </button>
        </div>
      )}
      {section === 4 && (
        <div className="section">
          <h2>What kind of learning experience would you prefer?</h2>
          <div className="button-container">
            <button className="cta-button" onClick={() => handleNextSection(5)}>
              Something simple to get started
            </button>
            <button className="cta-button" onClick={() => handleNextSection(6)}>
              I’d like a challenge
            </button>
            <button className="cta-button" onClick={() => handleNextSection(7)}>
              Surprise me
            </button>
          </div>
        </div>
      )}
      {section === 5 && (
        <div className="section">
          <h2>Guided Trading Feature</h2>
          <button className="placeholder-button" onClick={() => alert('This will lead to the Guided Trading feature.')}>
            Start Guided Trading
          </button>
        </div>
      )}
      {section === 6 && (
        <div className="section">
          <h2>Real-Life Scenario</h2>
          <button className="placeholder-button" onClick={() => alert('This will lead to the Real-Life Scenario feature.')}>
            Explore Real-Life Scenarios
          </button>
        </div>
      )}
      {section === 7 && (
        <div className="section">
          <h2>AI Trading Mode</h2>
          <button className="placeholder-button" onClick={() => alert('This will lead to the AI Trading Mode feature.')}>
            Start AI Trading
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
