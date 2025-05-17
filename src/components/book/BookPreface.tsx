
import React, { useState, useEffect } from 'react';
import { Book } from '@/types/gutendex';
import { generateBookPreface } from '@/services/book/prefaceService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookText, Loader2 } from 'lucide-react';
import EmptyStateCard from '@/components/book/EmptyStateCard';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface BookPrefaceProps {
  book: Book;
}

const BookPreface: React.FC<BookPrefaceProps> = ({ book }) => {
  const { toast } = useToast();
  const [preface, setPreface] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Simulate progress during API call
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      // Reset progress when starting
      setProgress(0);
      setStatusMessage('Se inițializează...');
      
      // Progress simulation
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          // Simulate different stages of generation
          if (oldProgress < 20) {
            setStatusMessage('Se analizează cartea...');
            return oldProgress + 1;
          } else if (oldProgress < 50) {
            setStatusMessage('Se pregătește conținutul...');
            return oldProgress + 0.7;
          } else if (oldProgress < 80) {
            setStatusMessage('Se redactează prefața...');
            return oldProgress + 0.5;
          } else if (oldProgress < 95) {
            setStatusMessage('Se finalizează...');
            return oldProgress + 0.2;
          }
          return 95; // Cap at 95% until actually complete
        });
      }, 200);
    } else {
      // Complete the progress bar when done
      if (progress > 0 && progress < 100) {
        setProgress(100);
        setTimeout(() => {
          setProgress(0); // Reset after a delay
        }, 1000);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, progress]);

  const handleGeneratePreface = async () => {
    setIsLoading(true);
    try {
      // Set timeout to prevent infinite waiting
      const timeoutPromise = new Promise<string>((_, reject) => {
        setTimeout(() => reject(new Error("Timeout: Generating preface took too long")), 60000);
      });

      // Race between the API call and the timeout
      const generatedPreface = await Promise.race([
        generateBookPreface(book),
        timeoutPromise
      ]);
      
      setPreface(generatedPreface);
      
      toast({
        title: "Prefață generată",
        description: "Prefața cărții a fost generată cu succes!",
      });
    } catch (error) {
      console.error("Failed to generate preface:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera prefața. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setStatusMessage('');
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
        ) : isLoading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{statusMessage}</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 w-full" />
            </div>
            <div className="flex flex-col items-center py-6 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-3" />
              <h3 className="text-lg font-medium mb-2">Se generează prefața</h3>
              <p className="text-sm text-muted-foreground">
                Acest proces poate dura până la un minut.<br />
                Te rugăm să aștepți...
              </p>
            </div>
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
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Se generează...
              </>
            ) : "Regenerează Prefața"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookPreface;
