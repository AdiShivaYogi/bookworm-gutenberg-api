
import React, { useState } from 'react';
import { Book } from '@/types/gutendex';
import { generateBookPreface } from '@/services/book/prefaceService';
import { hasValidApiKey } from '@/services/api/perplexityApiConfig';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookText } from 'lucide-react';
import EmptyStateCard from '@/components/book/EmptyStateCard';

interface BookPrefaceProps {
  book: Book;
}

const BookPreface: React.FC<BookPrefaceProps> = ({ book }) => {
  const { toast } = useToast();
  const [preface, setPreface] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGeneratePreface = async () => {
    if (!hasValidApiKey()) {
      toast({
        title: "Configurare necesară",
        description: "Trebuie să configurezi o cheie API Perplexity pentru a genera o prefață.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const generatedPreface = await generateBookPreface(book);
      setPreface(generatedPreface);
      
      toast({
        title: "Prefață generată",
        description: "Prefața cărții a fost generată cu succes!",
      });
    } catch (error) {
      console.error("Failed to generate preface:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera prefața. Verifică cheia API și încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookText className="h-6 w-6" />
          Prefață AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        {preface ? (
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line leading-relaxed text-md">
              {preface}
            </p>
          </div>
        ) : (
          <EmptyStateCard
            message="Generează o prefață AI captivantă pentru această carte"
            buttonText="Generează Prefață"
            onClick={handleGeneratePreface}
            buttonIcon={<FileText className="h-4 w-4" />}
            disabled={isLoading}
          />
        )}
      </CardContent>
      {preface && (
        <CardFooter>
          <Button
            variant="outline"
            onClick={handleGeneratePreface}
            disabled={isLoading}
            className="ml-auto"
          >
            {isLoading ? "Se generează..." : "Regenerează Prefața"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookPreface;
