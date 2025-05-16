
import React from 'react';
import { Book } from '@/types/gutendex';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookRecommendation, useBookRecommendations } from '@/hooks/useBookRecommendations';
import { BookOpen, Search } from 'lucide-react';

interface SimilarBooksSectionProps {
  book: Book;
}

const SimilarBooksSection: React.FC<SimilarBooksSectionProps> = ({ book }) => {
  const { recommendations, isLoadingRecommendations, getSimilarBooks } = useBookRecommendations(book);

  return (
    <div className="mt-8 border rounded-md p-4 bg-muted/20">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5" /> Cărți similare
      </h2>
      
      {recommendations.length === 0 && !isLoadingRecommendations && (
        <div className="text-center py-6">
          <p className="text-muted-foreground mb-4">
            Descoperă cărți similare cu "{book.title}" generate cu ajutorul inteligenței artificiale.
          </p>
          <Button onClick={getSimilarBooks}>
            <Search className="mr-2 h-4 w-4" /> Găsește cărți similare
          </Button>
        </div>
      )}
      
      {isLoadingRecommendations && (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-24 w-16 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {recommendations.length > 0 && !isLoadingRecommendations && (
        <div className="space-y-4">
          {recommendations.map((rec: BookRecommendation, index) => (
            <div key={index} className="flex gap-4 items-start border-b pb-3 last:border-0">
              <div className="bg-muted h-24 w-16 rounded flex items-center justify-center">
                <BookOpen className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">{rec.author}</p>
              </div>
            </div>
          ))}
          
          <Button variant="outline" onClick={getSimilarBooks} className="w-full">
            <Search className="mr-2 h-4 w-4" /> Regenerează recomandări
          </Button>
        </div>
      )}
    </div>
  );
};

export default SimilarBooksSection;
