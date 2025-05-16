
import { useState } from 'react';
import { Book } from '@/types/gutendex';
import { generateSimilarBooksRecommendation, createPersonalizedCollection } from '@/services/deepSeekService';
import { useToast } from '@/hooks/use-toast';

export interface BookRecommendation {
  title: string;
  author: string;
}

export interface BookCollection {
  title: string;
  books: BookRecommendation[];
}

export const useBookRecommendations = (book: Book | null) => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
  const [collection, setCollection] = useState<BookCollection | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);

  // Get similar books based on current book
  const getSimilarBooks = async () => {
    if (!book) return;

    setIsLoadingRecommendations(true);
    try {
      const result = await generateSimilarBooksRecommendation(book);
      setRecommendations(result);
      
      toast({
        title: "Recomandări generate",
        description: "Am găsit cărți similare pentru tine!",
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera recomandări. Încearcă din nou mai târziu.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Create a personalized collection
  const createCollection = async (prompt: string) => {
    setIsLoadingCollection(true);
    try {
      const result = await createPersonalizedCollection(prompt);
      setCollection({
        title: result.title,
        books: result.books as unknown as BookRecommendation[]
      });
      
      toast({
        title: "Colecție creată",
        description: `Colecția "${result.title}" a fost creată cu succes!`,
      });

      return result;
    } catch (error) {
      console.error("Error creating collection:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut crea colecția. Încearcă din nou mai târziu.",
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
