
import { Book } from "@/types/gutendex";

// DeepSeek API configuration
const DEEPSEEK_API_KEY = "sk-4cc3458c366347a3bd3c3aa09289ceef";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// Generate similar books recommendations
export const generateSimilarBooksRecommendation = async (
  book: Book,
  numberOfRecommendations: number = 5
): Promise<string[]> => {
  try {
    const prompt = `
      I have just read "${book.title}" by ${book.authors.map(a => a.name).join(', ')}.
      Based on this book, please recommend ${numberOfRecommendations} similar books with their titles and authors.
      The books should have similar themes, style, or subject matter.
      Format your response as a JSON array of objects with "title" and "author" properties.
      Only include the JSON in your response, nothing else.
    `;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
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
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0]?.message.content;

    try {
      // Extract the JSON part from the response
      const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
      const jsonContent = jsonMatch ? jsonMatch[0] : content;
      const recommendations = JSON.parse(jsonContent);
      return recommendations;
    } catch (parseError) {
      console.error("Failed to parse DeepSeek response:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Failed to generate recommendations:", error);
    return [];
  }
};

// Create a personalized collection based on user input
export const createPersonalizedCollection = async (
  prompt: string,
  numberOfBooks: number = 8
): Promise<{ title: string; books: string[] }> => {
  try {
    const apiPrompt = `
      Create a personalized book collection based on this request: "${prompt}".
      Generate a title for this collection and recommend ${numberOfBooks} books that match the criteria.
      Format your response as a JSON object with "title" and "books" properties.
      The "books" property should be an array of objects with "title" and "author" properties.
      Only include the JSON in your response, nothing else.
    `;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: apiPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0]?.message.content;

    try {
      // Extract the JSON part from the response
      const jsonMatch = content.match(/\{.*\}/s);
      const jsonContent = jsonMatch ? jsonMatch[0] : content;
      const collection = JSON.parse(jsonContent);
      return {
        title: collection.title,
        books: collection.books
      };
    } catch (parseError) {
      console.error("Failed to parse DeepSeek response:", parseError);
      return {
        title: "Colecție personalizată",
        books: []
      };
    }
  } catch (error) {
    console.error("Failed to create personalized collection:", error);
    return {
      title: "Colecție personalizată",
      books: []
    };
  }
};
