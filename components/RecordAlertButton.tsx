'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, AlertTriangle, Phone, Square } from 'lucide-react';
import toast from 'react-hot-toast';

interface RecordAlertButtonProps {
  language: 'en' | 'es';
  onRecordingStart?: () => void;
  onRecordingStop?: (recordingUrl: string) => void;
  onAlertSent?: () => void;
}

export function RecordAlertButton({ 
  language, 
  onRecordingStart, 
  onRecordingStop, 
  onAlertSent 
}: RecordAlertButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        onRecordingStop?.(url);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      onRecordingStart?.();
      
      toast.success(
        language === 'en' 
          ? 'Recording started' 
          : 'Grabación iniciada'
      );
    } catch (error) {
      console.error('Recording error:', error);
      toast.error(
        language === 'en' 
          ? 'Failed to start recording' 
          : 'Error al iniciar grabación'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast.success(
        language === 'en' 
          ? 'Recording stopped' 
          : 'Grabación detenida'
      );
    }
  };

  const sendAlert = async () => {
    // Simulate sending alert to emergency contacts
    setAlertSent(true);
    onAlertSent?.();
    
    toast.success(
      language === 'en' 
        ? 'Emergency alert sent!' 
        : '¡Alerta de emergencia enviada!'
    );

    // Reset after 5 seconds
    setTimeout(() => setAlertSent(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <span>
            {language === 'en' ? 'Record & Alert' : 'Grabar y Alertar'}
          </span>
        </h2>
        <p className="text-white text-opacity-80">
          {language === 'en' 
            ? 'One-tap recording and emergency contact alerts'
            : 'Grabación de un toque y alertas de contacto de emergencia'
          }
        </p>
      </div>

      {/* Main Controls */}
      <div className="glass-card p-8 text-center space-y-6">
        {/* Recording Button */}
        <div className="space-y-4">
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            className={`record-button ${isRecording ? 'recording' : ''}`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {isRecording ? (
              <>
                <Square className="w-6 h-6 text-white" />
                <div className="pulse-ring" />
              </>
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </motion.button>
          
          <div>
            <p className="text-white font-semibold">
              {isRecording 
                ? (language === 'en' ? 'Recording...' : 'Grabando...')
                : (language === 'en' ? 'Tap to Record' : 'Toca para Grabar')
              }
            </p>
            <p className="text-sm text-white text-opacity-70">
              {language === 'en' 
                ? 'Audio recording for documentation'
                : 'Grabación de audio para documentación'
              }
            </p>
          </div>
        </div>

        {/* Alert Button */}
        <div className="border-t border-white border-opacity-20 pt-6">
          <motion.button
            onClick={sendAlert}
            disabled={alertSent}
            className={`glass-button w-full justify-center ${
              alertSent 
                ? 'bg-green-500 bg-opacity-30' 
                : 'bg-orange-500 bg-opacity-30 hover:bg-opacity-40'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-5 h-5" />
            <span>
              {alertSent 
                ? (language === 'en' ? 'Alert Sent!' : '¡Alerta Enviada!')
                : (language === 'en' ? 'Send Emergency Alert' : 'Enviar Alerta de Emergencia')
              }
            </span>
          </motion.button>
          
          <p className="text-xs text-white text-opacity-60 mt-2">
            {language === 'en' 
              ? 'Notifies your emergency contacts with your location'
              : 'Notifica a tus contactos de emergencia con tu ubicación'
            }
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card p-4">
        <h3 className="font-semibold text-white mb-3">
          {language === 'en' ? 'How to Use:' : 'Cómo Usar:'}
        </h3>
        <ul className="space-y-2 text-sm text-white text-opacity-80">
          <li className="flex items-start space-x-2">
            <span className="text-red-400">1.</span>
            <span>
              {language === 'en' 
                ? 'Tap the red button to start/stop audio recording'
                : 'Toca el botón rojo para iniciar/detener la grabación de audio'
              }
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-orange-400">2.</span>
            <span>
              {language === 'en' 
                ? 'Use the alert button to notify emergency contacts'
                : 'Usa el botón de alerta para notificar contactos de emergencia'
              }
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-400">3.</span>
            <span>
              {language === 'en' 
                ? 'Keep your phone visible but secure during interactions'
                : 'Mantén tu teléfono visible pero seguro durante las interacciones'
              }
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
