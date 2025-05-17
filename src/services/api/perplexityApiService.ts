
import { getPerplexityApiKey, getPerplexityApiUrl } from './perplexityApiConfig';

export interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// Function to make API calls to Perplexity
export const callPerplexityApi = async (prompt: string): Promise<string> => {
  const apiKey = getPerplexityApiKey();
  if (!apiKey) {
    throw new Error("API key is required");
  }

  try {
    const response = await fetch(getPerplexityApiUrl(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online", // More robust model
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0]?.message.content || "";
  } catch (error) {
    console.error("Failed to call Perplexity API:", error);
    throw error;
  }
};
