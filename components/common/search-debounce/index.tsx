'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@utils/use-debounce';
import { LuSearch, LuX } from 'react-icons/lu';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceMs?: number;
  className?: string;
}

export function SearchDebounce({
  onSearch,
  placeholder = 'Search articles...',
  initialValue = '',
  debounceMs = 500,
  className = '',
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear search input
  const handleClear = () => {
    setSearchTerm('');
  };

  // Effect to call onSearch when the debounced value changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <LuSearch className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="w-full py-2 pl-10 pr-10 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
        placeholder={placeholder}
        aria-label="Search"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <LuX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
