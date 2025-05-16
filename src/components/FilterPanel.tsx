
import React, { useState } from 'react';
import { Languages, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterPanelProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  sortOrder,
  setSortOrder
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const languages = [
    { code: 'all', name: 'All Languages' }, // Changed from empty string to 'all'
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'es', name: 'Spanish' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'fi', name: 'Finnish' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'ascending', label: 'Title A-Z' },
    { value: 'descending', label: 'Title Z-A' },
  ];

  // Update active filters display
  const updateActiveFilters = () => {
    const filters: string[] = [];
    
    if (selectedLanguage !== 'all') {
      const langName = languages.find(lang => lang.code === selectedLanguage)?.name || '';
      if (langName) filters.push(langName);
    }
    
    if (sortOrder !== 'popular') {
      const sortName = sortOptions.find(opt => opt.value === sortOrder)?.label || '';
      if (sortName) filters.push(sortName);
    }
    
    setActiveFilters(filters);
  };

  // Call updateActiveFilters when filters change
  React.useEffect(() => {
    updateActiveFilters();
  }, [selectedLanguage, sortOrder]);

  const clearLanguage = () => {
    setSelectedLanguage('all');
  };

  const clearSort = () => {
    setSortOrder('popular');
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="p-4 md:p-6 mb-6 bg-muted/50 rounded-lg border border-border/50 shadow-sm transition-all"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 px-0 font-medium text-lg hover:bg-transparent hover:text-primary"
          >
            <Filter className="h-5 w-5 text-muted-foreground" />
            Filter Books
            <ChevronDown 
              className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </Button>
        </CollapsibleTrigger>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(filter => (
              <div 
                key={filter} 
                className="flex items-center gap-1 text-xs bg-accent/30 text-accent-foreground px-2 py-1 rounded-full"
              >
                {filter}
              </div>
            ))}
            
            {activeFilters.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs px-2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  clearLanguage();
                  clearSort();
                }}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>
      
      <CollapsibleContent className="mt-4">
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="w-full sm:w-48">
            <Label htmlFor="language" className="mb-1 block text-sm font-medium flex items-center gap-1">
              <Languages className="h-3.5 w-3.5 text-accent" /> Language
            </Label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger id="language" className="bg-background/80">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-48">
            <Label htmlFor="sort" className="mb-1 block text-sm font-medium flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5 text-accent" /> Sort By
            </Label>
            <Select
              value={sortOrder}
              onValueChange={setSortOrder}
            >
              <SelectTrigger id="sort" className="bg-background/80">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterPanel;
