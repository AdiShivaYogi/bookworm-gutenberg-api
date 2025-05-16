
import React, { useEffect } from 'react';
import { ExploreFilters } from '@/hooks/useExploreFilters';

interface ExploreSEOProps {
  filters: ExploreFilters;
}

export const ExploreSEO: React.FC<ExploreSEOProps> = ({ filters }) => {
  const { searchQuery, selectedLanguage, selectedList, topicFilter, sortOrder } = filters;

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

  // Set page title for SEO
  useEffect(() => {
    document.title = `${getPageTitle()} | Libra - Biblioteca digitală`;
  }, [selectedLanguage, sortOrder, searchQuery, topicFilter, selectedList]);

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
      <p className="text-muted-foreground">
        Răsfoiește colecția de cărți gratuite din Proiectul Gutenberg
        {searchQuery && <span> care conțin "<strong>{searchQuery}</strong>"</span>}
        {topicFilter && <span> din categoria <strong>{topicFilter}</strong></span>}
      </p>
    </div>
  );
};
