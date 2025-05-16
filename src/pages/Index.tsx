
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BookGrid from '../components/BookGrid';
import Footer from '../components/Footer';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types/gutendex';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookText } from 'lucide-react';

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
        setFeaturedBooks(popularData.results.slice(0, 5));
        
        // Get classics (in this case, we'll use books with "classic" in topics)
        const classicsData = await fetchBooks({ topic: 'fiction' });
        setClassicsBooks(classicsData.results.slice(0, 5));
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
      <main>
        <Hero />

        <section className="container px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Books</h2>
            <Button variant="link" asChild className="gap-1">
              <a href="/explore">
                View all <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <BookGrid books={featuredBooks} isLoading={isLoading} />
        </section>

        <section className="container px-4 py-8 md:py-12">
          <div className="rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="inline-block p-3 bg-accent/20 rounded-lg mb-4">
                  <BookText className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-3">READ Tokens</h2>
                <p className="text-muted-foreground mb-4">
                  Discover the token-based economy that rewards your contributions. 
                  Earn tokens by writing reviews, translating texts, or contributing to the community.
                </p>
                <Button asChild variant="outline">
                  <a href="/about">Learn about tokens</a>
                </Button>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="bg-accent/20 rounded-full p-4 md:p-8">
                  <div className="bg-gradient-to-br from-accent to-primary rounded-full h-32 w-32 flex items-center justify-center text-white font-bold text-2xl">
                    100 READ
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Fiction Classics</h2>
            <Button variant="link" asChild className="gap-1">
              <a href="/explore?topic=fiction">
                More fiction <ArrowRight className="h-4 w-4" />
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
