'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Article } from '../../lib/types';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

export default function NewsDetails({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // In a real app, fetch article by ID or use passed data
    // Here, we assume article is fetched or passed via context
    setLoading(false);
    // For demo, we'll use dummy data or context
    setArticle({
      source: { id: null, name: 'Sample Source' },
      author: 'Sample Author',
      title: 'Sample News Article',
      description: 'This is a sample description.',
      url: '#',
      urlToImage: 'https://via.placeholder.com/800x400',
      publishedAt: '2025-07-10T12:00:00Z',
      content: 'This is the full content of the sample news article...',
    });
  }, [params.id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!article) return <ErrorMessage message="Article not found" />;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        Back to News
      </button>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          width={800}
          height={400}
          className="w-full h-auto mb-4"
        />
      )}
      <p className="text-gray-600 mb-2">
        By {article.author || 'Unknown'} | {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">{article.description}</p>
      <p className="text-gray-800">{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Read more at {article.source.name}
      </a>
    </div>
  );
}