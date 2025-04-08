'use client';

import { useEffect, useRef, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { SortOptionValue } from '@services/post/get-all-posts';

export interface SortOption {
  label: string;
  value: SortOptionValue;
}

interface SortSelectProps {
  options: SortOption[];
  defaultValue?: string;
  onChange: (value: SortOptionValue) => void;
  className?: string;
}

export function SortSelect({ options, defaultValue, onChange, className = '' }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption | undefined>(
    options.find((option) => option.value === defaultValue) || options[0],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle option selection
  const handleSelect = (option: SortOption) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-w-[140px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>Sort by: {selectedOption?.label}</span>
        <LuChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 max-h-60 overflow-auto">
          <ul role="listbox" className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selectedOption?.value === option.value ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700'
                }`}
                role="option"
                aria-selected={selectedOption?.value === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
