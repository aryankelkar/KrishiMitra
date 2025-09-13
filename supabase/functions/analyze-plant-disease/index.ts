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

    // Analyze image using OpenAI Vision API
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
            text: `Analyze this plant image for diseases. You are an expert plant pathologist. 
            
            Please provide:
            1. Disease identification (if any)
            2. Confidence score (0-100)
            3. Severity level (mild, moderate, severe, critical)
            4. Symptoms observed
            5. Treatment recommendations
            6. Prevention measures
            
            Respond in JSON format:
            {
              "diseaseDetected": boolean,
              "diseaseName": "string or null",
              "confidenceScore": number,
              "severity": "mild|moderate|severe|critical",
              "symptoms": ["symptom1", "symptom2"],
              "treatmentRecommendations": ["treatment1", "treatment2"],
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
        diseaseDetected: true,
        diseaseName: "Analysis incomplete",
        confidenceScore: 50,
        severity: "moderate",
        symptoms: ["Image analysis in progress"],
        treatmentRecommendations: ["Consult local agricultural expert"],
        preventionMeasures: ["Regular monitoring recommended"],
        additionalNotes: analysisText
      };
    }

    // Store results if disease detected
    if (analysis.diseaseDetected && analysis.diseaseName !== "Analysis incomplete") {
      const { error: insertError } = await supabase
        .from('disease_detections')
        .insert([{
          user_id: userId,
          crop_id: cropId,
          disease_name: analysis.diseaseName,
          confidence_score: analysis.confidenceScore,
          severity: analysis.severity,
          symptoms: analysis.symptoms,
          treatment_recommendations: analysis.treatmentRecommendations,
          image_url: imageData,
          metadata: {
            preventionMeasures: analysis.preventionMeasures,
            additionalNotes: analysis.additionalNotes
          }
        }]);

      if (insertError) {
        console.error('Error storing disease detection:', insertError);
      }
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-plant-disease function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      diseaseDetected: false,
      diseaseName: null,
      confidenceScore: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});