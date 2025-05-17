
/**
 * List of authors that are prioritized in searches because they're well-represented in Gutenberg
 */
export const priorityAuthors = [
  "Jane Austen", "Charles Dickens", "Mark Twain", "Fyodor Dostoyevsky", 
  "Leo Tolstoy", "Victor Hugo", "Herman Melville", "Oscar Wilde",
  "William Shakespeare", "Jules Verne", "H.G. Wells", "Edgar Allan Poe",
  "Lewis Carroll", "Mary Shelley", "Bram Stoker", "Homer", "Plato",
  "Aristotle", "Alexandre Dumas", "Arthur Conan Doyle", "Brothers Grimm",
  "Hans Christian Andersen", "Jack London", "Rudyard Kipling", "Louisa May Alcott",
  "Nathaniel Hawthorne", "Henry James", "Kate Chopin", "Franz Kafka"
];

/**
 * Sorts recommendations to prioritize books by well-known authors
 */
export const sortRecommendationsByAuthorPriority = (
  recommendations: Array<{title: string, author: string}>
): Array<{title: string, author: string}> => {
  return [...recommendations].sort((a, b) => {
    const authorA = a.author.toLowerCase();
    const authorB = b.author.toLowerCase();
    
    const isPriorityA = priorityAuthors.some(author => authorA.includes(author.toLowerCase()));
    const isPriorityB = priorityAuthors.some(author => authorB.includes(author.toLowerCase()));
    
    if (isPriorityA && !isPriorityB) return -1;
    if (!isPriorityA && isPriorityB) return 1;
    return 0;
  });
};

/**
 * Romanian to English translation map for better searching in Gutenberg
 */
export const romanianToEnglishMap: Record<string, string> = {
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
  "fictiune": "fiction",
  "carti": "books",
  "literatura": "literature",
  "victoriana": "victorian",
  "rusă": "russian",
  "rusa": "russian",
  "mitologie": "mythology",
  "groază": "horror",
  "groaza": "horror",
  "detective": "detective",
  "politiste": "mystery"
};

/**
 * Translates Romanian search terms to English for better Gutenberg API results
 */
export const translateSearchTerms = (prompt: string): string => {
  let category = prompt;
  
  for (const [romanian, english] of Object.entries(romanianToEnglishMap)) {
    if (prompt.toLowerCase().includes(romanian)) {
      category = english;
      break;
    }
  }
  
  return category;
};

