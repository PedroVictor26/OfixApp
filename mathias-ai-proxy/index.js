import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // To load .env variables
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = process.env.PORT || 3001; // Port for the proxy server

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// --- Gemini API Setup ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not set in environment variables.");
  // process.exit(1); // Optionally exit if key is missing, or handle gracefully
}
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const modelName = 'gemini-1.5-flash-latest'; // Or the specific model chosen

// --- API Endpoint for Chat ---
app.post('/api/chat', async (req, res) => {
  if (!genAI) {
    return res.status(500).json({ error: 'AI service is not configured (API key missing).' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required in the request body.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: modelName });

    // Simple text-only prompt
    const prompt = `You are Mathias, a helpful AI assistant for automotive workshop owners. A user says: "${message}". Provide a concise and helpful response related to workshop tools, inventory, or general workshop tasks. If the question is outside this scope, politely say you are specialized in workshop topics.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Check for specific error types if possible, e.g., rate limits, blocked content
    if (error.message && error.message.includes('SAFETY')) {
         res.status(500).json({ error: 'Response blocked due to safety settings. Please rephrase your message.' });
    } else if (error.message && error.message.includes('rate limit')) {
        res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }
    else {
        res.status(500).json({ error: 'Failed to get response from AI. ' + error.message });
    }
  }
});

// --- Health Check Endpoint ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Proxy server is running' });
});


// Start the server
app.listen(port, () => {
  console.log(`Mathias AI Proxy server listening at http://localhost:${port}`);
  if (!apiKey) {
    console.warn("Warning: GEMINI_API_KEY is not set. AI functionality will be disabled.");
  }
});
