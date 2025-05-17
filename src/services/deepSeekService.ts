
import { Book } from "@/types/gutendex";
import { fetchBooks } from "./bookService";

// Configurare API
let PERPLEXITY_API_KEY = ""; // Cheia va fi setată dinamic
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

export interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface PerplexityConfig {
  apiKey: string;
}

// Funcție pentru setarea cheii API
export const setPerplexityApiKey = (apiKey: string) => {
  PERPLEXITY_API_KEY = apiKey;
  localStorage.setItem('perplexity_api_key', apiKey);
};

// Funcție pentru a obține cheia API
export const getPerplexityApiKey = (): string => {
  if (!PERPLEXITY_API_KEY) {
    const storedKey = localStorage.getItem('perplexity_api_key');
    if (storedKey) {
      PERPLEXITY_API_KEY = storedKey;
    }
  }
  return PERPLEXITY_API_KEY;
};

// Verifică dacă există un API key valid
export const hasValidApiKey = (): boolean => {
  return !!getPerplexityApiKey();
};

// Funcție generală pentru a face apeluri către API
const callPerplexityApi = async (prompt: string): Promise<string> => {
  const apiKey = getPerplexityApiKey();
  if (!apiKey) {
    throw new Error("API key is required");
  }

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online", // Model mai robust
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

// Generate similar books recommendations
export const generateSimilarBooksRecommendation = async (
  book: Book,
  numberOfRecommendations: number = 10
): Promise<Book[]> => {
  try {
    const apiKey = getPerplexityApiKey();
    if (!apiKey) {
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

// Create a personalized collection based on user input
export const createPersonalizedCollection = async (
  prompt: string,
  numberOfBooks: number = 20
): Promise<{ title: string; books: Array<Book> }> => {
  try {
    const apiKey = getPerplexityApiKey();
    if (!apiKey) {
      return await getFallbackCollection(prompt);
    }

    const apiPrompt = `
      Create a personalized book collection based on this request: "${prompt}".
      Generate a title for this collection and recommend ${numberOfBooks} books that match the criteria.
      IMPORTANT: Make sure the title accurately reflects the content and doesn't promise more books than what will be shown (around ${numberOfBooks} books).
      Focus on classic books that would likely be in Project Gutenberg (public domain books published before 1927).
      Format your response as a JSON object with "title" and "books" properties.
      The "books" property should be an array of objects with "title" and "author" properties.
      Only include the JSON in your response, nothing else.
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

// Fallback pentru recomandări prin căutare directă în Gutenberg
const getFallbackRecommendations = async (book: Book): Promise<Book[]> => {
  try {
    // Folosim titlul și autorul pentru a găsi cărți similare
    const authorName = book.authors[0]?.name || "";
    const response = await fetchBooks({
      search: authorName,
      limit: 10,
    });

    if (response.results && response.results.length > 0) {
      return response.results;
    }

    // Dacă nu găsim nimic după autor, încercăm cu titlul
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

// Fallback pentru colecții prin căutare directă în Gutenberg
const getFallbackCollection = async (prompt: string): Promise<{ title: string; books: Array<Book> }> => {
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

// Fetch real books from Gutenberg based on AI recommendations with improved matching
const fetchRealBooksFromRecommendations = async (recommendations: Array<{title: string, author: string}>) => {
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
const fetchBookFromGutenberg = async (title: string, author: string): Promise<Book | null> => {
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
