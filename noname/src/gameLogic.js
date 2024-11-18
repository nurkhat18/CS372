import geminiLLM from './llm';

// Function to handle the overall game flow (generating words from theme)
export async function startGame(theme) {
  if (!theme) {
    throw new Error("Please provide a theme to start the game.");
  }

  try {
    const jsonResponse = await geminiLLM.generateWordsFromTheme(theme);

    // Extract the "word" fields from the parsed JSON array of objects
    const words = jsonResponse.map(item => item.word);

    // Log the extracted words for debugging
    console.log("Extracted Words:", words);

    // Return only the first 10 words
    return words.slice(0, 10);  // Return an array of just the word strings
  } catch (error) {
    console.error("Failed to start the game:", error);
    throw new Error("Game initialization failed. Could not generate words.");
  }
}