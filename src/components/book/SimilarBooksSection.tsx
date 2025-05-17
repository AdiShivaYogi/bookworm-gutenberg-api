
import React, { useEffect, useState } from 'react';
import { Book } from '@/types/gutendex';
import { Search, BookOpen } from 'lucide-react';
import { useBookRecommendations } from '@/hooks/useBookRecommendations';
import SectionHeader from './SectionHeader';
import EmptyStateCard from './EmptyStateCard';
import LoadingSkeleton from './LoadingSkeleton';
import SimilarBooksList from './SimilarBooksList';
import { hasValidApiKey } from '@/services/deepSeekService';
import { ApiKeyConfig } from '@/components/explore/ApiKeyConfig';

interface SimilarBooksSectionProps {
  book: Book;
}

const SimilarBooksSection: React.FC<SimilarBooksSectionProps> = ({ book }) => {
  const { recommendations, isLoadingRecommendations, getSimilarBooks } = useBookRecommendations(book);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);

  useEffect(() => {
    setApiKeyConfigured(hasValidApiKey());
  }, []);

  return (
    <div className="mt-8 border rounded-md p-4 bg-muted/20">
      <SectionHeader 
        title="Cărți similare" 
        icon={<BookOpen className="h-5 w-5" />} 
      />
      
      {/* Component configurare API key */}
      <div className="mb-4">
        <ApiKeyConfig />
      </div>
      
      {recommendations.length === 0 && !isLoadingRecommendations && apiKeyConfigured && (
        <EmptyStateCard 
          message={`Descoperă cărți similare cu "${book.title}" generate cu ajutorul inteligenței artificiale.`}
          buttonText="Găsește cărți similare"
          onClick={getSimilarBooks}
          buttonIcon={<Search className="h-4 w-4" />}
        />
      )}

      {recommendations.length === 0 && !isLoadingRecommendations && !apiKeyConfigured && (
        <EmptyStateCard 
          message="Pentru a găsi cărți similare, trebuie să configurezi o cheie API Perplexity."
          buttonText="Configurează cheia API"
          onClick={() => {}}
          disabled={true}
        />
      )}
      
      {isLoadingRecommendations && <LoadingSkeleton />}
      
      {recommendations.length > 0 && !isLoadingRecommendations && (
        <SimilarBooksList 
          recommendations={recommendations} 
          onRefresh={getSimilarBooks} 
        />
      )}
    </div>
  );
};

export default SimilarBooksSection;
