import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  let language = 'en'; // Default language
  let scenario = '';
  
  try {
    const body = await request.json();
    scenario = body.scenario;
    language = body.language;

    const prompt = language === 'en' 
      ? `Generate a clear, respectful script for a ${scenario.replace('-', ' ')} scenario with police. The script should:
         - Be calm and non-confrontational
         - Assert constitutional rights appropriately
         - Be practical and easy to remember under stress
         - Include specific phrases that are legally sound
         - Be concise but complete
         
         Focus on de-escalation while protecting rights. Return only the script text, no additional formatting.`
      : `Genera un script claro y respetuoso para un escenario de ${scenario.replace('-', ' ')} con la policía. El script debe:
         - Ser calmado y no confrontacional
         - Afirmar los derechos constitucionales apropiadamente
         - Ser práctico y fácil de recordar bajo estrés
         - Incluir frases específicas que sean legalmente sólidas
         - Ser conciso pero completo
         
         Enfócate en la desescalada mientras proteges los derechos. Devuelve solo el texto del script, sin formato adicional.`;

    // Initialize OpenAI client only when needed
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || 'demo-key',
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal rights expert who helps people communicate effectively with law enforcement while protecting their constitutional rights. Provide clear, practical scripts that are respectful but firm.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const script = completion.choices[0]?.message?.content || 
      (language === 'en' 
        ? "I am exercising my right to remain silent. I do not consent to any searches. Am I free to leave?"
        : "Estoy ejerciendo mi derecho a permanecer en silencio. No consiento ningún registro. ¿Soy libre de irme?");

    return NextResponse.json({ script });
  } catch (error) {
    console.error('Script generation error:', error);
    
    // Fallback script
    const fallbackScript = language === 'es'
      ? "Estoy ejerciendo mi derecho a permanecer en silencio. No consiento ningún registro. ¿Soy libre de irme? Quiero hablar con un abogado."
      : "I am exercising my right to remain silent. I do not consent to any searches. Am I free to leave? I want to speak to a lawyer.";
    
    return NextResponse.json({ script: fallbackScript });
  }
}
