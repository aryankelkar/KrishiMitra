import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cropName, location } = await req.json();

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Mock market prices data for common Indian crops
    const mockPricesData = [
      {
        crop_name: 'Wheat',
        variety: 'HD-2967',
        market_location: 'Delhi',
        price_per_unit: 2450,
        unit: 'quintal',
        currency: 'INR',
        source: 'Agricultural Marketing Division',
        quality_grade: 'A',
        metadata: {
          trend: 'rising',
          changePercent: 5.2,
          demand: 'high',
          supply: 'moderate'
        }
      },
      {
        crop_name: 'Rice',
        variety: 'Basmati',
        market_location: 'Punjab',
        price_per_unit: 3200,
        unit: 'quintal',
        currency: 'INR',
        source: 'Agricultural Marketing Division',
        quality_grade: 'Super',
        metadata: {
          trend: 'stable',
          changePercent: 0.8,
          demand: 'very high',
          supply: 'good'
        }
      },
      {
        crop_name: 'Maize',
        variety: 'Hybrid',
        market_location: 'Karnataka',
        price_per_unit: 1950,
        unit: 'quintal',
        currency: 'INR',
        source: 'Agricultural Marketing Division',
        quality_grade: 'A',
        metadata: {
          trend: 'falling',
          changePercent: -2.1,
          demand: 'moderate',
          supply: 'high'
        }
      },
      {
        crop_name: 'Sugarcane',
        variety: 'Co-86032',
        market_location: 'Uttar Pradesh',
        price_per_unit: 325,
        unit: 'quintal',
        currency: 'INR',
        source: 'Sugar Mills Association',
        quality_grade: 'Standard',
        metadata: {
          trend: 'rising',
          changePercent: 3.5,
          demand: 'high',
          supply: 'moderate'
        }
      },
      {
        crop_name: 'Cotton',
        variety: 'Bt Cotton',
        market_location: 'Gujarat',
        price_per_unit: 5850,
        unit: 'quintal',
        currency: 'INR',
        source: 'Cotton Corporation of India',
        quality_grade: 'Grade-1',
        metadata: {
          trend: 'rising',
          changePercent: 7.8,
          demand: 'very high',
          supply: 'low'
        }
      },
      {
        crop_name: 'Chickpea',
        variety: 'Kabuli',
        market_location: 'Rajasthan',
        price_per_unit: 4800,
        unit: 'quintal',
        currency: 'INR',
        source: 'Agricultural Marketing Division',
        quality_grade: 'Premium',
        metadata: {
          trend: 'stable',
          changePercent: 1.2,
          demand: 'high',
          supply: 'moderate'
        }
      }
    ];

    // Filter prices based on crop name if provided
    let filteredPrices = mockPricesData;
    if (cropName) {
      filteredPrices = mockPricesData.filter(price => 
        price.crop_name.toLowerCase().includes(cropName.toLowerCase())
      );
    }

    // Store market prices in database
    const { error: insertError } = await supabase
      .from('market_prices')
      .upsert(filteredPrices, { 
        onConflict: 'crop_name,market_location,date',
        ignoreDuplicates: false 
      });

    if (insertError) {
      console.error('Error inserting market prices:', insertError);
    }

    // Fetch current market prices
    let query = supabase
      .from('market_prices')
      .select('*')
      .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (cropName) {
      query = query.ilike('crop_name', `%${cropName}%`);
    }

    if (location) {
      query = query.ilike('market_location', `%${location}%`);
    }

    const { data: currentPrices, error: fetchError } = await query;

    if (fetchError) {
      throw fetchError;
    }

    // Calculate price trends and insights
    const priceInsights = {
      averagePrice: currentPrices?.reduce((sum, price) => sum + price.price_per_unit, 0) / (currentPrices?.length || 1),
      highestPrice: Math.max(...(currentPrices?.map(p => p.price_per_unit) || [0])),
      lowestPrice: Math.min(...(currentPrices?.map(p => p.price_per_unit) || [0])),
      totalCrops: new Set(currentPrices?.map(p => p.crop_name)).size,
      risingTrends: currentPrices?.filter(p => p.metadata?.trend === 'rising').length || 0,
      fallingTrends: currentPrices?.filter(p => p.metadata?.trend === 'falling').length || 0
    };

    return new Response(JSON.stringify({ 
      prices: currentPrices || [],
      insights: priceInsights,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-market-prices function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});