
import React, { useState } from 'react';
import { Languages, Filter, ChevronDown, SlidersHorizontal, TrendingUp, BookOpen, Calendar, Award, Star } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterPanelProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  onPopularListSelect?: (listType: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  sortOrder,
  setSortOrder,
  onPopularListSelect
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [selectedList, setSelectedList] = useState<string | null>(null);

  const languages = [
    { code: 'all', name: 'Toate limbile', seo: 'carti in toate limbile' },
    { code: 'en', name: 'Engleză', seo: 'carti in limba engleza' },
    { code: 'fr', name: 'Franceză', seo: 'carti in limba franceza' },
    { code: 'de', name: 'Germană', seo: 'carti in limba germana' },
    { code: 'es', name: 'Spaniolă', seo: 'carti in limba spaniola' },
    { code: 'it', name: 'Italiană', seo: 'carti in limba italiana' },
    { code: 'pt', name: 'Portugheză', seo: 'carti in limba portugheza' },
    { code: 'ru', name: 'Rusă', seo: 'carti in limba rusa' },
    { code: 'fi', name: 'Finlandeză', seo: 'carti in limba finlandeza' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Cele mai populare', seo: 'cele mai populare carti' },
    { value: 'ascending', label: 'Titlu A-Z', seo: 'carti in ordine alfabetica' },
    { value: 'descending', label: 'Titlu Z-A', seo: 'carti in ordine alfabetica inversa' },
  ];

  const popularLists = [
    { value: 'top-downloads', label: 'Cele mai descărcate', seo: 'cele mai descarcate carti gratuite', icon: <TrendingUp className="h-4 w-4 text-accent" /> },
    { value: 'new-additions', label: 'Adăugate recent', seo: 'cele mai noi carti adaugate', icon: <Calendar className="h-4 w-4 text-accent" /> },
    { value: 'classics', label: 'Literatură clasică', seo: 'literatura clasica gratuita', icon: <Award className="h-4 w-4 text-accent" /> },
    { value: 'fiction', label: 'Ficțiune populară', seo: 'cele mai bune carti de fictiune', icon: <BookOpen className="h-4 w-4 text-accent" /> },
    { value: 'educational', label: 'Cărți educaționale', seo: 'carti educationale gratuite', icon: <Star className="h-4 w-4 text-accent" /> },
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

    if (selectedList) {
      const listName = popularLists.find(list => list.value === selectedList)?.label || '';
      if (listName) filters.push(listName);
    }
    
    setActiveFilters(filters);
  };

  // Call updateActiveFilters when filters change
  React.useEffect(() => {
    updateActiveFilters();
  }, [selectedLanguage, sortOrder, selectedList]);

  const clearLanguage = () => {
    setSelectedLanguage('all');
  };

  const clearSort = () => {
    setSortOrder('popular');
  };

  const clearAllFilters = () => {
    clearLanguage();
    clearSort();
    setSelectedList(null);
    if (onPopularListSelect) onPopularListSelect('');
  };

  const handlePopularListSelect = (listValue: string) => {
    if (selectedList === listValue) {
      setSelectedList(null);
      if (onPopularListSelect) onPopularListSelect('');
    } else {
      setSelectedList(listValue);
      if (onPopularListSelect) onPopularListSelect(listValue);
    }
    setActiveTab("basic"); // Return to basic tab after selection
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
            Filtrare cărți
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
                onClick={clearAllFilters}
              >
                Șterge toate
              </Button>
            )}
          </div>
        )}
      </div>
      
      <CollapsibleContent className="mt-4">
        <Tabs defaultValue="basic" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Filtre de bază</TabsTrigger>
            <TabsTrigger value="popular">Liste populare</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="w-full sm:w-48">
                <Label htmlFor="language" className="mb-1 block text-sm font-medium flex items-center gap-1">
                  <Languages className="h-3.5 w-3.5 text-accent" /> Limbă
                </Label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger id="language" className="bg-background/80">
                    <SelectValue placeholder="Selectează limba" />
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
                  <SlidersHorizontal className="h-3.5 w-3.5 text-accent" /> Sortează după
                </Label>
                <Select
                  value={sortOrder}
                  onValueChange={setSortOrder}
                >
                  <SelectTrigger id="sort" className="bg-background/80">
                    <SelectValue placeholder="Sortează după" />
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
          </TabsContent>

          <TabsContent value="popular" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {popularLists.map((list) => (
                <Button
                  key={list.value}
                  variant={selectedList === list.value ? "default" : "outline"}
                  size="sm"
                  className="justify-start gap-2 h-auto py-3"
                  onClick={() => handlePopularListSelect(list.value)}
                >
                  {list.icon}
                  <span>{list.label}</span>
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Selectează o listă populară pentru a filtra rapid cărțile după categoria dorită
            </p>
          </TabsContent>
        </Tabs>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterPanel;
