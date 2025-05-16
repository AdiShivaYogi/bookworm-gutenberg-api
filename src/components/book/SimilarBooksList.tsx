
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookRecommendation } from '@/hooks/useBookRecommendations';
import BookListItem from './BookListItem';

interface SimilarBooksListProps {
  recommendations: BookRecommendation[];
  onRefresh: () => void;
}

const SimilarBooksList: React.FC<SimilarBooksListProps> = ({ recommendations, onRefresh }) => {
  return (
    <div className="space-y-4">
      {recommendations.map((rec: BookRecommendation, index) => (
        <BookListItem key={index} book={rec} />
      ))}
      
      <Button variant="outline" onClick={onRefresh} className="w-full">
        <Search className="mr-2 h-4 w-4" /> Regenerează recomandări
      </Button>
    </div>
  );
};

export default SimilarBooksList;
