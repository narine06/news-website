'use client';
import { useState } from 'react';

interface CategoryNavProps {
  onCategoryChange: (category: string) => void;
  currentCategory: string;
}

const categories = [
  { id: '', label: 'All', icon: '📋' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
];

export default function CategoryNav({ onCategoryChange, currentCategory }: CategoryNavProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="mb-8" role="navigation" aria-label="Category filter">
      <div className="flex flex-wrap gap-10 sm:gap-10 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {categories.map((category) => {
          const isActive = currentCategory === category.id;
          const isHovered = hoveredCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`
                group relative px-4 py-2.5 rounded-lg font-medium text-sm
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                dark:focus:ring-offset-gray-800
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md hover:scale-102'
                }
                ${isHovered && !isActive ? 'transform translate-y-[-1px]' : ''}
                active:scale-95
                border border-gray-200 dark:border-gray-600
              `}
              aria-pressed={isActive}
              aria-label={`Filter by ${category.label}`}
              suppressHydrationWarning={true}
            >
              <span className="flex items-center gap-2">
                <span className={`text-lg transition-transform duration-200 ${isActive || isHovered ? 'scale-110' : ''}`}>
                  {category.icon}
                </span>
                <span className="font-semibold">
                  {category.label}
                </span>
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-300 rounded-full animate-pulse" />
              )}
              
              {/* Hover glow effect */}
              {isHovered && !isActive && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Mobile-friendly indicator */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center sm:hidden">
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
          {categories.find(cat => cat.id === currentCategory)?.label || 'All'} selected
        </span>
      </div>
    </nav>
  );
}