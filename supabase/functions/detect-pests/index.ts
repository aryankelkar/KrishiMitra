import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData, cropId, userId } = await req.json();

    if (!imageData || !userId) {
      throw new Error('Image data and userId are required');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Analyze image for pests using OpenAI Vision API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: [{
            type: 'text',
            text: `Analyze this plant/crop image for pest infestations. You are an expert entomologist specializing in agricultural pests.
            
            Please identify:
            1. Pest species (if any visible)
            2. Confidence score (0-100)
            3. Infestation level (low, medium, high, severe)
            4. Visible damage or signs
            5. Treatment recommendations (organic and chemical options)
            6. Prevention measures
            
            Respond in JSON format:
            {
              "pestDetected": boolean,
              "pestName": "string or null",
              "confidenceScore": number,
              "infestationLevel": "low|medium|high|severe",
              "visibleSigns": ["sign1", "sign2"],
              "treatmentRecommendations": ["treatment1", "treatment2"],
              "organicTreatments": ["organic1", "organic2"],
              "preventionMeasures": ["prevention1", "prevention2"],
              "additionalNotes": "string"
            }`
          }, {
            type: 'image_url',
            image_url: {
              url: imageData
            }
          }]
        }],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    // Parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (e) {
      // Fallback if JSON parsing fails
      analysis = {
        pestDetected: false,
        pestName: null,
        confidenceScore: 0,
        infestationLevel: "low",
        visibleSigns: ["Analysis in progress"],
        treatmentRecommendations: ["Monitor regularly"],
        organicTreatments: ["Neem oil application"],
        preventionMeasures: ["Regular field inspection"],
        additionalNotes: analysisText
      };
    }

    // Store results if pest detected
    if (analysis.pestDetected && analysis.pestName) {
      const { error: insertError } = await supabase
        .from('pest_detections')
        .insert([{
          user_id: userId,
          crop_id: cropId,
          pest_name: analysis.pestName,
          confidence_score: analysis.confidenceScore,
          infestation_level: analysis.infestationLevel,
          treatment_recommendations: [
            ...analysis.treatmentRecommendations,
            ...analysis.organicTreatments
          ],
          image_url: imageData,
          metadata: {
            visibleSigns: analysis.visibleSigns,
            organicTreatments: analysis.organicTreatments,
            preventionMeasures: analysis.preventionMeasures,
            additionalNotes: analysis.additionalNotes
          }
        }]);

      if (insertError) {
        console.error('Error storing pest detection:', insertError);
      }
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in detect-pests function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      pestDetected: false,
      pestName: null,
      confidenceScore: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});