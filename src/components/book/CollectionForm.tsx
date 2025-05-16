
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CollectionFormProps {
  onSubmit: (prompt: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
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
          disabled={isLoading}
          autoFocus
        />
        <p className="text-xs text-muted-foreground mt-1">
          Poți menționa autori, genuri, teme sau cărți similare.
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          type="submit" 
          disabled={isLoading || !prompt.trim()}
        >
          Creează colecția
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Anulează
        </Button>
      </div>
    </form>
  );
};

export default CollectionForm;
