
import { Book } from "@/types/gutendex";
import { fetchBooks } from "../bookService";

// Fetch real books from Gutenberg based on AI recommendations with improved matching
export const fetchRealBooksFromRecommendations = async (recommendations: Array<{title: string, author: string}>) => {
  const books: Array<Book> = [];
  const batchSize = 5;
  const maxBooks = 20;
  
  // Process recommendations in batches to avoid API rate limits
  for (let i = 0; i < Math.min(recommendations.length, maxBooks); i += batchSize) {
    const batch = recommendations.slice(i, i + batchSize);
    const batchPromises = batch.map(rec => {
      return fetchBookFromGutenberg(rec.title, rec.author);
    });
    
    const batchResults = await Promise.all(batchPromises);
    books.push(...batchResults.filter(book => book !== null));
    
    // Add a small delay between batches to be nice to the API
    if (i + batchSize < recommendations.length) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  return books;
};

// Helper function to fetch a single book from Gutenberg with improved search strategy
export const fetchBookFromGutenberg = async (title: string, author: string): Promise<Book | null> => {
  try {
    // Try different search strategies in order of precision
    const searchStrategies = [
      // Strategy 1: Title + Author
      async () => {
        const query = `${title} ${author}`;
        const response = await fetchBooks({
          search: query,
          limit: 1,
        });
        return response.results?.length > 0 ? response.results[0] : null;
      },
      
      // Strategy 2: Title only
      async () => {
        const response = await fetchBooks({
          search: title,
          limit: 1,
        });
        return response.results?.length > 0 ? response.results[0] : null;
      },
      
      // Strategy 3: Author only
      async () => {
        const response = await fetchBooks({
          search: author,
          limit: 1,
        });
        return response.results?.length > 0 ? response.results[0] : null;
      },
      
      // Strategy 4: Try with part of the title (first two words)
      async () => {
        const titleFirstTwoWords = title.split(' ').slice(0, 2).join(' ');
        if (titleFirstTwoWords.length > 3) {
          const response = await fetchBooks({
            search: titleFirstTwoWords,
            limit: 1,
          });
          return response.results?.length > 0 ? response.results[0] : null;
        }
        return null;
      }
    ];
    
    // Try each strategy until a book is found
    for (const strategy of searchStrategies) {
      const book = await strategy();
      if (book) {
        return book;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching book "${title}":`, error);
    return null;
  }
};

// Fallback for recommendations by direct search in Gutenberg
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

// Fallback for collections by direct search in Gutenberg
export const getFallbackCollection = async (prompt: string): Promise<{ title: string; books: Array<Book> }> => {
  try {
    const searchWords = prompt.split(' ').slice(0, 3).join(' ');
    const response = await fetchBooks({
      search: searchWords,
      limit: 20,
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
