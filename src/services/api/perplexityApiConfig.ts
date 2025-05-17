
// API Key Management for Perplexity API

let PERPLEXITY_API_KEY = ""; // Key will be set dynamically
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

export interface PerplexityConfig {
  apiKey: string;
}

// Function to set the API key
export const setPerplexityApiKey = (apiKey: string) => {
  PERPLEXITY_API_KEY = apiKey;
  localStorage.setItem('perplexity_api_key', apiKey);
};

// Function to get the API key
export const getPerplexityApiKey = (): string => {
  if (!PERPLEXITY_API_KEY) {
    const storedKey = localStorage.getItem('perplexity_api_key');
    if (storedKey) {
      PERPLEXITY_API_KEY = storedKey;
    }
  }
  return PERPLEXITY_API_KEY;
};

// Check if a valid API key exists
export const hasValidApiKey = (): boolean => {
  return !!getPerplexityApiKey();
};

// Get the API URL
export const getPerplexityApiUrl = (): string => {
  return PERPLEXITY_API_URL;
};
