
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBookById } from '@/services/bookService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCover from '@/components/book/BookCover';
import BookInfo from '@/components/book/BookInfo';
import CommunitySection from '@/components/book/CommunitySection';
import BookDetailsSkeleton from '@/components/book/BookDetailsSkeleton';
import BookErrorDisplay from '@/components/book/BookErrorDisplay';
import SimilarBooksSection from '@/components/book/SimilarBooksSection';
import CreateCollectionSection from '@/components/book/CreateCollectionSection';
import BookPreface from '@/components/book/BookPreface';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = parseInt(id || '0', 10);

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => fetchBookById(bookId),
    enabled: bookId > 0,
  });

  if (isLoading) {
    return <BookDetailsSkeleton />;
  }

  if (error || !book) {
    return <BookErrorDisplay />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover and Download Links */}
          <BookCover book={book} />
          
          {/* Book Details */}
          <div className="md:w-2/3 lg:w-3/4">
            <BookInfo book={book} />
            
            {/* AI-generated Preface */}
            <BookPreface book={book} />
            
            {/* AI-powered Recommendations */}
            <SimilarBooksSection book={book} />
            
            {/* AI-powered Collection Creator */}
            <CreateCollectionSection book={book} />
            
            {/* Community Section */}
            <CommunitySection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;
