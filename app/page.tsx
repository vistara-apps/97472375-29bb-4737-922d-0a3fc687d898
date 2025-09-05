'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { StateGuideDisplay } from '@/components/StateGuideDisplay';
import { ScriptViewer } from '@/components/ScriptViewer';
import { RecordAlertButton } from '@/components/RecordAlertButton';
import { ShareCardGenerator } from '@/components/ShareCardGenerator';
import { getCurrentLocation } from '@/lib/utils';
import type { LocationData } from '@/lib/types';
import { BookOpen, MessageSquare, Mic, Share2 } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [activeTab, setActiveTab] = useState<'rights' | 'scripts' | 'record' | 'share'>('rights');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFrameReady();
    
    // Get user location
    getCurrentLocation().then((location) => {
      setCurrentLocation(location);
      setIsLoading(false);
    });
  }, [setFrameReady]);

  const tabs = [
    { id: 'rights', label: language === 'en' ? 'Rights' : 'Derechos', icon: BookOpen },
    { id: 'scripts', label: language === 'en' ? 'Scripts' : 'Scripts', icon: MessageSquare },
    { id: 'record', label: language === 'en' ? 'Record' : 'Grabar', icon: Mic },
    { id: 'share', label: language === 'en' ? 'Share' : 'Compartir', icon: Share2 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">
            {language === 'en' ? 'Loading your rights...' : 'Cargando tus derechos...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      currentLocation={currentLocation}
      language={language}
      onLanguageChange={setLanguage}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 gradient-text">
            KnowYourRights.fyi
          </h1>
          <p className="text-xl text-white text-opacity-90 mb-2">
            {language === 'en' 
              ? 'Your Pocket Guide to Rights During Police Interactions'
              : 'Tu Guía de Bolsillo para Derechos Durante Interacciones Policiales'
            }
          </p>
          <p className="text-white text-opacity-70">
            {language === 'en' 
              ? 'Know your rights. Stay safe. Stay informed.'
              : 'Conoce tus derechos. Mantente seguro. Mantente informado.'
            }
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="glass-card p-2">
          <div className="grid grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-500 bg-opacity-30 text-white'
                      : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'rights' && (
            <StateGuideDisplay location={currentLocation} language={language} />
          )}
          {activeTab === 'scripts' && (
            <ScriptViewer language={language} />
          )}
          {activeTab === 'record' && (
            <RecordAlertButton 
              language={language}
              onRecordingStart={() => console.log('Recording started')}
              onRecordingStop={(url) => console.log('Recording stopped:', url)}
              onAlertSent={() => console.log('Alert sent')}
            />
          )}
          {activeTab === 'share' && (
            <ShareCardGenerator location={currentLocation} language={language} />
          )}
        </div>
      </div>
    </AppShell>
  );
}
