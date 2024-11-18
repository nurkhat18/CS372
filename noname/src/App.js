import React, { useState } from "react";
import './App.css';
import { startGame } from './gameLogic';  // Importing the game logic
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

  return (
    <div className="App">
      <header>
        <h1>Word Scramble Game</h1>
      </header>

      <div className="container">
        <p>Enter a theme to generate words:</p>
        <div className="searchbox-container">
          <input
            type="text"
            value={theme}
            onChange={handleThemeChange}
            placeholder="Enter a theme (e.g., Animals, Food)"
          />
          <button onClick={handleSubmit}>
            {loading ? "Loading..." : "Generate Words"}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Display the generated words */}
        {words.length > 0 && (
          <div>
            <h2>Generated Words:</h2>
            <ul>
              {words.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ScrambledWordContainer scrambledWord={scrambledWord} />
      <InputGrid wordLength={word.length} correctWord={word} />


      <footer>
        <p>&copy; 2024 Scramble Games. CSC372 Final Project. <br /> 
          <a href="https://github.com/nurkhat18/CS372/tree/main/noname">Github Repo</a> 
        </p>
      </footer>
    </div>
  );
}

export default App;