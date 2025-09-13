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
    const { imageData, cropId, userId, location } = await req.json();

    if (!imageData || !userId || !location) {
      throw new Error('Image data, userId, and location are required');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Analyze soil image using OpenAI Vision API
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
            text: `Analyze this soil sample image for health assessment. You are an expert soil scientist.
            
            Please analyze and estimate:
            1. Soil type (clay, loam, sand, etc.)
            2. Moisture content (visual assessment)
            3. Organic matter content (visual estimation)
            4. Potential pH range based on color and texture
            5. Nutrient deficiency signs
            6. Soil structure and compaction
            7. Recommendations for improvement
            
            Respond in JSON format:
            {
              "soilType": "string",
              "moistureContent": number (0-100),
              "organicMatter": number (0-100),
              "estimatedPH": number (1-14),
              "soilStructure": "poor|fair|good|excellent",
              "deficiencySigns": ["sign1", "sign2"],
              "recommendations": ["rec1", "rec2"],
              "fertilizationAdvice": ["advice1", "advice2"],
              "improvementSteps": ["step1", "step2"],
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
        soilType: "Mixed",
        moistureContent: 50,
        organicMatter: 30,
        estimatedPH: 7.0,
        soilStructure: "fair",
        deficiencySigns: ["Analysis in progress"],
        recommendations: ["Get professional soil test"],
        fertilizationAdvice: ["Apply balanced fertilizer"],
        improvementSteps: ["Add organic matter"],
        additionalNotes: analysisText
      };
    }

    // Store soil test results
    const { error: insertError } = await supabase
      .from('soil_tests')
      .insert([{
        user_id: userId,
        crop_id: cropId,
        location: location,
        ph_level: analysis.estimatedPH,
        organic_matter: analysis.organicMatter,
        moisture_content: analysis.moistureContent,
        soil_type: analysis.soilType,
        test_method: 'image_analysis',
        recommendations: [
          ...analysis.recommendations,
          ...analysis.fertilizationAdvice,
          ...analysis.improvementSteps
        ],
        image_url: imageData,
        metadata: {
          soilStructure: analysis.soilStructure,
          deficiencySigns: analysis.deficiencySigns,
          additionalNotes: analysis.additionalNotes
        }
      }]);

    if (insertError) {
      console.error('Error storing soil test:', insertError);
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-soil-health function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      soilType: "Unknown",
      moistureContent: 0,
      estimatedPH: 7.0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});