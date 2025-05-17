
import React, { useState, useEffect } from 'react';
import { Book } from '@/types/gutendex';
import BookGrid from '@/components/BookGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Loader2, Book as BookIcon, Sparkles, Star, Layers, Grid2x2 } from 'lucide-react';
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

// Lista extinsă de prompturi pentru colecții diverse
const ALL_COLLECTION_PROMPTS = [
  {
    title: "Aventuri extraordinare",
    prompt: "cărți clasice de aventură cu călătorii extraordinare și explorări",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Mistere clasice",
    prompt: "cele mai bune cărți clasice de mister și detective din toate timpurile",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Iubire și romantism",
    prompt: "cele mai frumoase romane de dragoste clasice",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Filosofie și gândire",
    prompt: "lucrări clasice de filosofie care au influențat istoria gândirii umane",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Aventuri fantastice",
    prompt: "cele mai captivante cărți clasice de fantezie și lumi imaginare",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Mari biografii",
    prompt: "cele mai importante biografii și autobiografii din literatura clasică",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Știință și descoperiri",
    prompt: "cărți clasice despre știință, descoperiri și inovații",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Poezie nemuritoare",
    prompt: "cele mai importante colecții de poezii clasice din toate timpurile",
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Romane istorice",
    prompt: "cele mai bune romane clasice cu tematică istorică",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Distopii și societăți imaginare",
    prompt: "cărți clasice care prezintă viziuni distopice și societăți alternative",
    icon: <Grid2x2 className="h-5 w-5" />
  },
  {
    title: "Natura și mediul",
    prompt: "cărți clasice despre natura, peisaje și relația omului cu mediul",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "Opere dramatice",
    prompt: "cele mai importante piese de teatru din literatura clasică",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Putere și politică",
    prompt: "cărți clasice despre putere, politică și conducere",
    icon: <BookIcon className="h-5 w-5" />
  },
  {
    title: "Călătorii în spațiu și timp",
    prompt: "cărți clasice de călătorii în spațiu și timp",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Mari epopei",
    prompt: "cele mai importante opere epice din literatura clasică",
    icon: <BookOpen className="h-5 w-5" />
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
