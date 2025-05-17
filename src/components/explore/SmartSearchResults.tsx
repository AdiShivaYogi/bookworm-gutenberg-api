
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Book as BookIcon } from 'lucide-react';
import { Book } from '@/types/gutendex';
import { getBookCoverImage, getPlaceholderBookCover } from '@/services/bookService';
import { Link } from 'react-router-dom';

interface SmartSearchResultsProps {
  collection: {
    title: string;
    books: Array<Book>;
  };
  searchQuery?: string;
}

export const SmartSearchResults: React.FC<SmartSearchResultsProps> = ({ collection, searchQuery }) => {
  // Skip rendering if there are no books
  if (!collection.books.length) {
    return null;
  }
  
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20 shadow-md mb-8">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="h-5 w-5" />
          <p className="text-sm font-medium">Colecție generată cu IA</p>
        </div>
        <CardTitle className="text-xl md:text-2xl">{collection.title}</CardTitle>
        <CardDescription>
          {searchQuery ? 
            `O colecție cu ${collection.books.length} cărți bazată pe căutarea: "${searchQuery}"` : 
            `O colecție cu ${collection.books.length} cărți recomandată special pentru tine`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {collection.books.map((book, index) => {
            const coverImage = book.formats ? getBookCoverImage(book) : getPlaceholderBookCover(book.title);
            const authorNames = book.authors?.map(author => author.name).join(', ') || 'Autor necunoscut';
            
            return (
              <Link to={`/book/${book.id}`} key={index} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-md group-hover:-translate-y-1">
                  <CardContent className="p-0 aspect-[2/3] relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10" />
                    {book.formats ? (
                      <img 
                        src={coverImage}
                        alt={`Coperta pentru ${book.title}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If image fails to load, replace with fallback
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <BookIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2">{book.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{authorNames}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-6 border-t pt-4 flex justify-end">
          <Button variant="link" asChild className="gap-1 text-primary">
            <a href="/about">
              Află mai multe despre colecțiile personalizate <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
