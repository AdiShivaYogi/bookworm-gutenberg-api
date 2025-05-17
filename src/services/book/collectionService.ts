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
      Generate a title for this collection and recommend EXACTLY ${numberOfBooks} books that match the criteria.
      
      CRITICALLY IMPORTANT: Only include books that are in the public domain (published before 1927) and actually available in Project Gutenberg.
      Focus EXCLUSIVELY on well-known classic books by famous authors that are GUARANTEED to be in Project Gutenberg.
      
      Do NOT include:
      - Modern books (published after 1927)
      - Obscure authors or works
      - Books not widely available in public domain
      - Made-up titles or non-existent books
      
      To ensure the books are available in Project Gutenberg, include ONLY works by these authors and their contemporaries:
      Jane Austen, Charles Dickens, Mark Twain, Fyodor Dostoyevsky, Leo Tolstoy, Victor Hugo, Herman Melville, 
      Oscar Wilde, William Shakespeare, Jules Verne, H.G. Wells, Edgar Allan Poe, Lewis Carroll, Mary Shelley, 
      Bram Stoker, Homer, Plato, Aristotle, Alexandre Dumas, Arthur Conan Doyle, Brothers Grimm, Hans Christian Andersen, 
      Jack London, Rudyard Kipling, Louisa May Alcott, Nathaniel Hawthorne, Henry James, and other similar classic authors.
      
      For this specific request: "${prompt}", focus on these aspects:
      - The exact literary period, genres, and themes most relevant to this request
      - Including only the most famous and widely available public domain works
      - Ensuring all author names are complete and correctly spelled
      - Providing precise, well-known titles exactly as they appear in Gutenberg
      
      Format your response as a JSON object with "title" and "books" properties.
      The "books" property should be an array of objects with "title" and "author" properties.
      Make sure every title and author name is precise and matches the exact format in Gutenberg.
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
      
      console.log(`Generated collection "${title}" with ${recommendedBooks.length} recommendations`);
      
      // Fetch real books from Gutenberg for each recommended book
      const realBooks = await fetchRealBooksFromRecommendations(recommendedBooks);
      
      console.log(`Found ${realBooks.length} real books in Gutenberg matching recommendations`);
      
      // If we found fewer than 5 books, try the fallback
      if (realBooks.length < 5) {
        console.log("Not enough matches found, using fallback collection");
        const fallbackCollection = await getFallbackCollection(prompt);
        
        // If we got some books from our first attempt, add them to the fallback
        if (realBooks.length > 0) {
          // Add non-duplicate books from our first attempt
          realBooks.forEach(book => {
            if (!fallbackCollection.books.some(fb => fb.id === book.id)) {
              fallbackCollection.books.unshift(book);
            }
          });
        }
        
        // Keep the AI-generated title if available
        return {
          title: title || fallbackCollection.title,
          books: fallbackCollection.books
        };
      }
      
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
