import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API key from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

class GeminiLLM {
  constructor() {
    console.log("Using API Key:", apiKey);  // Verify API key
    this.genAI = new GoogleGenerativeAI(apiKey);

    // Define and configure the model
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  }

  // Function to generate words from the Gemini API based on the theme
  async generateWordsFromTheme(theme) {
    const prompt = `Provide a list of 10 words in JSON format based on this theme: "${theme}"`;

    try {
      // Fetch the response from the model using the prompt
      const response = await this.model.generateContent(prompt);

      // Log the full response (useful for debugging)
      console.log("Full Response:", response);

      // STEP 1: Correctly access the nested 'candidates' property
      const jsonString = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!jsonString) {
        // Handle the case where the API doesn't return the needed response
        throw new Error("Response did not contain the expected text content.");
      }

      // Log the extracted string (for debugging)
      console.log("Extracted JSON String:", jsonString);

      // Return the raw JSON string without any cleaning
      return jsonString;
    } catch (error) {
      console.error("Error generating words:", error.message);
      throw new Error("Failed to generate words from the LLM.");
    }
  }
}

// Export the class instance for use elsewhere in the app
const geminiLLM = new GeminiLLM();
export default geminiLLM;
