
import React from 'react';
import { Languages, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

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

  return (
    <div className="p-4 md:p-6 mb-6 bg-muted/50 rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="flex items-center text-lg font-medium">
          <Filter className="mr-2 h-5 w-5 text-muted-foreground" />
          Filter Books
        </h2>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="w-full sm:w-48">
            <Label htmlFor="language" className="mb-1 block">
              <Languages className="inline mr-1 h-3 w-3" /> Language
            </Label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger id="language">
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
            <Label htmlFor="sort" className="mb-1 block">Sort By</Label>
            <Select
              value={sortOrder}
              onValueChange={setSortOrder}
            >
              <SelectTrigger id="sort">
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
      </div>
    </div>
  );
};

export default FilterPanel;
