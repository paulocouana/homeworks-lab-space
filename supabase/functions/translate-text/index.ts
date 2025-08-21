import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, targetLanguage } = await req.json();
    
    if (!text || !targetLanguage) {
      throw new Error('Text and target language are required');
    }

    const apiKey = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');
    if (!apiKey) {
      throw new Error('Google Translate API key not configured');
    }

    console.log(`Translating "${text}" to ${targetLanguage}`);

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          format: 'text'
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google Translate API error:', errorData);
      throw new Error(`Translation failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    console.log(`Translation successful: "${translatedText}"`);

    return new Response(
      JSON.stringify({ translatedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in translate-text function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});