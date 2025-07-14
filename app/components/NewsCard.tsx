'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../lib/types';

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div style={{ border: '2px solid red', padding: '16px', marginBottom: '16px' }}>
      <div style={{ display: 'flex' }}>
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            style={{ width: '150px', height: '100px', objectFit: 'cover', marginRight: '16px' }}
          />
        )}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{article.title}</h2>
          <p style={{ color: '#666' }}>{article.description}</p>
          <p style={{ fontSize: '14px', color: '#888' }}>
            {article.source.name} | {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}