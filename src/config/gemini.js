import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config"; // This loads the environment variables

// Initialize the GoogleGenerativeAI client using the environment variable
const genAiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Sends a text prompt to the Gemini model and returns the generated content.
 * @param {string} prompt The text prompt to send to the model.
 * @returns {Promise<string>} A promise that resolves with the generated text.
 */
export const generateContentFromGemini = async (prompt) => {
    try {
        // Use a generally available model for production, like gemini-1.5-flash
        const model = genAiClient.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        return "Failed to get a response from the AI. Please try again.";
    }
};

export default genAiClient;