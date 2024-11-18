// src/components/MatrixBackground.js
import React, { useRef, useEffect } from 'react';
import './MatrixBackground.css'; // Ensure this CSS file exists with appropriate styles

function MatrixBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const columnsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is available
    const ctx = canvas.getContext('2d');

    // Function to set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Letters to display (English letters only)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Font size
    const fontSize = 20; // Adjust as needed for readability

    // Number of columns based on canvas width and font size
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize columns data
    const initializeColumns = () => {
      columnsRef.current = []; // Reset columns

      for (let i = 0; i < columns; i++) {
        const speed = 0.5 + Math.random() * 0.5; // Random speed between 0.5 and 1
        const numLetters = Math.floor(canvas.height / (fontSize * 1.5)); // Number of letters per column

        const lettersInColumn = [];

        for (let j = 0; j < numLetters; j++) {
          const y = j * (fontSize + 10); // 10px spacing between letters
          const letter = {
            x: i * fontSize,
            y: y,
            letter: letters.charAt(Math.floor(Math.random() * letters.length))
          };
          lettersInColumn.push(letter);
        }

        columnsRef.current.push({
          speed: speed,
          letters: lettersInColumn
        });
      }
    };

    initializeColumns();

    // Function to draw and update letters
    const animate = () => {
      // Clear the canvas with white background
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Solid white background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set letter styles
      ctx.fillStyle = '#808080'; // Grey letters
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      // Update and draw each column's letters
      columnsRef.current.forEach(column => {
        column.letters.forEach(letter => {
          ctx.fillText(letter.letter, letter.x, letter.y);
          letter.y += column.speed;

          // If letter moves beyond canvas, reset to top
          if (letter.y > canvas.height) {
            letter.y = -fontSize; // Start above the canvas
          }
        });
      });

      // Request the next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();

      // Recalculate columns based on new canvas width
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns !== columns) {
        // Reinitialize columns if the number of columns has changed
        initializeColumns();
      } else {
        // If columns remain the same, adjust letters positions
        columnsRef.current.forEach(column => {
          column.letters.forEach(letter => {
            if (letter.y > canvas.height) {
              letter.y = -fontSize;
            }
          });
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return <canvas className="matrix-canvas" ref={canvasRef}></canvas>;
}

export default MatrixBackground;
