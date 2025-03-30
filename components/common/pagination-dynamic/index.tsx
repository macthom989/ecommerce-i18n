'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FiMoreHorizontal } from 'react-icons/fi';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages = 0,
  onPageChange,
  siblingsCount = 1,
  className,
  ...props
}: PaginationProps) {
  // Generate page numbers array with dynamic truncation
  const getPageNumbers = () => {
    // Always show first and last page
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Calculate the start and end of the sibling range
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, firstPageIndex);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, lastPageIndex);

    // Should we show dots on left and right side?
    const shouldShowLeftDots = leftSiblingIndex > firstPageIndex + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPageIndex - 1;

    // Case 1: No dots to show, just numbers
    if (!shouldShowLeftDots && !shouldShowRightDots) {
      const range = Array.from({ length: totalPages }, (_, i) => i + 1);
      return range;
    }

    // Case 2: No left dots, but right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingsCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'dots', lastPageIndex];
    }

    // Case 3: No right dots, but left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingsCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => lastPageIndex - rightItemCount + i + 1);
      return [firstPageIndex, 'dots', ...rightRange];
    }

    // Case 4: Both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [firstPageIndex, 'dots', ...middleRange, 'dots', lastPageIndex];
    }

    return [];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={cn('flex items-center justify-center space-x-1', className)} aria-label="Pagination" {...props}>
      <PaginationButton
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <FaChevronLeft className="h-4 w-4" />
      </PaginationButton>

      <div className="flex items-center space-x-1">
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === 'dots') {
            return (
              <span
                key={`dots-${index}`}
                className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
              >
                <FiMoreHorizontal className="h-4 w-4" />
              </span>
            );
          }

          const page = pageNumber as number;
          const isActive = page === currentPage;

          return (
            <PaginationButton
              key={page}
              onClick={() => onPageChange(page)}
              isActive={isActive}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </PaginationButton>
          );
        })}
      </div>

      <PaginationButton
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <FaChevronRight className="h-4 w-4" />
      </PaginationButton>
    </nav>
  );
}

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function PaginationButton({ children, className, isActive, ...props }: PaginationButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isActive
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'bg-transparent hover:bg-muted text-foreground',
        props.disabled && 'pointer-events-none opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
