
import React, { useState, useEffect } from 'react';
import { Book } from '@/types/gutendex';
import BookGrid from '@/components/BookGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw } from 'lucide-react';
import SectionHeader from '@/components/book/SectionHeader';
import { createPersonalizedCollection } from '@/services/book/collectionService';
import { useToast } from '@/hooks/use-toast';
import { LucideIcon } from 'lucide-react';

interface DynamicCollectionProps {
  title: string;
  prompt: string;
  icon: LucideIcon;
  priority?: boolean;
}

export const DynamicCollection: React.FC<DynamicCollectionProps> = ({ 
  title, 
  prompt,
  icon,
  priority = false
}) => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [collectionTitle, setCollectionTitle] = useState<string>(title);
  const [error, setError] = useState<boolean>(false);

  const fetchCollection = async () => {
    setIsLoading(true);
    setError(false);
    setIsRetrying(false);
    
    try {
      console.log(`Generating collection for prompt: "${prompt}"`);
      const collection = await createPersonalizedCollection(prompt);
      
      if (!collection.books || collection.books.length === 0) {
        console.log(`No books found for collection "${prompt}"`);
        setError(true);
      } else {
        setBooks(collection.books);
        // Update collection title if AI generated a better one
        if (collection.title && collection.title.length > 0) {
          setCollectionTitle(collection.title);
        }
        console.log(`Successfully loaded collection "${collection.title}" with ${collection.books.length} books`);
      }
    } catch (error) {
      console.error("Error fetching dynamic collection:", error);
      setError(true);
      toast({
        title: "Nu s-a putut genera colecția",
        description: "Vom încerca din nou mai târziu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Use a small delay for non-priority collections to avoid overwhelming the API
    const delay = priority ? 0 : Math.random() * 1000;
    const timer = setTimeout(() => {
      fetchCollection();
    }, delay);
    
    return () => clearTimeout(timer);
  }, [prompt, priority]);

  // If there was an error and no books were loaded, don't render this collection
  if (error && !isLoading && books.length === 0) {
    return null;
  }

  // Create icon element from the provided icon component
  const IconComponent = icon;
  
  return (
    <section className={`container px-4 py-8 md:py-12 ${!priority ? 'bg-gray-50' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <SectionHeader 
          title={collectionTitle} 
          icon={<IconComponent className="h-5 w-5" />} 
        />
        <div className="flex items-center gap-2">
          {(error || books.length < 5) && !isLoading && !isRetrying && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setIsRetrying(true);
                fetchCollection();
              }}
              className="gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reîmprospătează
            </Button>
          )}
          <Button variant="link" asChild className="gap-1">
            <a href="/explore">
              Vezi toate <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
      
      <BookGrid books={books} isLoading={isLoading} />
    </section>
  );
};
