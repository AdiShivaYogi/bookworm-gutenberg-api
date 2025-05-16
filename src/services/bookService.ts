
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

// Generate placeholder book covers based on book title
export const getPlaceholderBookCover = (title: string): string => {
  // Generate a deterministic image based on the book title
  const hash = title.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Use the hash to select a color and pattern for the cover
  const hue = hash % 360;
  const saturation = 70 + (hash % 20);
  const lightness = 45 + (hash % 15);
  
  // Create a data URL for a simple gradient background
  const svgContent = `
    <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue},${saturation}%,${lightness}%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(${(hue + 40) % 360},${saturation}%,${(lightness - 15) > 0 ? (lightness - 15) : lightness}%);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" opacity="0.8">${title.substring(0, 2).toUpperCase()}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
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
