
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Download, 
  Globe, 
  Calendar, 
  Users, 
  Tag,
  HeartIcon,
  BookmarkIcon
} from 'lucide-react';
import { Book } from '@/types/gutendex';
import { fetchBookById, getBookCoverImage, getBookFormats } from '@/services/bookService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import SimilarBooksSection from '@/components/book/SimilarBooksSection';
import CreateCollectionSection from '@/components/book/CreateCollectionSection';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const bookId = parseInt(id || '0', 10);

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => fetchBookById(bookId),
    enabled: bookId > 0,
  });

  const coverImage = book ? getBookCoverImage(book) : '';
  const formats = book ? getBookFormats(book) : {};

  // Token-based features (mock implementation)
  const handleAddBookmark = () => {
    toast({
      title: "Added to bookmarks",
      description: "You earned 2 READ tokens for adding this book to your reading list.",
    });
  };

  const handleLike = () => {
    toast({
      title: "You like this book",
      description: "Thanks for sharing your opinion!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container px-4 py-8 flex-grow">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
              <Skeleton className="aspect-[2/3] w-full h-auto mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="md:w-2/3 lg:w-3/4">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-8" />
              <Skeleton className="h-32 w-full mb-6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
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
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover and Download Links */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="sticky top-24">
              <div className="rounded-md overflow-hidden border mb-6">
                <img
                  src={coverImage}
                  alt={`Cover of ${book?.title}`}
                  className="w-full aspect-[2/3] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              
              <div className="space-y-3 mb-6">
                <Button onClick={handleAddBookmark} variant="outline" className="w-full flex gap-2 justify-center">
                  <BookmarkIcon className="h-4 w-4" /> Add to Reading List
                </Button>
                <Button onClick={handleLike} variant="outline" className="w-full flex gap-2 justify-center">
                  <HeartIcon className="h-4 w-4" /> Like
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium mb-2 flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Formats
                </h3>
                
                {Object.entries(formats).map(([format, url]) => (
                  <a
                    key={format}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 text-sm border rounded-md hover:bg-muted transition-colors"
                  >
                    <span>{format}</span>
                    <Download className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{book?.title}</h1>
            
            {/* Authors */}
            <div className="mb-6">
              {book?.authors.map((author, index) => (
                <span key={index} className="text-lg">
                  {author.name}
                  {author.birth_year || author.death_year ? (
                    <span className="text-muted-foreground">
                      {' '}({author.birth_year || '?'} - {author.death_year || '?'})
                    </span>
                  ) : null}
                  {index < book.authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
            
            {/* Stats & Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Globe className="mr-1 h-4 w-4" />
                {book?.languages.map(lang => lang.toUpperCase()).join(', ')}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                {book?.download_count.toLocaleString()} downloads
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {book?.copyright === null 
                  ? 'Unknown copyright' 
                  : book?.copyright 
                    ? 'Copyrighted' 
                    : 'Public Domain'
                }
              </div>
            </div>
            
            {/* Subjects & Bookshelves */}
            {book?.subjects && book.subjects.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2 flex items-center">
                  <Tag className="mr-2 h-4 w-4" /> Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">{subject}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {book?.bookshelves && book.bookshelves.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Bookshelves</h3>
                <div className="flex flex-wrap gap-2">
                  {book.bookshelves.map((shelf, index) => (
                    <Badge key={index} variant="outline">{shelf}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <Separator className="my-6" />
            
            {/* Translators if any */}
            {book?.translators && book.translators.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Translators</h3>
                <p>
                  {book.translators.map((translator, index) => (
                    <span key={index}>
                      {translator.name}
                      {index < book.translators.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            )}
            
            {/* AI-powered Recommendations */}
            {book && <SimilarBooksSection book={book} />}
            
            {/* AI-powered Collection Creator */}
            {book && <CreateCollectionSection book={book} />}
            
            {/* Community Section (placeholder for token rewards) */}
            <div className="bg-muted/30 border rounded-lg p-4 mt-8">
              <h3 className="font-medium mb-2">Community Contributions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Help improve this book's information and earn READ tokens. 
                Write reviews, add missing details, or help with translations.
              </p>
              <Button variant="outline" disabled>
                Contribute and Earn Tokens (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;
