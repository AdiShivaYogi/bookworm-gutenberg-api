
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookGrid from '@/components/BookGrid';
import FilterPanel from '@/components/FilterPanel';
import { fetchBooks } from '@/services/bookService';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Search } from 'lucide-react';
import { useExploreFilters } from '@/hooks/useExploreFilters';
import { ExploreSEO } from '@/components/explore/ExploreSEO';
import { ExplorePagination } from '@/components/explore/ExplorePagination';
import { getApiTopicFromList } from '@/components/explore/ExploreUtils';
import { useToast } from '@/hooks/use-toast';
import { createPersonalizedCollection } from '@/services/deepSeekService';
import { SmartSearchResults } from '@/components/explore/SmartSearchResults';
import { Book } from '@/types/gutendex';

const Explore = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [smartSearchResults, setSmartSearchResults] = useState<{ title: string; books: Book[] } | null>(null);
  
  const {
    filters,
    setCurrentPage,
    handleSearch,
    handleLanguageChange,
    handleSortOrderChange,
    handlePopularListSelect
  } = useExploreFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['books', filters.selectedLanguage, filters.sortOrder, filters.currentPage, filters.searchQuery, filters.topicFilter, filters.selectedList],
    queryFn: () => fetchBooks({
      languages: filters.selectedLanguage !== 'all' ? filters.selectedLanguage : '',
      sort: filters.sortOrder as 'popular' | 'ascending' | 'descending',
      search: filters.searchQuery,
      topic: filters.selectedList ? getApiTopicFromList(filters.selectedList) : filters.topicFilter,
      page: filters.currentPage
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSmartSearch = async () => {
    if (!filters.searchQuery) return;
    
    setIsGenerating(true);
    setSmartSearchResults(null);
    
    try {
      // Increase number of books to 20
      const collection = await createPersonalizedCollection(filters.searchQuery, 20);
      setSmartSearchResults(collection);
      
      toast({
        title: "Colecție generată",
        description: `Am creat colecția "${collection.title}" cu ${collection.books.length} cărți`,
      });
    } catch (error) {
      console.error("Error generating collection:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera colecția. Încearcă din nou mai târziu.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const totalPages = data ? Math.ceil(data.count / 32) : 0;
  const hasNoResults = !isLoading && data && data.count === 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearchChange={handleSearch} />
      <main className="container px-4 py-8 flex-grow">
        <ExploreSEO filters={filters} />
        
        <FilterPanel 
          selectedLanguage={filters.selectedLanguage}
          setSelectedLanguage={handleLanguageChange}
          sortOrder={filters.sortOrder}
          setSortOrder={handleSortOrderChange}
          onPopularListSelect={handlePopularListSelect}
        />
        
        {(isLoading || isFetching) && (
          <div className="flex justify-center my-12">
            <Button disabled variant="ghost" className="gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Se încarcă cărțile...
            </Button>
          </div>
        )}

        {hasNoResults && filters.searchQuery && (
          <div className="bg-accent/10 rounded-lg p-6 my-8">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Search className="h-5 w-5" />
              Nu am găsit rezultate pentru "{filters.searchQuery}"
            </h3>
            <p className="text-muted-foreground mt-2 mb-4">
              Cauți o recomandare de lectură? Folosește căutarea inteligentă pentru a genera o colecție personalizată bazată pe cererea ta.
            </p>
            <Button 
              onClick={handleSmartSearch} 
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Se generează...
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  Generează o colecție personalizată
                </>
              )}
            </Button>
          </div>
        )}

        {smartSearchResults && (
          <SmartSearchResults collection={smartSearchResults} searchQuery={filters.searchQuery} />
        )}
        
        {!isLoading && data && (
          <>
            {data.count > 0 && (
              <div className="text-sm text-muted-foreground mb-4">
                S-au găsit {data.count} cărți
              </div>
            )}
            {data.count > 0 && <BookGrid books={data.results} isLoading={false} />}
            {data.count > 0 && (
              <ExplorePagination 
                currentPage={filters.currentPage} 
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
