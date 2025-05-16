
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BookGrid from '../components/BookGrid';
import Footer from '../components/Footer';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types/gutendex';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookText, Star, Bookmark } from 'lucide-react';
import SectionHeader from '../components/book/SectionHeader';

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [classicsBooks, setClassicsBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setIsLoading(true);
        // Get popular books
        const popularData = await fetchBooks({ sort: 'popular' });
        setFeaturedBooks(popularData.results.slice(0, 6));
        
        // Get classics (in this case, we'll use books with "fiction" in topics)
        const classicsData = await fetchBooks({ topic: 'fiction' });
        setClassicsBooks(classicsData.results.slice(0, 6));
      } catch (error) {
        console.error('Error fetching books for homepage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearchChange={handleSearch} />
      <main className="flex-grow">
        <Hero />

        <section className="container px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Cărți Populare" icon={<Star className="h-5 w-5" />} />
            <Button variant="link" asChild className="gap-1">
              <a href="/explore">
                Vezi toate <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <BookGrid books={featuredBooks} isLoading={isLoading} />
        </section>

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
          
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Clasici de Ficțiune" icon={<Bookmark className="h-5 w-5" />} />
            <Button variant="link" asChild className="gap-1">
              <a href="/explore?topic=fiction">
                Mai multă ficțiune <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <BookGrid books={classicsBooks} isLoading={isLoading} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
