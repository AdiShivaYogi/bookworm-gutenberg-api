
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BookListItemCompact from '@/components/book/BookListItemCompact';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

interface SmartSearchResultsProps {
  collection: {
    title: string;
    books: Array<{
      title: string;
      author: string;
    }>;
  };
}

export const SmartSearchResults: React.FC<SmartSearchResultsProps> = ({ collection }) => {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20 shadow-md mb-8">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="h-5 w-5" />
          <p className="text-sm font-medium">Colecție generată cu IA</p>
        </div>
        <CardTitle className="text-xl md:text-2xl">{collection.title}</CardTitle>
        <CardDescription>
          O colecție de cărți recomandată special pentru tine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collection.books.map((book, index) => (
            <BookListItemCompact key={index} book={book} />
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
