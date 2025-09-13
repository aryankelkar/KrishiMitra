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
    const { location, userId } = await req.json();

    if (!location || !userId) {
      throw new Error('Location and userId are required');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Mock weather alerts based on common agricultural scenarios
    const mockWeatherAlerts = [
      {
        alert_type: 'rain',
        severity: 'medium',
        title: 'Heavy Rainfall Expected',
        description: 'Heavy rainfall predicted in the next 48 hours. Ensure proper drainage in fields and avoid irrigation.',
        location: location,
        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        metadata: {
          probability: 85,
          intensity: 'heavy',
          windSpeed: '25-35 km/h',
          recommendation: 'Harvest ready crops if possible'
        }
      },
      {
        alert_type: 'drought',
        severity: 'high',
        title: 'Drought Conditions Developing',
        description: 'Low rainfall and high temperatures expected for the next 2 weeks. Plan water conservation strategies.',
        location: location,
        expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          duration: '14 days',
          temperature: '38-42°C',
          humidity: '15-25%',
          recommendation: 'Increase irrigation frequency, use mulching'
        }
      },
      {
        alert_type: 'wind',
        severity: 'medium',
        title: 'Strong Winds Alert',
        description: 'Strong winds up to 60 km/h expected. Secure lightweight structures and support tall crops.',
        location: location,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          windSpeed: '45-60 km/h',
          duration: '6-8 hours',
          direction: 'Southwest',
          recommendation: 'Support tall crops, secure farm equipment'
        }
      }
    ];

    // Store weather alerts in database
    const alertsToInsert = mockWeatherAlerts.map(alert => ({
      ...alert,
      user_id: userId,
      is_active: true
    }));

    const { data: insertedAlerts, error: insertError } = await supabase
      .from('weather_alerts')
      .insert(alertsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting weather alerts:', insertError);
    }

    // Fetch active alerts for the user
    const { data: activeAlerts, error: fetchError } = await supabase
      .from('weather_alerts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    return new Response(JSON.stringify({ 
      alerts: activeAlerts || [],
      newAlertsCount: insertedAlerts?.length || 0 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-weather-alerts function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});