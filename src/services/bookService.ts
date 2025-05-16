
import { BookListResponse, Book } from "../types/gutendex";

const API_URL = "https://gutendex.com";

interface BookQueryParams {
  search?: string;
  languages?: string;
  topic?: string;
  sort?: "popular" | "ascending" | "descending";
  page?: number;
}

export const fetchBooks = async (params: BookQueryParams = {}): Promise<BookListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append("search", params.search);
    if (params.languages) queryParams.append("languages", params.languages);
    if (params.topic) queryParams.append("topic", params.topic);
    if (params.sort) queryParams.append("sort", params.sort);
    if (params.page) queryParams.append("page", params.page.toString());
    
    const url = `${API_URL}/books?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }
    
    const data: BookListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }
};

export const fetchBookById = async (id: number): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching book with ID ${id}: ${response.statusText}`);
    }
    
    const book: Book = await response.json();
    return book;
  } catch (error) {
    console.error(`Failed to fetch book with ID ${id}:`, error);
    throw error;
  }
};

export const getBookCoverImage = (book: Book): string => {
  // Try to get the image in order of preference
  const imageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif"
  ];
  
  for (const type of imageTypes) {
    if (book.formats[type]) {
      return book.formats[type];
    }
  }
  
  // Return a default cover if no image is available
  return "/book-cover-placeholder.jpg";
};

export const getBookFormats = (book: Book) => {
  const result: { [key: string]: string } = {};
  
  // Mapping of MIME types to readable format names
  const formatNames: { [key: string]: string } = {
    "text/html": "HTML",
    "application/epub+zip": "EPUB",
    "application/x-mobipocket-ebook": "Kindle",
    "text/plain": "Plain Text",
    "application/pdf": "PDF",
    "text/plain; charset=us-ascii": "Plain Text (ASCII)",
    "text/plain; charset=utf-8": "Plain Text (UTF-8)",
  };
  
  Object.entries(book.formats).forEach(([mimeType, url]) => {
    // Skip image files
    if (mimeType.startsWith("image/")) return;
    
    const formatName = formatNames[mimeType] || mimeType;
    result[formatName] = url;
  });
  
  return result;
};
