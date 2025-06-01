// src/App.js
import React, { useState } from "react";
import './App.css';
import { startGame } from './gameLogic';  // Importing the game logic

import MatrixBackground from './components/MatrixBackground'; // Import the Matrix background
import Header from './components/Header'; // Import the Header component
import InputGrid from './Grid';
import ScrambledWordContainer from "./ScrambledWordContainer";


function App() {
  const [theme, setTheme] = useState("");        // Store the user's theme input
  const [words, setWords] = useState([]);       // Store the generated words
  const [loading, setLoading] = useState(false);  // Loading state indicator
  const [error, setError] = useState(null);      // Error handler
  const [word] = useState('REACT'); // Hardcoded word for simplicity; replace or fetch dynamically
  const scrambledWord = word.split('').sort(() => Math.random() - 0.5).join('');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);  // Update theme as user types
  };

  // Function to handle submitting the theme and starting the game
  const handleSubmit = async () => {
    if (!theme) {
      alert("Please enter a theme to generate words.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedWords = await startGame(theme);
      setWords(generatedWords);  // Update state with the generated words
    } catch (err) {
      setError(err.message);  // Catch and display any errors
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="App">
      {/* Matrix Background */}
      <MatrixBackground />

      {/* Main Content */}
      <header>
        <Header /> {/* Using the Header component */}
      </header>

      <div className="container">
        <p>Enter a theme to generate words:</p>
        <div className="searchbox-container">
          <div className="input-container">
            <input
              type="text"
              value={theme}
              onChange={handleThemeChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter a theme (e.g., Animals, Food)"
            />
            <button
              className="arrow-button"
              onClick={handleSubmit}
              disabled={loading}
              aria-label="Generate Words"
            >
              {loading ? (
                // Spinner Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="#808080"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="31.415, 31.415"
                    transform="rotate(0 25 25)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0 25 25;360 25 25"
                      keyTimes="0;1"
                    />
                  </circle>
                </svg>
              ) : (
                // Arrow Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" fill="#ffffff" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Display the generated words */}
        {words.length > 0 && (
          <div className="word-list">
            <h2>Generated Words:</h2>
            <ul>
              {words.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
