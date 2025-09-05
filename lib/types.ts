export interface User {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  fName?: string;
  username?: string;
  preferredLanguage: 'en' | 'es';
}

export interface RightsGuide {
  guideId: string;
  state: string;
  title: string;
  content: {
    whatYouCan: string[];
    whatYouCannotDo: string[];
    whatToSay: string[];
  };
  language: 'en' | 'es';
  lastUpdated: Date;
}

export interface InteractionLog {
  logId: string;
  userId: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
    state?: string;
  };
  recordingUrl?: string;
  scriptUsed?: string;
  summaryCardUrl?: string;
  alertSent: boolean;
}

export interface ScenarioScript {
  id: string;
  scenario: string;
  title: string;
  script: string;
  language: 'en' | 'es';
  tags: string[];
}

export interface LocationData {
  state: string;
  city: string;
  lat: number;
  lng: number;
}
