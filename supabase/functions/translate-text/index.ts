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

    console.log(`Translating "${text}" to ${targetLanguage}`);

    // Get Google Translate API key from environment
    const googleApiKey = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');
    
    if (!googleApiKey) {
      throw new Error('Google Translate API key not configured');
    }

    // If target language is Portuguese, return original text
    if (targetLanguage === 'pt') {
      return new Response(
        JSON.stringify({ translatedText: text }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Call Google Translate API
    const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'pt',
        target: targetLanguage,
        format: 'text',
        key: googleApiKey
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google Translate API error:', response.status, errorData);
      throw new Error(`Google Translate API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || text;

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