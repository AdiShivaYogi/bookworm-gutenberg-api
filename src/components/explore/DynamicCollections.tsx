
import React, { useState, useEffect } from 'react';
import { Book } from '@/types/gutendex';
import BookGrid from '@/components/BookGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Loader2, Book as BookIcon, Sparkles, Star, Layers, Grid2x2, BookText, BookOpenCheck, Library } from 'lucide-react';
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
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCollection = async () => {
      setIsLoading(true);
      setError(false);
      try {
        console.log(`Generating collection for prompt: "${prompt}"`);
        const collection = await createPersonalizedCollection(prompt);
        
        if (collection.books.length === 0) {
          console.log(`No books found for collection "${prompt}"`);
          setError(true);
        } else {
          setBooks(collection.books);
          // Update collection title if AI generated a better one
          if (collection.title) {
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

    fetchCollection();
  }, [prompt, toast]);

  // If there was an error and no books were loaded, don't render this collection
  if (error && !isLoading && books.length === 0) {
    return null;
  }

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
    prompt: "cele mai importante 20 de capodopere literare universale din toate timpurile disponibile în domeniul public",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Aventuri extraordinare",
    prompt: "cele mai bune 20 de romane de aventură clasice din domeniul public precum Jules Verne, H.G. Wells, Robert Louis Stevenson",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Esențiale Literatura Victoriană",
    prompt: "20 de cărți esențiale din perioada victoriană de autori ca Charles Dickens, Jane Austen, Charlotte Brontë",
    icon: <BookText className="h-5 w-5" />
  },
  {
    title: "Romane de dragoste clasice",
    prompt: "cele mai frumoase 20 de romane de dragoste clasice din domeniul public, Jane Austen, Charlotte Brontë",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Filosofie fundamentală",
    prompt: "20 de lucrări fundamentale de filosofie din domeniul public precum Platon, Aristotel, Kant, Nietzsche",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Mitologie și legende",
    prompt: "20 de cărți clasice importante despre mitologie și legende din domeniul public",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Shakespeare și teatru clasic",
    prompt: "20 de opere dramatice importante de William Shakespeare și alți dramaturgi clasici din domeniul public",
    icon: <BookOpenCheck className="h-5 w-5" />
  },
  {
    title: "Poezie clasică de referință",
    prompt: "20 cele mai importante colecții de poezii clasice din domeniul public, de poeți celebri",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Clasici americani",
    prompt: "20 de romane americane clasice esențiale din domeniul public, Mark Twain, Herman Melville, Jack London, Edgar Allan Poe",
    icon: <BookText className="h-5 w-5" />
  },
  {
    title: "Mari biografii și memorii",
    prompt: "20 de biografii și autobiografii clasice importante din domeniul public",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Mistere și romane polițiste",
    prompt: "20 de cărți clasice de mister și detective din domeniul public, Arthur Conan Doyle, Wilkie Collins, Edgar Allan Poe",
    icon: <Grid2x2 className="h-5 w-5" />
  },
  {
    title: "Științe și explorare",
    prompt: "20 de cărți clasice despre știință, natură și explorare din domeniul public precum Charles Darwin, Alexander von Humboldt",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Science Fiction pionier",
    prompt: "20 de romane science fiction clasice din domeniul public, H.G. Wells, Jules Verne, Mary Shelley",
    icon: <BookOpenCheck className="h-5 w-5" />
  },
  {
    title: "Clasici ruși fundamentali",
    prompt: "20 de opere esențiale din literatura rusă clasică din domeniul public, Dostoievski, Tolstoi, Cehov, Gogol",
    icon: <Library className="h-5 w-5" />
  },
  {
    title: "Călătorii și explorări",
    prompt: "20 de cărți clasice despre explorări și călătorii din domeniul public",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Literatura pentru copii",
    prompt: "20 de cărți clasice pentru copii din domeniul public, Lewis Carroll, L. Frank Baum, Brothers Grimm, Hans Christian Andersen",
    icon: <BookText className="h-5 w-5" />
  },
  {
    title: "Opere filosofice antice",
    prompt: "20 de opere filosofice antice din domeniul public, Platon, Aristotel, Seneca, Marcus Aurelius",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Romane gotice și de groază",
    prompt: "20 de romane gotice și de groază clasice din domeniul public, Mary Shelley, Bram Stoker, Edgar Allan Poe",
    icon: <BookOpen className="h-5 w-5" />
  }
];

// Componenta ce conține toate colecțiile predefinite pentru pagina principală
export const DynamicCollections: React.FC = () => {
  // Selectează aleatoriu între 8-12 colecții diferite pentru afișare
  const [selectedCollections, setSelectedCollections] = useState<Array<{
    title: string;
    prompt: string;
    icon: React.ReactNode;
  }>>([]);

  // Regenerează colecțiile la fiecare reîncărcare a paginii
  useEffect(() => {
    // Amestecă lista de prompturi pentru a obține o selecție aleatorie
    const shuffledPrompts = [...ALL_COLLECTION_PROMPTS].sort(() => Math.random() - 0.5);
    
    // Selectează între 8 și 12 prompturi
    const numberOfCollections = Math.floor(Math.random() * 5) + 8; // 8-12 colecții
    console.log(`Generating ${numberOfCollections} random collections`);
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
