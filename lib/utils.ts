import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LocationData } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCurrentLocation(): Promise<LocationData | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get state information
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const data = await response.json();
            resolve({
              state: data.principalSubdivisionCode?.replace('US-', '') || 'CA',
              city: data.city || 'Unknown',
              lat: latitude,
              lng: longitude
            });
          } else {
            // Fallback to California if geocoding fails
            resolve({
              state: 'CA',
              city: 'Unknown',
              lat: latitude,
              lng: longitude
            });
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          resolve({
            state: 'CA',
            city: 'Unknown',
            lat: latitude,
            lng: longitude
          });
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Default to California
        resolve({
          state: 'CA',
          city: 'San Francisco',
          lat: 37.7749,
          lng: -122.4194
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function generateScript(scenario: string, language: 'en' | 'es'): Promise<string> {
  try {
    const response = await fetch('/api/generate-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scenario, language }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate script');
    }

    const data = await response.json();
    return data.script;
  } catch (error) {
    console.error('Script generation error:', error);
    return language === 'en' 
      ? "I am exercising my right to remain silent. I do not consent to any searches. Am I free to leave?"
      : "Estoy ejerciendo mi derecho a permanecer en silencio. No consiento ningún registro. ¿Soy libre de irme?";
  }
}
