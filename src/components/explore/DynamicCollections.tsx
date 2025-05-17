
import React, { useState, useEffect } from 'react';
import { Book } from '@/types/gutendex';
import BookGrid from '@/components/BookGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import SectionHeader from '@/components/book/SectionHeader';
import { createPersonalizedCollection } from '@/services/deepSeekService';
import { useToast } from '@/hooks/use-toast';

interface DynamicCollectionProps {
  title: string;
  prompt: string;
  icon?: React.ReactNode;
}

export const DynamicCollection: React.FC<DynamicCollectionProps> = ({ 
  title, 
  prompt,
  icon = <BookOpen className="h-5 w-5" />
}) => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collectionTitle, setCollectionTitle] = useState<string>(title);

  useEffect(() => {
    const fetchCollection = async () => {
      setIsLoading(true);
      try {
        const collection = await createPersonalizedCollection(prompt);
        setBooks(collection.books);
        // Actualizează titlul colecției dacă AI-ul a generat unul mai bun
        if (collection.title) {
          setCollectionTitle(collection.title);
        }
      } catch (error) {
        console.error("Error fetching dynamic collection:", error);
        toast({
          title: "Nu s-a putut genera colecția",
          description: "Vom încerca din nou mai târziu.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, [prompt, toast]);

  return (
    <section className="container px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <SectionHeader title={collectionTitle} icon={icon} />
        <Button variant="link" asChild className="gap-1">
          <a href="/explore">
            Vezi toate <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
      
      <BookGrid books={books} isLoading={isLoading} />
    </section>
  );
};

// Componenta ce conține toate colecțiile predefinite pentru pagina principală
export const DynamicCollections: React.FC = () => {
  // O listă de prompturi interesante pentru colecții diverse
  const collectionPrompts = [
    {
      title: "Aventuri extraordinare",
      prompt: "cărți clasice de aventură cu călătorii extraordinare și explorări",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "Mistere clasice",
      prompt: "cele mai bune cărți clasice de mister și detective din toate timpurile",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "Iubire și romantism",
      prompt: "cele mai frumoase romane de dragoste clasice",
      icon: <BookOpen className="h-5 w-5" />
    }
  ];

  return (
    <>
      {collectionPrompts.map((collection, index) => (
        <DynamicCollection 
          key={index} 
          title={collection.title}
          prompt={collection.prompt}
          icon={collection.icon}
        />
      ))}
    </>
  );
};
