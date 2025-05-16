
import React, { useState } from 'react';
import { Book } from '@/types/gutendex';
import { useBookRecommendations } from '@/hooks/useBookRecommendations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star } from 'lucide-react';

interface CreateCollectionSectionProps {
  book: Book;
}

const CreateCollectionSection: React.FC<CreateCollectionSectionProps> = ({ book }) => {
  const [prompt, setPrompt] = useState("");
  const { collection, isLoadingCollection, createCollection } = useBookRecommendations(book);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      createCollection(prompt);
    }
  };

  return (
    <div className="mt-8 border rounded-md p-4 bg-muted/20">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Star className="h-5 w-5" /> Colecție personalizată
      </h2>
      
      {!showForm && !collection && (
        <div className="text-center py-6">
          <p className="text-muted-foreground mb-4">
            Creează o colecție personalizată de cărți în funcție de preferințele tale utilizând inteligența artificială.
          </p>
          <Button onClick={() => setShowForm(true)}>Creează o colecție</Button>
        </div>
      )}
      
      {showForm && !collection && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="collection-prompt" className="text-sm font-medium block mb-1">
              Descrie colecția dorită:
            </label>
            <Input 
              id="collection-prompt"
              placeholder="Ex: Cărți distopice similare cu 1984 de George Orwell"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
              disabled={isLoadingCollection}
              autoFocus
            />
            <p className="text-xs text-muted-foreground mt-1">
              Poți menționa autori, genuri, teme sau cărți similare.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isLoadingCollection || !prompt.trim()}
            >
              Creează colecția
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowForm(false)}
              disabled={isLoadingCollection}
            >
              Anulează
            </Button>
          </div>
        </form>
      )}
      
      {isLoadingCollection && (
        <div className="space-y-4 py-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-3">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-16 w-12 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {collection && !isLoadingCollection && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{collection.title}</h3>
            <Badge variant="outline" className="ml-2">
              {collection.books.length} cărți
            </Badge>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {collection.books.map((book, index) => (
              <div key={index} className="flex gap-3 items-start border-b pb-3 last:border-0">
                <div className="bg-muted h-16 w-12 rounded flex items-center justify-center">
                  <BookOpen className="text-muted-foreground h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              setShowForm(true);
              setPrompt("");
            }}>
              Creează altă colecție
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCollectionSection;
