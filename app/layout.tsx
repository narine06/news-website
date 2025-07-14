import './globals.css';
import Header from './components/Header';
import { ThemeProvider } from './components/ThemeContext';

export const metadata = {
  title: 'News Website',
  description: 'A news website built with Next.js and NewsAPI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
