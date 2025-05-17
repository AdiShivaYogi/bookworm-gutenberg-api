
import React from 'react';
import { BookCollection } from '@/hooks/useBookRecommendations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/gutendex';
import { getBookCoverImage } from '@/services/bookService';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

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
        {collection.books.map((book, index) => {
          // Check if book is a Book object (from Gutenberg) or a BookRecommendation
          if ('id' in book) {
            const gutenbergBook = book as Book;
            const coverImage = gutenbergBook.formats ? getBookCoverImage(gutenbergBook) : '/placeholder.svg';
            const authorNames = gutenbergBook.authors?.map(author => author.name).join(', ') || 'Autor necunoscut';
            
            return (
              <Link to={`/book/${gutenbergBook.id}`} key={index} className="flex gap-3 items-start border-b pb-3 last:border-0 hover:bg-accent/5 transition-colors">
                <div className="bg-muted h-16 w-12 rounded flex-shrink-0 overflow-hidden">
                  <img 
                    src={coverImage}
                    alt={`Coperta pentru ${gutenbergBook.title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium line-clamp-2">{gutenbergBook.title}</h4>
                  <p className="text-sm text-muted-foreground">{authorNames}</p>
                </div>
              </Link>
            );
          } else {
            // Fall back to BookRecommendation display
            const recommendationBook = book;
            return (
              <div key={index} className="flex gap-3 items-start border-b pb-3 last:border-0">
                <div className="bg-muted h-16 w-12 rounded flex items-center justify-center">
                  <BookOpen className="text-muted-foreground h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">{recommendationBook.title}</h4>
                  <p className="text-sm text-muted-foreground">{recommendationBook.author}</p>
                </div>
              </div>
            );
          }
        })}
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
