import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowYourRights.fyi - Your Pocket Guide to Rights',
  description: 'Instant, location-aware legal rights information and communication tools for police interactions.',
  keywords: 'legal rights, police interactions, civil rights, know your rights',
  authors: [{ name: 'KnowYourRights.fyi' }],
  openGraph: {
    title: 'KnowYourRights.fyi',
    description: 'Your Pocket Guide to Rights During Police Interactions',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
