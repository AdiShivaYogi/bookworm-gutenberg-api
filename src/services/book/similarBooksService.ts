import { Book } from "@/types/gutendex";
import { callPerplexityApi } from "../api/perplexityApiService";
import { hasValidApiKey } from "../api/perplexityApiConfig";
import { fetchRealBooksFromRecommendations, getFallbackRecommendations } from "./bookSearchUtils";

// Generate similar books recommendations
export const generateSimilarBooksRecommendation = async (
  book: Book,
  numberOfRecommendations: number = 10
): Promise<Book[]> => {
  try {
    if (!hasValidApiKey()) {
      return await getFallbackRecommendations(book);
    }

    const prompt = `
      I have just read "${book.title}" by ${book.authors.map(a => a.name).join(', ')}.
      Based on this book, please recommend ${numberOfRecommendations} similar books with their titles and authors.
      Focus on classic books that would likely be in Project Gutenberg (public domain books published before 1927).
      Format your response as a JSON array of objects with "title" and "author" properties.
      Only include the JSON in your response, nothing else.
    `;

    const content = await callPerplexityApi(prompt);

    try {
      // Extract the JSON part from the response
      const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
      const jsonContent = jsonMatch ? jsonMatch[0] : content;
      const recommendations = JSON.parse(jsonContent);
      
      // Fetch real books from Gutenberg for each recommended book
      const realBooks = await fetchRealBooksFromRecommendations(recommendations);
      return realBooks;
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError);
      return await getFallbackRecommendations(book);
    }
  } catch (error) {
    console.error("Failed to generate recommendations:", error);
    return await getFallbackRecommendations(book);
  }
};
