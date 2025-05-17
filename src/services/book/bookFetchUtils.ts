
import { Book } from "@/types/gutendex";
import { fetchBooks } from "../bookService";
import { sortRecommendationsByAuthorPriority } from "./authorUtils";
import { 
  searchByTitleAndAuthor, 
  searchByExactTitle, 
  searchByAuthorAndFirstTitleWord, 
  searchByPartialTitle, 
  searchByAuthorLastName 
} from "./searchStrategies";

/**
 * Helper function to fetch a single book from Gutenberg with multiple search strategies
 */
export const fetchBookFromGutenberg = async (title: string, author: string): Promise<Book | null> => {
  try {
    // Try different search strategies in order of precision
    const searchStrategies = [
      // Strategy 1: Title + Author (exact match attempt)
      () => searchByTitleAndAuthor(title, author),
      
      // Strategy 2: Title only with quotes for exact match
      () => searchByExactTitle(title),
      
      // Strategy 3: Author exact match + first word of title
      () => searchByAuthorAndFirstTitleWord(title, author),
      
      // Strategy 4: Try with part of the title (first two or three words)
      () => searchByPartialTitle(title),
      
      // Strategy 5: Author only
      () => searchByAuthorLastName(author)
    ];
    
    // Try each strategy until a book is found
    for (const strategy of searchStrategies) {
      const book = await strategy();
      if (book) {
        return book;
      }
    }
    
    console.log(`Could not find book "${title}" by ${author} in Gutenberg`);
    return null;
  } catch (error) {
    console.error(`Error fetching book "${title}":`, error);
    return null;
  }
};

/**
 * Fetch real books from Gutenberg based on AI recommendations with improved matching
 */
export const fetchRealBooksFromRecommendations = async (recommendations: Array<{title: string, author: string}>) => {
  const books: Array<Book> = [];
  const batchSize = 5;
  const maxBooks = 20;
  
  // Sort recommendations to prioritize well-known authors
  const sortedRecommendations = sortRecommendationsByAuthorPriority(recommendations);
  
  console.log("Processing recommendations in priority order");
  
  // Process recommendations in batches to avoid API rate limits
  for (let i = 0; i < Math.min(sortedRecommendations.length, maxBooks); i += batchSize) {
    const batch = sortedRecommendations.slice(i, i + batchSize);
    const batchPromises = batch.map(rec => {
      return fetchBookFromGutenberg(rec.title, rec.author);
    });
    
    const batchResults = await Promise.all(batchPromises);
    const validResults = batchResults.filter(book => book !== null) as Book[];
    
    // Check for duplicates before adding to collection
    validResults.forEach(book => {
      if (!books.some(existingBook => existingBook.id === book.id)) {
        books.push(book);
      }
    });
    
    // Add a small delay between batches to be nice to the API
    if (i + batchSize < recommendations.length) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // If we already have enough books, we can stop
    if (books.length >= 10) {
      console.log(`Found ${books.length} books, which is enough for a good collection`);
      break;
    }
  }
  
  // If we don't have enough books, try searching by popular categories
  if (books.length < 5) {
    console.log("Not enough books found, searching by general categories");
    const popularCategories = ["fiction", "classic", "adventure", "romance", "philosophy"];
    
    for (const category of popularCategories) {
      if (books.length >= 10) break;
      
      try {
        const response = await fetchBooks({
          search: category,
          sort: "popular",
          limit: 5,
        });
        
        if (response.results) {
          // Add non-duplicate books
          response.results.forEach(book => {
            if (!books.some(existingBook => existingBook.id === book.id)) {
              books.push(book);
            }
          });
        }
      } catch (error) {
        console.error(`Error fetching category ${category}:`, error);
      }
    }
  }
  
  console.log(`Final collection has ${books.length} books`);
  return books;
};

