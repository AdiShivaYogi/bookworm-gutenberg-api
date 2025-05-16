
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookGrid from '@/components/BookGrid';
import FilterPanel from '@/components/FilterPanel';
import { fetchBooks } from '@/services/bookService';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useExploreFilters } from '@/hooks/useExploreFilters';
import { ExploreSEO } from '@/components/explore/ExploreSEO';
import { ExplorePagination } from '@/components/explore/ExplorePagination';
import { getApiTopicFromList } from '@/components/explore/ExploreUtils';

const Explore = () => {
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

  const totalPages = data ? Math.ceil(data.count / 32) : 0;

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
        
        {!isLoading && data && (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              S-au găsit {data.count} cărți
            </div>
            <BookGrid books={data.results} isLoading={false} />
            <ExplorePagination 
              currentPage={filters.currentPage} 
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
