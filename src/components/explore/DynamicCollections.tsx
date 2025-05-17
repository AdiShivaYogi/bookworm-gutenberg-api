
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

// Enhanced list of prompts specifically targeted to Gutenberg's public domain books
const ALL_COLLECTION_PROMPTS = [
  {
    title: "Capodopere literare universale",
    prompt: "cele mai importante 15 capodopere literare universale disponibile în Project Gutenberg de Jane Austen, Charles Dickens, Mark Twain, Fyodor Dostoyevsky, Leo Tolstoy, și Victor Hugo",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Aventuri extraordinare",
    prompt: "15 romane clasice de aventură din Gutenberg de Jules Verne, H.G. Wells, Robert Louis Stevenson și Alexandre Dumas",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Esențiale Literatura Victoriană",
    prompt: "15 cărți esențiale din perioada victoriană de Charles Dickens, Jane Austen, Charlotte Brontë, William Makepeace Thackeray și George Eliot",
    icon: <BookText className="h-5 w-5" />
  },
  {
    title: "Romane de dragoste clasice",
    prompt: "15 cele mai frumoase romane de dragoste clasice din Gutenberg de Jane Austen, Charlotte Brontë, Emily Brontë și Elizabeth Gaskell",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Filosofie fundamentală",
    prompt: "15 lucrări fundamentale de filosofie din Gutenberg de Platon, Aristotel, Kant, Nietzsche, John Stuart Mill și Seneca",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Mitologie și legende",
    prompt: "15 cărți clasice despre mitologie și legende din Gutenberg, incluzând Homer, Virgil, Ovidiu și Thomas Bulfinch",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Shakespeare și teatru clasic",
    prompt: "15 cele mai importante opere dramatice de William Shakespeare în Gutenberg",
    icon: <BookOpenCheck className="h-5 w-5" />
  },
  {
    title: "Poezie clasică de referință",
    prompt: "15 cele mai importante colecții de poezii clasice din Gutenberg, de Walt Whitman, Emily Dickinson, John Keats, Lord Byron și William Wordsworth",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Clasici americani",
    prompt: "15 romane americane clasice din Gutenberg de Mark Twain, Herman Melville, Nathaniel Hawthorne, Jack London și Edgar Allan Poe",
    icon: <BookText className="h-5 w-5" />
  },
  {
    title: "Mari biografii și memorii",
    prompt: "15 biografii și autobiografii clasice din Gutenberg precum Autobiografia lui Benjamin Franklin, Viețile lui Plutarh și Memoriile generalului Grant",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Mistere și romane polițiste",
    prompt: "15 cărți clasice de detectivi și mister din Gutenberg de Arthur Conan Doyle, Wilkie Collins, Edgar Allan Poe și Gaston Leroux",
    icon: <Grid2x2 className="h-5 w-5" />
  },
  {
    title: "Științe și explorare",
    prompt: "15 cărți clasice despre știință și explorare din Gutenberg de Charles Darwin, Alexander von Humboldt, și Thomas Henry Huxley",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Science Fiction pionier",
    prompt: "15 romane science fiction clasice din Gutenberg de H.G. Wells, Jules Verne, Mary Shelley și Edward Bellamy",
    icon: <BookOpenCheck className="h-5 w-5" />
  },
  {
    title: "Clasici ruși fundamentali",
    prompt: "15 opere esențiale din literatura rusă clasică din Gutenberg de Dostoievski, Tolstoi, Cehov, Gogol și Turgenev",
    icon: <Library className="h-5 w-5" />
  },
  {
    title: "Călătorii și explorări",
    prompt: "15 cărți clasice despre explorări și călătorii din Gutenberg precum Robinson Crusoe, Călătoriile lui Gulliver, și jurnalele căpitanului Cook",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Literatura pentru copii",
    prompt: "15 cărți clasice pentru copii din Gutenberg de Lewis Carroll, L. Frank Baum, Brothers Grimm, Hans Christian Andersen și Carlo Collodi",
    icon: <BookText className="h-5 w-5" />
  },
  {
    title: "Opere filosofice antice",
    prompt: "15 opere filosofice antice din Gutenberg de Platon, Aristotel, Epictet, Seneca, Marcus Aurelius și Lucretius",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Romane gotice și de groază",
    prompt: "15 romane gotice și de groază clasice din Gutenberg de Mary Shelley, Bram Stoker, Edgar Allan Poe, Ann Radcliffe și Matthew Gregory Lewis",
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
