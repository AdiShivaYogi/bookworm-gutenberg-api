
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { getPerplexityApiKey, setPerplexityApiKey, hasValidApiKey } from '@/services/deepSeekService';
import { useToast } from '@/hooks/use-toast';

export const ApiKeyConfig: React.FC = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = () => {
    const hasKey = hasValidApiKey();
    setIsConfigured(hasKey);
    if (hasKey) {
      setApiKey(getPerplexityApiKey());
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      setPerplexityApiKey(apiKey.trim());
      setIsConfigured(true);
      setIsDialogOpen(false);
      
      toast({
        title: "Cheie API salvată",
        description: "Cheia API Perplexity a fost salvată cu succes.",
      });
      
      // Reîncarcă pagina pentru a aplica noua cheie API
      window.location.reload();
    } else {
      toast({
        title: "Eroare",
        description: "Te rugăm să introduci o cheie API validă.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={isConfigured ? "outline" : "default"} size="sm">
            {isConfigured ? "Schimbă cheia API" : "Configurează cheia API"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurare cheie API Perplexity</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Pentru a putea genera recomandări personalizate de cărți, ai nevoie de o cheie API Perplexity.
              Poți obține una gratuită de la <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noreferrer" className="text-primary underline">perplexity.ai</a>.
            </p>
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Introdu cheia API Perplexity"
              type="password"
              className="w-full mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Anulează</Button>
            <Button onClick={handleSaveApiKey}>Salvează</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!isConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-2 text-sm">
          <p>⚠️ Trebuie să configurezi o cheie API pentru a putea genera recomandări personalizate.</p>
        </div>
      )}
    </div>
  );
};
