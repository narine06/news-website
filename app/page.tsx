'use client';
import { useState, useEffect } from 'react';
import NewsList from './components/NewsList';
import SearchBar from './components/SearchBar';
import CategoryNav from './components/CategoryNav';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { fetchTopHeadlines, searchNews } from './lib/api';
import { NewsResponse } from './lib/types';

export default function Home() {
  const [articles, setArticles] = useState<NewsResponse>({ status: '', totalResults: 0, articles: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [initialQuery, setInitialQuery] = useState('');

  // Access localStorage only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedQuery = localStorage.getItem('lastSearch') || '';
      setInitialQuery(savedQuery);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = query
        ? await searchNews(query, page)
        : await fetchTopHeadlines(page, category);
      console.log('API Response:', data); // Log the response
      setArticles(data);
    } catch (err) {
      console.error('API Error:', err); // Log the error
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
};
    fetchData();
  }, [page, category, query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSearch', searchQuery);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setQuery('');
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} initialQuery={initialQuery} />
      <CategoryNav onCategoryChange={handleCategoryChange} currentCategory={category} />
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <NewsList articles={articles.articles} />}
      <Pagination
        currentPage={page}
        totalResults={articles.totalResults}
        onPageChange={setPage}
      />
    </div>
  );
}