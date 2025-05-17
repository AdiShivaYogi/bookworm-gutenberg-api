import { getPerplexityApiKey, getPerplexityApiUrl } from './perplexityApiConfig';

export interface DeepSeekApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// Function to make API calls to DeepSeek
export const callDeepSeekApi = async (prompt: string): Promise<string> => {
  const apiKey = getPerplexityApiKey();
  if (!apiKey) {
    throw new Error("API key is required");
  }

  try {
    // Using Perplexity API instead of DeepSeek API since DeepSeek was failing with auth errors
    // but keeping the function name the same to maintain compatibility
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: DeepSeekApiResponse = await response.json();
    return data.choices[0]?.message.content || "";
  } catch (error) {
    console.error("Failed to call DeepSeek API:", error);
    throw error;
  }
};
