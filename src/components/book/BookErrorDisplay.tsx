
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BookErrorDisplay: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container px-4 py-8 flex-grow">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Book</h1>
          <p className="text-muted-foreground">
            We couldn't find the book you're looking for. Please try again later.
          </p>
          <Button asChild className="mt-6">
            <a href="/explore">Browse Other Books</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookErrorDisplay;
