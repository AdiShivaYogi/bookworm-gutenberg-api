
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BookRecommendation } from '@/hooks/useBookRecommendations';
import { getPlaceholderBookCover } from '@/services/bookService';

interface SmartSearchResultsProps {
  collection: {
    title: string;
    books: Array<BookRecommendation>;
  };
  searchQuery?: string;
}

export const SmartSearchResults: React.FC<SmartSearchResultsProps> = ({ collection, searchQuery }) => {
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
            `O colecție de cărți bazată pe căutarea: "${searchQuery}"` : 
            'O colecție de cărți recomandată special pentru tine'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {collection.books.map((book, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-0 aspect-[2/3] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10" />
                <img 
                  src={getPlaceholderBookCover(book.title)}
                  alt={`Coperta pentru ${book.title}`}
                  className="w-full h-full object-cover"
                />
              </CardContent>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">{book.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
              </div>
            </Card>
          ))}
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
