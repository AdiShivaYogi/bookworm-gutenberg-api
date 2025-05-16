
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types/gutendex';
import { getBookCoverImage } from '@/services/bookService';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverImage = getBookCoverImage(book);
  
  // Properly format author names
  const authorNames = book.authors.map(author => author.name).join(', ');
  
  // Extract primary language
  const primaryLanguage = book.languages[0]?.toUpperCase() || 'N/A';
  
  // Format download count
  const formatDownloadCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  return (
    <Link to={`/book/${book.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
        <CardContent className="p-0 aspect-[2/3] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10" />
          
          <img 
            src={coverImage}
            alt={`Cover for ${book.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, replace with fallback
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          
          <div className="absolute top-2 right-2 z-20">
            <Badge variant="secondary" className="bg-white/80 text-xs">
              {primaryLanguage}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col items-start gap-1 pt-3">
          <h3 className="font-medium text-sm line-clamp-2">{book.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{authorNames}</p>
          
          <div className="mt-2 flex items-center justify-between w-full">
            <span className="text-xs text-muted-foreground">
              {formatDownloadCount(book.download_count)} downloads
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
