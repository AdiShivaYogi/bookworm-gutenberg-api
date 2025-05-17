
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
  const apiKey = "sk-4cc3458c366347a3bd3c3aa09289ceef"; // Using the provided DeepSeek API key
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-chat",
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
