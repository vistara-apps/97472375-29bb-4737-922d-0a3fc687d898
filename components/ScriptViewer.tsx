'use client';

import { useState } from 'react';
// import { motion } from 'framer-motion';
import { Copy, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { SCENARIOS } from '@/lib/constants';
import { generateScript } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ScriptViewerProps {
  language: 'en' | 'es';
}

export function ScriptViewer({ language }: ScriptViewerProps) {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0].id);
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    try {
      const script = await generateScript(selectedScenario, language);
      setGeneratedScript(script);
      toast.success(language === 'en' ? 'Script generated!' : '¡Script generado!');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to generate script' : 'Error al generar script');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyScript = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      toast.success(language === 'en' ? 'Script copied!' : '¡Script copiado!');
    }
  };

  const handleSpeakScript = () => {
    if (generatedScript && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(generatedScript);
      utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <span>{language === 'en' ? 'Script Generator' : 'Generador de Scripts'}</span>
        </h2>
        <p className="text-white text-opacity-80">
          {language === 'en' 
            ? 'Get AI-powered scripts for different police interaction scenarios'
            : 'Obtén scripts impulsados por IA para diferentes escenarios de interacción policial'
          }
        </p>
      </div>

      {/* Scenario Selection */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {language === 'en' ? 'Select Scenario' : 'Seleccionar Escenario'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                selectedScenario === scenario.id
                  ? 'bg-purple-500 bg-opacity-30 border-purple-400'
                  : 'bg-white bg-opacity-10 border-white border-opacity-20 hover:bg-opacity-20'
              }`}
            >
              <div className="text-2xl mb-1">{scenario.icon}</div>
              <div className="text-sm font-medium text-white">{scenario.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={handleGenerateScript}
          disabled={isGenerating}
          className="glass-button inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          <span>
            {isGenerating 
              ? (language === 'en' ? 'Generating...' : 'Generando...')
              : (language === 'en' ? 'Generate Script' : 'Generar Script')
            }
          </span>
        </button>
      </div>

      {/* Generated Script */}
      {generatedScript && (
        <div className="script-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {language === 'en' ? 'Generated Script' : 'Script Generado'}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSpeakScript}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
                title={language === 'en' ? 'Speak script' : 'Leer script'}
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyScript}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
                title={language === 'en' ? 'Copy script' : 'Copiar script'}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-black bg-opacity-20 rounded-lg p-4">
            <p className="text-white leading-relaxed">{generatedScript}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {SCENARIOS.find(s => s.id === selectedScenario) && (
              <span className="scenario-tag">
                {SCENARIOS.find(s => s.id === selectedScenario)?.title}
              </span>
            )}
            <span className="scenario-tag">
              {language === 'en' ? 'AI Generated' : 'Generado por IA'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
