import axios from 'axios';
  import { NewsResponse, Article } from './types';

  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const BASE_URL = 'https://newsapi.org/v2';

  export const fetchTopHeadlines = async (
    page: number = 1,
    category: string = '',
    country: string = 'us'
  ): Promise<NewsResponse> => {
    if (!API_KEY) {
      console.error('API key is missing');
      throw new Error('API key is missing');
    }
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country,
          category: category || undefined,
          page,
          pageSize: 10,
          apiKey: API_KEY,
        },
      });
      console.log('Top headlines response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching top headlines:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.status === 404
        ? 'API endpoint not found. Please check the URL.'
        : error.response?.data?.message || 'Failed to fetch top headlines';
      throw new Error(errorMessage);
    }
  };

  export const searchNews = async (
    query: string,
    page: number = 1
  ): Promise<NewsResponse> => {
    if (!API_KEY) {
      console.error('API key is missing');
      throw new Error('API key is missing');
    }
    if (!query.trim()) {
      throw new Error('Search query cannot be empty');
    }
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          page,
          pageSize: 10,
          apiKey: API_KEY,
        },
      });
      console.log('Search news response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error searching news:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.status === 404
        ? 'API endpoint not found. Please check the URL.'
        : error.response?.data?.message || 'Failed to search news';
      throw new Error(errorMessage);
    }
  };