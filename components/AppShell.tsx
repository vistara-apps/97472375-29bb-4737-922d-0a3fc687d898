'use client';

import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
import { MapPin, Globe, Settings2, Menu, X } from 'lucide-react';
import { getCurrentLocation } from '@/lib/utils';
import { STATES } from '@/lib/constants';
import type { LocationData } from '@/lib/types';

interface AppShellProps {
  children: React.ReactNode;
  currentLocation: LocationData | null;
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
}

export function AppShell({ 
  children, 
  currentLocation, 
  language, 
  onLanguageChange 
}: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 bg-opacity-20 rounded-full blur-xl floating-element" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 bg-opacity-20 rounded-full blur-lg floating-element" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-400 bg-opacity-15 rounded-full blur-2xl floating-element" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-400 bg-opacity-25 rounded-full blur-lg floating-element" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚖️</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white text-shadow">
              KnowYourRights.fyi
            </h1>
            {currentLocation && (
              <div className="flex items-center space-x-1 text-sm text-white text-opacity-80">
                <MapPin className="w-3 h-3" />
                <span>{STATES[currentLocation.state as keyof typeof STATES] || currentLocation.state}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Language Toggle */}
          <div className="language-toggle">
            <Globe className="w-4 h-4" />
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
              className="text-sm font-medium hover:text-pink-300 transition-colors duration-200"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="glass-card p-2 hover:bg-opacity-20 transition-all duration-200"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 right-4 z-20 glass-card p-4 min-w-48">
          <div className="space-y-3">
            <button className="flex items-center space-x-2 w-full text-left hover:text-pink-300 transition-colors duration-200">
              <Settings2 className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <div className="border-t border-white border-opacity-20 pt-3">
              <p className="text-xs text-white text-opacity-60">
                Your pocket guide to rights during police interactions
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-center">
        <p className="text-sm text-white text-opacity-60">
          {language === 'en' 
            ? 'Know your rights. Stay safe. Stay informed.'
            : 'Conoce tus derechos. Mantente seguro. Mantente informado.'
          }
        </p>
      </footer>
    </div>
  );
}
