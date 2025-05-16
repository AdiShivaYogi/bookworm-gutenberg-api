
import React from 'react';
import { BookOpen } from 'lucide-react';
import { BookRecommendation } from '@/hooks/useBookRecommendations';

interface BookListItemProps {
  book: BookRecommendation;
}

const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
  return (
    <div className="flex gap-4 items-start border-b pb-3 last:border-0">
      <div className="bg-muted h-24 w-16 rounded flex items-center justify-center">
        <BookOpen className="text-muted-foreground" />
      </div>
      <div>
        <h3 className="font-medium">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </div>
    </div>
  );
};

export default BookListItem;
