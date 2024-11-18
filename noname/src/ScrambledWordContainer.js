import React from 'react';

const ScrambledWordContainer = ({ scrambledWord }) => {
  return (
    <div style={{ marginRight: '20px' }}>
      <h3>Scrambled Word:</h3>
      <div style={{ fontSize: '24px', letterSpacing: '4px' }}>
        {scrambledWord.split('').map((letter, index) => (
          <span key={index} style={{ margin: '0 4px' }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrambledWordContainer;
