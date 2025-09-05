export const STATES = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

export const SCENARIOS = [
  { id: 'traffic-stop', title: 'Traffic Stop', icon: '🚗' },
  { id: 'street-encounter', title: 'Street Encounter', icon: '🚶' },
  { id: 'home-visit', title: 'Home Visit', icon: '🏠' },
  { id: 'arrest', title: 'Arrest Situation', icon: '⚖️' },
  { id: 'search', title: 'Search Request', icon: '🔍' },
  { id: 'questioning', title: 'Questioning', icon: '❓' }
];

export const DEFAULT_RIGHTS = {
  en: {
    whatYouCan: [
      "Remain silent and ask for a lawyer",
      "Ask if you are free to leave",
      "Record the interaction (in most states)",
      "Ask for the officer's name and badge number",
      "Refuse consent to searches"
    ],
    whatYouCannotDo: [
      "Resist arrest, even if you believe it's unlawful",
      "Run away or flee",
      "Touch or grab the officer",
      "Lie or provide false information",
      "Interfere with the officer's duties"
    ],
    whatToSay: [
      "I am exercising my right to remain silent",
      "I do not consent to any searches",
      "Am I free to leave?",
      "I want to speak to a lawyer",
      "I do not answer questions without my attorney present"
    ]
  },
  es: {
    whatYouCan: [
      "Permanecer en silencio y pedir un abogado",
      "Preguntar si puede irse",
      "Grabar la interacción (en la mayoría de los estados)",
      "Pedir el nombre y número de placa del oficial",
      "Rechazar el consentimiento para registros"
    ],
    whatYouCannotDo: [
      "Resistir el arresto, incluso si cree que es ilegal",
      "Huir o escapar",
      "Tocar o agarrar al oficial",
      "Mentir o proporcionar información falsa",
      "Interferir con las funciones del oficial"
    ],
    whatToSay: [
      "Estoy ejerciendo mi derecho a permanecer en silencio",
      "No consiento ningún registro",
      "¿Soy libre de irme?",
      "Quiero hablar con un abogado",
      "No respondo preguntas sin mi abogado presente"
    ]
  }
};
