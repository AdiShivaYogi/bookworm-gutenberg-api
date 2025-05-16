
import React from 'react';
import { BookCollection } from '@/hooks/useBookRecommendations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BookListItemCompact from './BookListItemCompact';

interface CollectionDisplayProps {
  collection: BookCollection;
  onCreateNewCollection: () => void;
}

const CollectionDisplay: React.FC<CollectionDisplayProps> = ({ 
  collection, 
  onCreateNewCollection 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{collection.title}</h3>
        <Badge variant="outline" className="ml-2">
          {collection.books.length} cărți
        </Badge>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {collection.books.map((book, index) => (
          <BookListItemCompact key={index} book={book} />
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onCreateNewCollection}>
          Creează altă colecție
        </Button>
      </div>
    </div>
  );
};

export default CollectionDisplay;
