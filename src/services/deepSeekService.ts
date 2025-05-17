
import { Book } from "@/types/gutendex";
import { fetchBooks } from "./bookService";

// DeepSeek API configuration
const DEEPSEEK_API_KEY = "sk-4cc3458c366347a3bd3c3aa09289ceef";
const DEEPSEEK_API_URL = "https://api.perplexity.ai/chat/completions";

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
  numberOfRecommendations: number = 10
): Promise<Book[]> => {
  try {
    const prompt = `
      I have just read "${book.title}" by ${book.authors.map(a => a.name).join(', ')}.
      Based on this book, please recommend ${numberOfRecommendations} similar books with their titles and authors.
      Focus on classic books that would likely be in Project Gutenberg (public domain books published before 1927).
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
      
      // Fetch real books from Gutenberg for each recommended book
      const realBooks = await fetchRealBooksFromRecommendations(recommendations);
      return realBooks;
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
  numberOfBooks: number = 20
): Promise<{ title: string; books: Array<Book> }> => {
  try {
    const apiPrompt = `
      Create a personalized book collection based on this request: "${prompt}".
      Generate a title for this collection and recommend ${numberOfBooks} books that match the criteria.
      IMPORTANT: Make sure the title accurately reflects the content and doesn't promise more books than what will be shown (around ${numberOfBooks} books).
      Focus on classic books that would likely be in Project Gutenberg (public domain books published before 1927).
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
        max_tokens: 1500
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
