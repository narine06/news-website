'use client';
  import { useState, useEffect, useCallback } from 'react';
  import { debounce } from 'lodash';

  interface SearchBarProps {
    onSearch: (query: string) => void;
    initialQuery: string;
  }

  export default function SearchBar({ onSearch, initialQuery }: SearchBarProps) {
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
      setQuery(initialQuery);
    }, [initialQuery]);

    const debouncedSearch = useCallback(
      debounce((value: string) => {
        onSearch(value);
      }, 500),
      [onSearch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      debouncedSearch(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query);
    };

    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search news..."
          className="p-2 border rounded-l-md w-64 text-black dark:text-white bg-white dark:bg-gray-800"
          suppressHydrationWarning
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md"
          suppressHydrationWarning
        >
          Search
        </button>
      </form>
    );
  }