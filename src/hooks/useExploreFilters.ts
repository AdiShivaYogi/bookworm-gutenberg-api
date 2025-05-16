
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface ExploreFilters {
  searchQuery: string;
  selectedLanguage: string;
  sortOrder: string;
  currentPage: number;
  selectedList: string;
  topicFilter: string;
  isSmartSearch?: boolean;
}

export const useExploreFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortOrder, setSortOrder] = useState('popular');
  const [selectedList, setSelectedList] = useState('');
  const [isSmartSearch, setIsSmartSearch] = useState(false);
  
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
    
    const smartParam = searchParams.get('smart');
    if (smartParam === 'true') setIsSmartSearch(true);
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
    if (isSmartSearch) newParams.set('smart', 'true');
    setSearchParams(newParams);
  }, [selectedLanguage, sortOrder, currentPage, searchQuery, topicFilter, selectedList, isSmartSearch]);

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setIsSmartSearch(false); // Reset smart search when performing a regular search
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
  
  const toggleSmartSearch = () => {
    setIsSmartSearch(prev => !prev);
    setCurrentPage(1);
  };

  return {
    filters: {
      searchQuery,
      selectedLanguage,
      sortOrder,
      currentPage,
      selectedList,
      topicFilter,
      isSmartSearch,
    },
    setCurrentPage,
    handleSearch,
    handleLanguageChange,
    handleSortOrderChange,
    handlePopularListSelect,
    toggleSmartSearch
  };
};
