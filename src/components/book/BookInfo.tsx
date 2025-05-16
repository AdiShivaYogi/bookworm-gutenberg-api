
import React from 'react';
import { Globe, Calendar, Users, Tag } from 'lucide-react';
import { Book } from '@/types/gutendex';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BookInfoProps {
  book: Book;
}

const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
      
      {/* Authors */}
      <div className="mb-6">
        {book.authors.map((author, index) => (
          <span key={index} className="text-lg">
            {author.name}
            {author.birth_year || author.death_year ? (
              <span className="text-muted-foreground">
                {' '}({author.birth_year || '?'} - {author.death_year || '?'})
              </span>
            ) : null}
            {index < book.authors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
      
      {/* Stats & Info */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Globe className="mr-1 h-4 w-4" />
          {book.languages.map(lang => lang.toUpperCase()).join(', ')}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1 h-4 w-4" />
          {book.download_count.toLocaleString()} downloads
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {book.copyright === null 
            ? 'Unknown copyright' 
            : book.copyright 
              ? 'Copyrighted' 
              : 'Public Domain'
          }
        </div>
      </div>
      
      {/* Subjects & Bookshelves */}
      {book.subjects && book.subjects.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2 flex items-center">
            <Tag className="mr-2 h-4 w-4" /> Subjects
          </h3>
          <div className="flex flex-wrap gap-2">
            {book.subjects.map((subject, index) => (
              <Badge key={index} variant="secondary">{subject}</Badge>
            ))}
          </div>
        </div>
      )}
      
      {book.bookshelves && book.bookshelves.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Bookshelves</h3>
          <div className="flex flex-wrap gap-2">
            {book.bookshelves.map((shelf, index) => (
              <Badge key={index} variant="outline">{shelf}</Badge>
            ))}
          </div>
        </div>
      )}
      
      <Separator className="my-6" />
      
      {/* Translators if any */}
      {book.translators && book.translators.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Translators</h3>
          <p>
            {book.translators.map((translator, index) => (
              <span key={index}>
                {translator.name}
                {index < book.translators.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}
    </>
  );
};

export default BookInfo;
