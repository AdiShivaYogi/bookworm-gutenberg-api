
import React from 'react';
import { Download } from 'lucide-react';
import { Book } from '@/types/gutendex';
import { Button } from '@/components/ui/button';
import { getBookCoverImage, getBookFormats } from '@/services/bookService';
import { useToast } from '@/hooks/use-toast';

interface BookCoverProps {
  book: Book;
}

const BookCover: React.FC<BookCoverProps> = ({ book }) => {
  const { toast } = useToast();
  const coverImage = getBookCoverImage(book);
  const formats = getBookFormats(book);

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

  return (
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
  );
};

// Need to add missing import
import { BookmarkIcon, HeartIcon } from 'lucide-react';

export default BookCover;
