
import { useState } from 'react';
import { Book } from '@/types/gutendex';
import { generateSimilarBooksRecommendation, createPersonalizedCollection, hasValidApiKey } from '@/services/deepSeekService';
import { useToast } from '@/hooks/use-toast';

export interface BookRecommendation {
  title: string;
  author: string;
}

export interface BookCollection {
  title: string;
  books: Book[] | BookRecommendation[];
}

export const useBookRecommendations = (book: Book | null) => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [collection, setCollection] = useState<BookCollection | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);

  // Get similar books based on current book
  const getSimilarBooks = async () => {
    if (!book) return;

    if (!hasValidApiKey()) {
      toast({
        title: "Configurare necesară",
        description: "Trebuie să configurezi o cheie API Perplexity pentru a putea genera recomandări.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingRecommendations(true);
    try {
      const result = await generateSimilarBooksRecommendation(book);
      setRecommendations(result);
      
      toast({
        title: "Recomandări generate",
        description: `Am găsit ${result.length} cărți similare pentru tine!`,
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera recomandări. Verifică cheia API și încearcă din nou mai târziu.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Create a personalized collection
  const createCollection = async (prompt: string) => {
    if (!hasValidApiKey()) {
      toast({
        title: "Configurare necesară",
        description: "Trebuie să configurezi o cheie API Perplexity pentru a putea crea colecții.",
        variant: "destructive",
      });
      return null;
    }

    setIsLoadingCollection(true);
    try {
      const result = await createPersonalizedCollection(prompt);
      setCollection({
        title: result.title,
        books: result.books
      });
      
      toast({
        title: "Colecție creată",
        description: `Colecția "${result.title}" a fost creată cu succes cu ${result.books.length} cărți!`,
      });

      return result;
    } catch (error) {
      console.error("Error creating collection:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut crea colecția. Verifică cheia API și încearcă din nou mai târziu.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoadingCollection(false);
    }
  };

  return {
    recommendations,
    collection,
    isLoadingRecommendations,
    isLoadingCollection,
    getSimilarBooks,
    createCollection,
  };
};
