
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookText, Search, Loader2 } from 'lucide-react';
import { createPersonalizedCollection } from '@/services/deepSeekService';
import { SmartSearchResults } from '@/components/explore/SmartSearchResults';
import { useToast } from '@/hooks/use-toast';
import { DynamicCollections } from '@/components/explore/DynamicCollections';
import PopularCategories from '@/components/PopularCategories';
import LibraStats from '@/components/LibraStats';

const Index = () => {
  const { toast } = useToast();
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [smartCollection, setSmartCollection] = useState<{ title: string; books: any[] } | null>(null);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };
  
  const handleShowSmartSearch = () => {
    setShowSmartSearch(true);
    if (!smartCollection && !isGenerating) {
      handleGenerateCollection();
    }
  };
  
  const handleGenerateCollection = async () => {
    setIsGenerating(true);
    try {
      const collection = await createPersonalizedCollection("cele mai importante cărți clasice din toate timpurile");
      setSmartCollection(collection);
      
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearchChange={handleSearch} />
      <main className="flex-grow">
        <Hero />
        
        {/* Adăugăm secțiunea de categorii populare */}
        <PopularCategories />

        {showSmartSearch && (
          <section className="container px-4 py-8">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Descoperă colecții personalizate
                  </h2>
                  <p className="text-muted-foreground">
                    Folosește inteligența artificială pentru a crea colecții de cărți bazate pe preferințele tale
                  </p>
                </div>
                <Button 
                  onClick={handleGenerateCollection}
                  disabled={isGenerating}
                  className="whitespace-nowrap"
                >
                  {isGenerating ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" />Se generează...</>
                  ) : (
                    "Generează o colecție"
                  )}
                </Button>
              </div>
              
              {isGenerating && (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              
              {smartCollection && !isGenerating && (
                <SmartSearchResults collection={smartCollection} />
              )}
            </div>
          </section>
        )}

        <section className="container px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookText className="h-6 w-6 text-primary" />
              Colecții personalizate
            </h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleShowSmartSearch} className="gap-1 hidden md:flex">
                <Search className="h-4 w-4" />
                Generează colecție
              </Button>
              <Button variant="link" asChild className="gap-1">
                <a href="/explore">
                  Explorează biblioteca <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Descoperă colecții unice de cărți generate cu AI, adaptate pentru fiecare cititor.
          </p>
        </section>

        {/* Înlocuim colecțiile statice cu colecții dinamice generate de AI */}
        <DynamicCollections />
        
        {/* Adăugăm secțiunea de statistici */}
        <LibraStats />

        <section className="container px-4 py-8 md:py-12">
          <div className="rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 p-8 md:p-10 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-block p-3 bg-accent/20 rounded-lg mb-4">
                  <BookText className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Token-uri READ</h2>
                <p className="text-muted-foreground mb-4 text-lg">
                  Descoperă economia bazată pe token-uri care îți recompensează contribuțiile. 
                  Câștigă token-uri scriind recenzii, traducând texte sau contribuind la comunitate.
                </p>
                <Button asChild size="lg" className="mt-2">
                  <a href="/about">Află despre token-uri</a>
                </Button>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="bg-accent/20 rounded-full p-6 md:p-10">
                  <div className="bg-gradient-to-br from-accent to-primary rounded-full h-40 w-40 flex items-center justify-center text-white font-bold text-3xl">
                    100 READ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
