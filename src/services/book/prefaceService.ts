
import { Book } from "@/types/gutendex";
import { callDeepSeekApi } from "../api/deepSeekApiService";

// Generate an AI-powered preface for a book
export const generateBookPreface = async (book: Book): Promise<string> => {
  try {
    const authorInfo = book.authors.map(a => a.name).join(", ");
    
    const prompt = `
      Generează o prefață captivantă pentru cartea "${book.title}" scrisă de ${authorInfo}.
      Prefața ar trebui să fie scrisă într-un stil literar profesionist, să evidențieze temele principale ale cărții,
      să ofere context istoric relevant și să stârnească interesul cititorului.
      Prefața nu trebuie să depășească 500 de cuvinte și ar trebui să fie scrisă în limba română.
      Nu include fraze precum "Iată prefața" sau orice alt text meta care nu ar apărea într-o prefață reală.
    `;

    const response = await callDeepSeekApi(prompt);
    return response.trim();
  } catch (error) {
    console.error("Error generating book preface:", error);
    throw error;
  }
};
