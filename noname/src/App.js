import React, { useState } from 'react';
import './App.css';
import { startGame } from './gameLogic';  // Importing the game logic

function App() {
  const [theme, setTheme] = useState(''); // stores the theme input value

  // handles theme input change
  const handleInputChange = (event) => {
    setTheme(event.target.value);
  };

  // handles start button click
  const handleStartGame = () => {
    if (theme) {
      alert(`Game starting with theme: ${theme}`);
      // Here you can add logic to generate a scramble game based on the theme
    } else {
      alert('Please enter a theme!');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Word Scramble Game</h1>
      </header>

      <div className="container">
        <p>Enter a theme or topic to get started:</p>
        <div className="searchbox-container">
          <input
            type="text"
            id="themeInput"
            placeholder="Enter a theme (e.g., Animals, Food, Countries)"
            value={theme} // Controlled component
            onChange={handleInputChange} // Update state on input change
          />
          <button id="startGameButton" onClick={handleStartGame}>Start Game</button>
        </div>
    </div>
    </div>
  );
}

export default App;