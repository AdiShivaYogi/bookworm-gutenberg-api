
import { Book } from "@/types/gutendex";
import { fetchBooks } from "../bookService";

/**
 * Attempts to find a book in Gutenberg using exact title and author match
 */
export const searchByTitleAndAuthor = async (title: string, author: string): Promise<Book | null> => {
  try {
    const exactQuery = `${title} ${author}`;
    const response = await fetchBooks({
      search: exactQuery,
      limit: 1,
    });
    return response.results?.length > 0 ? response.results[0] : null;
  } catch (error) {
    console.error(`Error in searchByTitleAndAuthor for "${title}":`, error);
    return null;
  }
};

/**
 * Attempts to find a book in Gutenberg using exact title match with quotes
 */
export const searchByExactTitle = async (title: string): Promise<Book | null> => {
  try {
    const response = await fetchBooks({
      search: `"${title}"`,
      limit: 1,
    });
    return response.results?.length > 0 ? response.results[0] : null;
  } catch (error) {
    console.error(`Error in searchByExactTitle for "${title}":`, error);
    return null;
  }
};

/**
 * Attempts to find a book by exact author and first meaningful word of title
 */
export const searchByAuthorAndFirstTitleWord = async (title: string, author: string): Promise<Book | null> => {
  try {
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
  } catch (error) {
    console.error(`Error in searchByAuthorAndFirstTitleWord for "${title}":`, error);
    return null;
  }
};

/**
 * Attempts to find a book by first few words of the title
 */
export const searchByPartialTitle = async (title: string): Promise<Book | null> => {
  try {
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
  } catch (error) {
    console.error(`Error in searchByPartialTitle for "${title}":`, error);
    return null;
  }
};

/**
 * Attempts to find a book by author's last name
 */
export const searchByAuthorLastName = async (author: string): Promise<Book | null> => {
  try {
    const authorLastName = author.split(' ').pop() || author;
    if (authorLastName.length > 3) {
      const response = await fetchBooks({
        search: authorLastName,
        limit: 1,
      });
      return response.results?.length > 0 ? response.results[0] : null;
    }
    return null;
  } catch (error) {
    console.error(`Error in searchByAuthorLastName for "${author}":`, error);
    return null;
  }
};

