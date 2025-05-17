
import { Book } from "@/types/gutendex";
import { fetchBooks } from "../bookService";
import { translateSearchTerms } from "./authorUtils";

/**
 * Fallback for recommendations by direct search in Gutenberg
 */
export const getFallbackRecommendations = async (book: Book): Promise<Book[]> => {
  try {
    // Use title and author to find similar books
    const authorName = book.authors[0]?.name || "";
    const response = await fetchBooks({
      search: authorName,
      limit: 10,
    });

    if (response.results && response.results.length > 0) {
      return response.results;
    }

    // If no results by author, try with the title
    const titleWords = book.title.split(' ').slice(0, 2).join(' ');
    const titleResponse = await fetchBooks({
      search: titleWords,
      limit: 10,
    });

    return titleResponse.results || [];
  } catch (error) {
    console.error("Fallback recommendation error:", error);
    return [];
  }
};

/**
 * Fallback for collections by direct search in Gutenberg
 */
export const getFallbackCollection = async (prompt: string): Promise<{ title: string; books: Array<Book> }> => {
  try {
    // Create a more targeted search based on the prompt
    const searchWords = prompt.split(' ')
      .filter(word => word.length > 3) // Filter out short words
      .slice(0, 3).join(' '); // Take up to 3 meaningful words
    
    // Try to extract a category or theme from the prompt
    let category = translateSearchTerms(searchWords);
    
    console.log(`Using fallback search with query: "${category}"`);
    
    const response = await fetchBooks({
      search: category,
      limit: 20,
      sort: "popular"
    });

    return {
      title: `Colecție de cărți pentru "${prompt}"`,
      books: response.results || []
    };
  } catch (error) {
    console.error("Fallback collection error:", error);
    return {
      title: `Colecție de cărți pentru "${prompt}"`,
      books: []
    };
  }
};

