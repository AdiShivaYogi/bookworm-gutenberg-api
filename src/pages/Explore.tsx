
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookGrid from '@/components/BookGrid';
import FilterPanel from '@/components/FilterPanel';
import { fetchBooks } from '@/services/bookService';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortOrder, setSortOrder] = useState('popular');
  const [selectedList, setSelectedList] = useState('');
  const searchQuery = searchParams.get('search') || '';
  const topicFilter = searchParams.get('topic') || '';

  // Initialize state from URL if present
  useEffect(() => {
    const langParam = searchParams.get('languages');
    if (langParam) setSelectedLanguage(langParam);
    
    const sortParam = searchParams.get('sort');
    if (sortParam) setSortOrder(sortParam);
    
    const pageParam = searchParams.get('page');
    if (pageParam) setCurrentPage(parseInt(pageParam, 10));
    
    const listParam = searchParams.get('list');
    if (listParam) setSelectedList(listParam);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('search', searchQuery);
    if (selectedLanguage && selectedLanguage !== 'all') newParams.set('languages', selectedLanguage);
    if (sortOrder) newParams.set('sort', sortOrder);
    if (topicFilter) newParams.set('topic', topicFilter);
    if (selectedList) newParams.set('list', selectedList);
    if (currentPage > 1) newParams.set('page', currentPage.toString());
    setSearchParams(newParams);
  }, [selectedLanguage, sortOrder, currentPage, searchQuery, topicFilter, selectedList]);

  const getApiTopicFromList = (list: string) => {
    const listToTopicMap: Record<string, string> = {
      'top-downloads': 'bestsellers',
      'new-additions': 'recent',
      'classics': 'classics',
      'fiction': 'fiction',
      'educational': 'education'
    };
    return listToTopicMap[list] || '';
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['books', selectedLanguage, sortOrder, currentPage, searchQuery, topicFilter, selectedList],
    queryFn: () => fetchBooks({
      languages: selectedLanguage !== 'all' ? selectedLanguage : '',
      sort: sortOrder as 'popular' | 'ascending' | 'descending',
      search: searchQuery,
      topic: selectedList ? getApiTopicFromList(selectedList) : topicFilter,
      page: currentPage
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (query) {
        newParams.set('search', query);
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
  };

  const handleLanguageChange = (value: string) => {
    setCurrentPage(1);
    setSelectedLanguage(value);
  };

  const handleSortOrderChange = (value: string) => {
    setCurrentPage(1);
    setSortOrder(value);
  };
  
  const handlePopularListSelect = (value: string) => {
    setCurrentPage(1);
    setSelectedList(value);
  };

  const totalPages = data ? Math.ceil(data.count / 32) : 0;

  // Function to get SEO-friendly title based on current filters
  const getPageTitle = () => {
    let title = "Explorează cărți";
    
    if (searchQuery) {
      title += ` despre "${searchQuery}"`;
    }
    
    if (selectedList) {
      const listTypes: Record<string, string> = {
        'top-downloads': 'cele mai descărcate',
        'new-additions': 'adăugate recent',
        'classics': 'clasice',
        'fiction': 'de ficțiune populare',
        'educational': 'educaționale'
      };
      title += ` - ${listTypes[selectedList] || ''}`;
    } else if (topicFilter) {
      title += ` din categoria ${topicFilter}`;
    }
    
    if (selectedLanguage !== 'all') {
      const languages: Record<string, string> = {
        'en': 'în limba engleză',
        'fr': 'în limba franceză',
        'de': 'în limba germană',
        'es': 'în limba spaniolă',
        'it': 'în limba italiană',
        'pt': 'în limba portugheză',
        'ru': 'în limba rusă',
        'fi': 'în limba finlandeză'
      };
      title += ` ${languages[selectedLanguage] || ''}`;
    }
    
    return title;
  };

  const renderPagination = () => {
    if (!data || totalPages <= 1) return null;

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {/* Show ellipsis for many pages */}
          {totalPages > 7 && currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-disabled={true} className="opacity-50">...</PaginationLink>
              </PaginationItem>
            </>
          )}
          
          {/* Generate page numbers */}
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
            const pageNum = totalPages > 7 
              ? (currentPage > 3 && currentPage < totalPages - 2) 
                ? currentPage - 2 + i
                : currentPage <= 3 
                  ? i + 1 
                  : totalPages - 4 + i
              : i + 1;
            
            if (pageNum > totalPages) return null;
            
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  onClick={() => setCurrentPage(pageNum)}
                  isActive={currentPage === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          {/* Show ellipsis for many pages */}
          {totalPages > 7 && currentPage < totalPages - 2 && (
            <>
              <PaginationItem>
                <PaginationLink aria-disabled={true} className="opacity-50">...</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  // Set page title for SEO
  useEffect(() => {
    document.title = `${getPageTitle()} | Libra - Biblioteca digitală`;
  }, [selectedLanguage, sortOrder, searchQuery, topicFilter, selectedList]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearchChange={handleSearch} />
      <main className="container px-4 py-8 flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
          <p className="text-muted-foreground">
            Răsfoiește colecția de cărți gratuite din Proiectul Gutenberg
            {searchQuery && <span> care conțin "<strong>{searchQuery}</strong>"</span>}
            {topicFilter && <span> din categoria <strong>{topicFilter}</strong></span>}
          </p>
        </div>
        
        <FilterPanel 
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={handleLanguageChange}
          sortOrder={sortOrder}
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
            {renderPagination()}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
