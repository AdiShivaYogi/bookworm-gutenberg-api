
import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ExplorePaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const ExplorePagination: React.FC<ExplorePaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {/* Show ellipsis for many pages */}
        {totalPages > 7 && currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink aria-disabled={true} className="opacity-50">...</PaginationLink>
            </PaginationItem>
          </>
        )}
        
        {/* Generate page numbers */}
        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
          const pageNum = totalPages > 7 
            ? (currentPage > 3 && currentPage < totalPages - 2) 
              ? currentPage - 2 + i
              : currentPage <= 3 
                ? i + 1 
                : totalPages - 4 + i
            : i + 1;
          
          if (pageNum > totalPages) return null;
          
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink 
                onClick={() => setCurrentPage(pageNum)}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        {/* Show ellipsis for many pages */}
        {totalPages > 7 && currentPage < totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationLink aria-disabled={true} className="opacity-50">...</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
