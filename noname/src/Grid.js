import React, { useState } from 'react';

const Grid = ({ wordLength, correctWord }) => {
  const [inputValues, setInputValues] = useState(Array(wordLength).fill(''));
  const [isCorrect, setIsCorrect] = useState(false);

  const handleChange = (value, index) => {
    const newValues = [...inputValues];
    newValues[index] = value.toUpperCase().slice(0, 1); // Allow only one uppercase letter per cell
    setInputValues(newValues);

    // Check if the input matches the correct word
    if (newValues.join('') === correctWord.toUpperCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <h3>Type the Correct Word:</h3>
      <div style={{ display: 'flex', gap: '4px' }}>
        {inputValues.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            maxLength={1}
            style={{
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '24px',
              border: '1px solid black',
            }}
          />
        ))}
      </div>
      {isCorrect && <p style={{ color: 'green' }}>Correct!</p>}
    </div>
  );
};

export default Grid;
