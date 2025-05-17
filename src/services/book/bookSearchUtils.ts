
import { Book } from "@/types/gutendex";
import { fetchBooks } from "../bookService";

// Fetch real books from Gutenberg based on AI recommendations with improved matching
export const fetchRealBooksFromRecommendations = async (recommendations: Array<{title: string, author: string}>) => {
  const books: Array<Book> = [];
  const batchSize = 5;
  const maxBooks = 20;
  
  // Sort recommendations by importance/likelihood of finding them
  // This is a simple heuristic - we prioritize well-known authors
  const priorityAuthors = [
    "Jane Austen", "Charles Dickens", "Mark Twain", "Fyodor Dostoyevsky", 
    "Leo Tolstoy", "Victor Hugo", "Herman Melville", "Oscar Wilde",
    "William Shakespeare", "Jules Verne", "H.G. Wells", "Edgar Allan Poe",
    "Lewis Carroll", "Mary Shelley", "Bram Stoker", "Homer", "Plato"
  ];
  
  // Sort recommendations so that books by priority authors come first
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const authorA = a.author.toLowerCase();
    const authorB = b.author.toLowerCase();
    
    const isPriorityA = priorityAuthors.some(author => authorA.includes(author.toLowerCase()));
    const isPriorityB = priorityAuthors.some(author => authorB.includes(author.toLowerCase()));
    
    if (isPriorityA && !isPriorityB) return -1;
    if (!isPriorityA && isPriorityB) return 1;
    return 0;
  });
  
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

// Helper function to fetch a single book from Gutenberg with improved search strategy
export const fetchBookFromGutenberg = async (title: string, author: string): Promise<Book | null> => {
  try {
    // Try different search strategies in order of precision
    const searchStrategies = [
      // Strategy 1: Title + Author (exact match attempt)
      async () => {
        const exactQuery = `${title} ${author}`;
        const response = await fetchBooks({
          search: exactQuery,
          limit: 1,
        });
        return response.results?.length > 0 ? response.results[0] : null;
      },
      
      // Strategy 2: Title only with quotes for exact match
      async () => {
        const response = await fetchBooks({
          search: `"${title}"`,
          limit: 1,
        });
        return response.results?.length > 0 ? response.results[0] : null;
      },
      
      // Strategy 3: Author exact match + first word of title
      async () => {
        const firstTitleWord = title.split(' ')[0];
        if (firstTitleWord.length > 3) { // Skip short words like "The", "A", etc.
          const query = `"${author}" ${firstTitleWord}`;
          const response = await fetchBooks({
            search: query,
            limit: 1,
          });
          return response.results?.length > 0 ? response.results[0] : null;
        }
        return null;
      },
      
      // Strategy 4: Try with part of the title (first two or three words)
      async () => {
        const titleWords = title.split(' ');
        const titleFirstWords = titleWords.slice(0, Math.min(3, titleWords.length)).join(' ');
        if (titleFirstWords.length > 3) {
          const response = await fetchBooks({
            search: titleFirstWords,
            limit: 1,
          });
          return response.results?.length > 0 ? response.results[0] : null;
        }
        return null;
      },
      
      // Strategy 5: Author only
      async () => {
        const response = await fetchBooks({
          search: author,
          limit: 1,
        });
        return response.results?.length > 0 ? response.results[0] : null;
      }
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
    // Create a more targeted search based on the prompt
    const searchWords = prompt.split(' ')
      .filter(word => word.length > 3) // Filter out short words
      .slice(0, 3).join(' '); // Take up to 3 meaningful words
    
    // Try to extract a category or theme from the prompt
    let category = searchWords;
    
    // Map of common Romanian words/phrases to English equivalents for better searching
    const romanianToEnglish: Record<string, string> = {
      "filosofie": "philosophy",
      "dragoste": "romance love",
      "aventura": "adventure",
      "clasice": "classic",
      "importante": "famous",
      "romane": "novels",
      "poezii": "poetry",
      "povesti": "stories",
      "science": "science",
      "stiinta": "science",
      "fictiune": "fiction"
    };
    
    // Check if any of the Romanian words are in our map
    for (const [romanian, english] of Object.entries(romanianToEnglish)) {
      if (prompt.toLowerCase().includes(romanian)) {
        category = english;
        break;
      }
    }
    
    console.log(`Using fallback search with query: "${category}"`);
    
    const response = await fetchBooks({
      search: category,
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
