
import React, { useState } from 'react';
import { Book } from '@/types/gutendex';
import { useBookRecommendations } from '@/hooks/useBookRecommendations';
import { Star } from 'lucide-react';
import SectionHeader from './SectionHeader';
import EmptyStateCard from './EmptyStateCard';
import LoadingSkeleton from './LoadingSkeleton';
import CollectionForm from './CollectionForm';
import CollectionDisplay from './CollectionDisplay';

interface CreateCollectionSectionProps {
  book: Book;
}

const CreateCollectionSection: React.FC<CreateCollectionSectionProps> = ({ book }) => {
  const { collection, isLoadingCollection, createCollection } = useBookRecommendations(book);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (prompt: string) => {
    if (prompt.trim()) {
      createCollection(prompt);
    }
  };

  const handleCreateNewCollection = () => {
    setShowForm(true);
  };

  return (
    <div className="mt-8 border rounded-md p-4 bg-muted/20">
      <SectionHeader
        title="Colecție personalizată"
        icon={<Star className="h-5 w-5" />}
      />
      
      {!showForm && !collection && (
        <EmptyStateCard
          message="Creează o colecție personalizată de cărți în funcție de preferințele tale utilizând inteligența artificială."
          buttonText="Creează o colecție"
          onClick={() => setShowForm(true)}
        />
      )}
      
      {showForm && !collection && (
        <CollectionForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isLoading={isLoadingCollection}
        />
      )}
      
      {isLoadingCollection && (
        <LoadingSkeleton count={4} compact={true} />
      )}
      
      {collection && !isLoadingCollection && (
        <CollectionDisplay
          collection={collection}
          onCreateNewCollection={() => {
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
};

export default CreateCollectionSection;
