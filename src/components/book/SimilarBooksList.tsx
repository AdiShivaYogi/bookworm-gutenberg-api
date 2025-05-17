
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/gutendex';
import { getBookCoverImage } from '@/services/bookService';
import { Link } from 'react-router-dom';

interface SimilarBooksListProps {
  recommendations: Book[];
  onRefresh: () => void;
}

const SimilarBooksList: React.FC<SimilarBooksListProps> = ({ recommendations, onRefresh }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((book: Book, index) => {
          const coverImage = book.formats ? getBookCoverImage(book) : '/placeholder.svg';
          const authorNames = book.authors?.map(author => author.name).join(', ') || 'Autor necunoscut';
          
          return (
            <Link to={`/book/${book.id}`} key={index} className="flex gap-3 items-start border rounded-md p-3 hover:bg-accent/10 transition-colors">
              <div className="h-24 w-16 flex-shrink-0">
                <img 
                  src={coverImage}
                  alt={`Coperta pentru ${book.title}`}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <div>
                <h3 className="font-medium line-clamp-2">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{authorNames}</p>
              </div>
            </Link>
          );
        })}
      </div>
      
      <Button variant="outline" onClick={onRefresh} className="w-full">
        <Search className="mr-2 h-4 w-4" /> Regenerează recomandări
      </Button>
    </div>
  );
};

export default SimilarBooksList;
