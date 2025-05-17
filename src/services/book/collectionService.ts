
import { Book } from "@/types/gutendex";
import { callPerplexityApi } from "../api/perplexityApiService";
import { hasValidApiKey } from "../api/perplexityApiConfig";
import { fetchRealBooksFromRecommendations, getFallbackCollection } from "./bookSearchUtils";

// Create a personalized collection based on user input
export const createPersonalizedCollection = async (
  prompt: string,
  numberOfBooks: number = 20
): Promise<{ title: string; books: Array<Book> }> => {
  try {
    if (!hasValidApiKey()) {
      return await getFallbackCollection(prompt);
    }

    const apiPrompt = `
      Create a personalized book collection based on this request: "${prompt}".
      Generate a title for this collection and recommend ${numberOfBooks} books that match the criteria.
      CRITICALLY IMPORTANT: Only include books that are in the public domain (published before 1927) and likely available in Project Gutenberg.
      Focus on well-known classic books by famous authors.
      Include a mix of titles and make sure to include author's full names.
      Avoid modern books, obscure works, or anything published after 1927.
      
      Format your response as a JSON object with "title" and "books" properties.
      The "books" property should be an array of objects with "title" and "author" properties.
      Only include the JSON in your response, nothing else.
      
      Example:
      {
        "title": "Great Classics of the 19th Century",
        "books": [
          {"title": "Pride and Prejudice", "author": "Jane Austen"},
          {"title": "Moby-Dick", "author": "Herman Melville"}
        ]
      }
    `;

    const content = await callPerplexityApi(apiPrompt);

    try {
      // Extract the JSON part from the response
      const jsonMatch = content.match(/\{.*\}/s);
      const jsonContent = jsonMatch ? jsonMatch[0] : content;
      const collection = JSON.parse(jsonContent);
      
      // Try to find real books from Gutenberg matching the AI recommendations
      const title = collection.title;
      const recommendedBooks = collection.books;
      
      // Fetch real books from Gutenberg for each recommended book
      const realBooks = await fetchRealBooksFromRecommendations(recommendedBooks);
      
      return {
        title,
        books: realBooks
      };
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError);
      return await getFallbackCollection(prompt);
    }
  } catch (error) {
    console.error("Failed to create personalized collection:", error);
    return await getFallbackCollection(prompt);
  }
};
