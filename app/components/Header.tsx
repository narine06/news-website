'use client';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-3xl font-semibold tracking-wide mb-2 sm:mb-0 hover:scale-105 transition-transform duration-200">
        📰 NewsPulse
      </h1>
      <ThemeToggle />
    </header>
  );
}
