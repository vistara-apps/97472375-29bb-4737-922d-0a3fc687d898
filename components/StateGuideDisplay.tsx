'use client';

// import { motion } from 'framer-motion';
import { CheckCircle, XCircle, MessageCircle, MapPin } from 'lucide-react';
import { DEFAULT_RIGHTS, STATES } from '@/lib/constants';
import type { LocationData } from '@/lib/types';

interface StateGuideDisplayProps {
  location: LocationData | null;
  language: 'en' | 'es';
}

export function StateGuideDisplay({ location, language }: StateGuideDisplayProps) {
  const rights = DEFAULT_RIGHTS[language];
  const stateName = location ? STATES[location.state as keyof typeof STATES] : 'Unknown';

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 text-pink-400" />
          <h2 className="text-2xl font-bold text-white">
            {language === 'en' ? 'Your Rights in' : 'Tus Derechos en'} {stateName}
          </h2>
        </div>
        <p className="text-white text-opacity-80">
          {language === 'en' 
            ? 'This information is based on your current location and general legal principles.'
            : 'Esta información se basa en tu ubicación actual y principios legales generales.'
          }
        </p>
      </div>

      {/* Rights Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* What You Can Do */}
        <div className="rights-guide">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              {language === 'en' ? 'What You Can Do' : 'Lo Que Puedes Hacer'}
            </h3>
          </div>
          <ul className="space-y-3">
            {rights.whatYouCan.map((right, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-white text-opacity-90 text-sm leading-relaxed">
                  {right}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* What You Cannot Do */}
        <div className="rights-guide">
          <div className="flex items-center space-x-2 mb-4">
            <XCircle className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-white">
              {language === 'en' ? 'What You Cannot Do' : 'Lo Que No Puedes Hacer'}
            </h3>
          </div>
          <ul className="space-y-3">
            {rights.whatYouCannotDo.map((restriction, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-white text-opacity-90 text-sm leading-relaxed">
                  {restriction}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to Say */}
        <div className="rights-guide">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              {language === 'en' ? 'What to Say' : 'Qué Decir'}
            </h3>
          </div>
          <ul className="space-y-3">
            {rights.whatToSay.map((phrase, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-white text-opacity-90 text-sm leading-relaxed italic">
                  "{phrase}"
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="glass-card p-4 text-center">
        <p className="text-xs text-white text-opacity-70">
          {language === 'en' 
            ? '⚠️ This information is for educational purposes only and does not constitute legal advice. Laws may vary by jurisdiction. Consult with a qualified attorney for specific legal guidance.'
            : '⚠️ Esta información es solo para fines educativos y no constituye asesoramiento legal. Las leyes pueden variar según la jurisdicción. Consulta con un abogado calificado para orientación legal específica.'
          }
        </p>
      </div>
    </div>
  );
}
