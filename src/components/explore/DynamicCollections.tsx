
import React, { useState, useEffect } from 'react';
import { Book } from '@/types/gutendex';
import BookGrid from '@/components/BookGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Loader2, Book as BookIcon, Sparkles, Star, Layers, Grid2x2 } from 'lucide-react';
import SectionHeader from '@/components/book/SectionHeader';
import { createPersonalizedCollection } from '@/services/book/collectionService';
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
        // Update collection title if AI generated a better one
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

// Enhanced list of prompts more relevant to Gutenberg's public domain books
const ALL_COLLECTION_PROMPTS = [
  {
    title: "Capodopere literare universale",
    prompt: "cele mai importante capodopere literare universale din domeniul public",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Aventuri extraordinare",
    prompt: "romane de aventură clasice din domeniul public precum Jules Verne, H.G. Wells",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Literatură Victoriană",
    prompt: "cele mai importante cărți din perioada victoriană, Charles Dickens, Jane Austen",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Iubire și romantism",
    prompt: "cele mai importante romane de dragoste clasice din domeniul public",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Filosofie clasică",
    prompt: "lucrări clasice de filosofie din domeniul public precum Platon, Aristotel, Kant",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Mitologie și legende",
    prompt: "cărți clasice despre mitologie și legende din domeniul public",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Shakespeare și dramaturgie",
    prompt: "opere dramatice de William Shakespeare și alți dramaturgi clasici",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Poezie nemuritoare",
    prompt: "cele mai importante colecții de poezii clasice din domeniul public",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Romane clasice americane",
    prompt: "cele mai importante romane americane clasice din domeniul public, Mark Twain, Herman Melville",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Mari biografii",
    prompt: "biografii și autobiografii clasice din domeniul public",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Mistere detective",
    prompt: "cele mai bune cărți clasice de mister și detective din domeniul public, Arthur Conan Doyle",
    icon: <Grid2x2 className="h-5 w-5" />
  },
  {
    title: "Științe naturale",
    prompt: "cărți clasice despre știință și natură din domeniul public precum Charles Darwin",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Distopii clasice",
    prompt: "romane distopice clasice din domeniul public",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Clasici rusești",
    prompt: "cele mai importante opere din literatura rusă clasică din domeniul public, Dostoievski, Tolstoi",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Explorări și călătorii",
    prompt: "cărți clasice despre explorări și călătorii din domeniul public",
    icon: <Sparkles className="h-5 w-5" />
  }
];

// Componenta ce conține toate colecțiile predefinite pentru pagina principală
export const DynamicCollections: React.FC = () => {
  // Selectează aleatoriu cel puțin 8 colecții diferite pentru afișare
  const [selectedCollections, setSelectedCollections] = useState<Array<{
    title: string;
    prompt: string;
    icon: React.ReactNode;
  }>>([]);

  // Regenerează colecțiile la fiecare reîncărcare a paginii
  useEffect(() => {
    // Amestecă lista de prompturi pentru a obține o selecție aleatorie
    const shuffledPrompts = [...ALL_COLLECTION_PROMPTS].sort(() => Math.random() - 0.5);
    
    // Selectează cel puțin 8 prompturi sau toate prompturile disponibile dacă sunt mai puține
    const numberOfCollections = Math.max(8, Math.min(Math.floor(Math.random() * 4) + 8, ALL_COLLECTION_PROMPTS.length));
    setSelectedCollections(shuffledPrompts.slice(0, numberOfCollections));
  }, []);

  return (
    <>
      {selectedCollections.map((collection, index) => (
        <DynamicCollection 
          key={`${index}-${collection.title}`} 
          title={collection.title}
          prompt={collection.prompt}
          icon={collection.icon}
        />
      ))}
    </>
  );
};
