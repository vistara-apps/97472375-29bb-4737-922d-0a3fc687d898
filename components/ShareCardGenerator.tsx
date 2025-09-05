'use client';

import { useState } from 'react';
// import { motion } from 'framer-motion';
import { Share2, Download, Copy, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { LocationData } from '@/lib/types';

interface ShareCardGeneratorProps {
  language: 'en' | 'es';
  location: LocationData | null;
}

export function ShareCardGenerator({ language, location }: ShareCardGeneratorProps) {
  const [cardData, setCardData] = useState({
    scenario: 'traffic-stop',
    notes: '',
    includeLocation: true,
  });
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCard = async () => {
    setIsGenerating(true);
    
    // Simulate card generation
    setTimeout(() => {
      const cardContent = {
        title: language === 'en' ? 'Know Your Rights' : 'Conoce Tus Derechos',
        scenario: cardData.scenario,
        location: cardData.includeLocation ? location : null,
        timestamp: new Date(),
        notes: cardData.notes,
        rights: language === 'en' 
          ? ['Right to remain silent', 'Right to refuse searches', 'Right to ask if free to leave']
          : ['Derecho a permanecer en silencio', 'Derecho a rechazar registros', 'Derecho a preguntar si puedes irte']
      };
      
      setGeneratedCard(JSON.stringify(cardContent, null, 2));
      setIsGenerating(false);
      toast.success(language === 'en' ? 'Card generated!' : '¡Tarjeta generada!');
    }, 2000);
  };

  const copyCard = () => {
    if (generatedCard) {
      navigator.clipboard.writeText(generatedCard);
      toast.success(language === 'en' ? 'Card copied!' : '¡Tarjeta copiada!');
    }
  };

  const shareToFarcaster = () => {
    if (generatedCard) {
      const text = encodeURIComponent(
        language === 'en' 
          ? 'Just generated my rights summary card with KnowYourRights.fyi 🛡️'
          : 'Acabo de generar mi tarjeta de resumen de derechos con KnowYourRights.fyi 🛡️'
      );
      window.open(`https://warpcast.com/~/compose?text=${text}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <Share2 className="w-6 h-6 text-green-400" />
          <span>
            {language === 'en' ? 'Share Card Generator' : 'Generador de Tarjetas para Compartir'}
          </span>
        </h2>
        <p className="text-white text-opacity-80">
          {language === 'en' 
            ? 'Create shareable summaries of your rights and interactions'
            : 'Crea resúmenes compartibles de tus derechos e interacciones'
          }
        </p>
      </div>

      {/* Card Configuration */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">
          {language === 'en' ? 'Card Settings' : 'Configuración de Tarjeta'}
        </h3>
        
        {/* Scenario Selection */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {language === 'en' ? 'Scenario' : 'Escenario'}
          </label>
          <select
            value={cardData.scenario}
            onChange={(e) => setCardData({ ...cardData, scenario: e.target.value })}
            className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:border-purple-400"
          >
            <option value="traffic-stop">
              {language === 'en' ? 'Traffic Stop' : 'Parada de Tráfico'}
            </option>
            <option value="street-encounter">
              {language === 'en' ? 'Street Encounter' : 'Encuentro Callejero'}
            </option>
            <option value="questioning">
              {language === 'en' ? 'Questioning' : 'Interrogatorio'}
            </option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {language === 'en' ? 'Notes (Optional)' : 'Notas (Opcional)'}
          </label>
          <textarea
            value={cardData.notes}
            onChange={(e) => setCardData({ ...cardData, notes: e.target.value })}
            placeholder={language === 'en' ? 'Add any additional notes...' : 'Agregar notas adicionales...'}
            className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-purple-400 resize-none"
            rows={3}
          />
        </div>

        {/* Include Location */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="includeLocation"
            checked={cardData.includeLocation}
            onChange={(e) => setCardData({ ...cardData, includeLocation: e.target.checked })}
            className="w-4 h-4 text-purple-600 bg-transparent border-white border-opacity-30 rounded focus:ring-purple-500"
          />
          <label htmlFor="includeLocation" className="text-sm text-white">
            {language === 'en' ? 'Include location information' : 'Incluir información de ubicación'}
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={generateCard}
          disabled={isGenerating}
          className="glass-button bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
        >
          <Share2 className="w-5 h-5" />
          <span>
            {isGenerating 
              ? (language === 'en' ? 'Generating...' : 'Generando...')
              : (language === 'en' ? 'Generate Card' : 'Generar Tarjeta')
            }
          </span>
        </button>
      </div>

      {/* Generated Card Preview */}
      {generatedCard && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {language === 'en' ? 'Generated Card' : 'Tarjeta Generada'}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyCard}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
                title={language === 'en' ? 'Copy card' : 'Copiar tarjeta'}
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={shareToFarcaster}
                className="p-2 bg-purple-500 bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-all duration-200"
                title={language === 'en' ? 'Share to Farcaster' : 'Compartir en Farcaster'}
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card Preview */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">KnowYourRights.fyi</h4>
              <span className="text-sm opacity-80">
                {formatDate(new Date())}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm opacity-80">
                  {language === 'en' ? 'Scenario:' : 'Escenario:'}
                </span>
                <p className="font-medium capitalize">{cardData.scenario.replace('-', ' ')}</p>
              </div>
              
              {cardData.includeLocation && location && (
                <div>
                  <span className="text-sm opacity-80">
                    {language === 'en' ? 'Location:' : 'Ubicación:'}
                  </span>
                  <p className="font-medium">{location.city}, {location.state}</p>
                </div>
              )}
              
              {cardData.notes && (
                <div>
                  <span className="text-sm opacity-80">
                    {language === 'en' ? 'Notes:' : 'Notas:'}
                  </span>
                  <p className="font-medium">{cardData.notes}</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
              <p className="text-xs opacity-70">
                {language === 'en' 
                  ? '🛡️ Know your rights. Stay safe. Stay informed.'
                  : '🛡️ Conoce tus derechos. Mantente seguro. Mantente informado.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
