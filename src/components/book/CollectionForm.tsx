
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface CollectionFormProps {
  onSubmit: (prompt: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isLoading,
  disabled = false
}) => {
  const [prompt, setPrompt] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSubmit(prompt);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descrie colecția de cărți pe care o dorești (ex: cărți clasice despre călătorii, romane de aventură, povești scurte misterioase...)"
          className="resize-none min-h-[100px]"
          disabled={isLoading || disabled}
        />
        
        {disabled && (
          <p className="text-sm text-amber-600 mt-2">
            Trebuie să configurezi o cheie API pentru a putea crea colecții personalizate.
          </p>
        )}
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Anulează
        </Button>
        <Button 
          type="submit" 
          disabled={!prompt.trim() || isLoading || disabled}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se generează...
            </>
          ) : (
            'Creează colecția'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CollectionForm;
