import { render, screen } from '@testing-library/react';
import NewsCard from '../app/components/NewsCard';
import { Article } from '../app/lib/types';

describe('NewsCard', () => {
  const article: Article = {
    source: { id: null, name: 'Test Source' },
    author: 'Test Author',
    title: 'Test News',
    description: 'This is a test description',
    url: 'https://test.com',
    urlToImage: 'https://via.placeholder.com/150',
    publishedAt: '2025-07-10T12:00:00Z',
    content: 'Test content',
  };

  it('renders article title and description', () => {
    render(<NewsCard article={article} />);
    expect(screen.getByText('Test News')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('renders image when urlToImage is provided', () => {
    render(<NewsCard article={article} />);
    expect(screen.getByAltText('Test News')).toHaveAttribute('src', expect.stringContaining('https://via.placeholder.com/150'));
  });

  it('links to the correct article URL', () => {
    render(<NewsCard article={article} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/news/https%3A%2F%2Ftest.com');
  });
});