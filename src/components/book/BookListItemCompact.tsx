
import React from 'react';
import { BookOpen } from 'lucide-react';
import { BookRecommendation } from '@/hooks/useBookRecommendations';

interface BookListItemCompactProps {
  book: BookRecommendation;
}

const BookListItemCompact: React.FC<BookListItemCompactProps> = ({ book }) => {
  return (
    <div className="flex gap-3 items-start border-b pb-3 last:border-0">
      <div className="bg-muted h-16 w-12 rounded flex items-center justify-center">
        <BookOpen className="text-muted-foreground h-6 w-6" />
      </div>
      <div>
        <h4 className="font-medium">{book.title}</h4>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </div>
    </div>
  );
};

export default BookListItemCompact;
