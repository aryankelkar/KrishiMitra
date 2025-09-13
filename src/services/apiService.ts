import { supabase } from "@/integrations/supabase/client";

export interface ChatResponse {
  response: string;
  conversationId: string;
}

export interface AnalysisResult {
  diseaseDetected?: boolean;
  diseaseName?: string;
  pestDetected?: boolean;
  pestName?: string;
  confidenceScore: number;
  severity?: string;
  infestationLevel?: string;
  symptoms?: string[];
  treatmentRecommendations?: string[];
  additionalNotes?: string;
}

export interface SoilAnalysis {
  soilType: string;
  moistureContent: number;
  organicMatter: number;
  estimatedPH: number;
  soilStructure: string;
  recommendations: string[];
  additionalNotes: string;
}

export interface WeatherAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string;
  location: string;
  expires_at: string;
  metadata?: any;
}

export interface MarketPrice {
  crop_name: string;
  variety: string;
  market_location: string;
  price_per_unit: number;
  unit: string;
  currency: string;
  date: string;
  metadata?: any;
}

// Chatbot API
export const sendChatMessage = async (
  message: string, 
  conversationId?: string,
  userId?: string
): Promise<ChatResponse> => {
  const { data, error } = await supabase.functions.invoke('agricultural-chatbot', {
    body: { message, conversationId, userId }
  });

  if (error) throw new Error(error.message);
  return data;
};

// Disease Analysis API
export const analyzeDisease = async (
  imageData: string,
  cropId?: string,
  userId?: string
): Promise<AnalysisResult> => {
  const { data, error } = await supabase.functions.invoke('analyze-plant-disease', {
    body: { imageData, cropId, userId }
  });

  if (error) throw new Error(error.message);
  return data;
};

// Pest Detection API
export const detectPests = async (
  imageData: string,
  cropId?: string,
  userId?: string
): Promise<AnalysisResult> => {
  const { data, error } = await supabase.functions.invoke('detect-pests', {
    body: { imageData, cropId, userId }
  });

  if (error) throw new Error(error.message);
  return data;
};

// Soil Health Analysis API
export const analyzeSoilHealth = async (
  imageData: string,
  location: string,
  cropId?: string,
  userId?: string
): Promise<SoilAnalysis> => {
  const { data, error } = await supabase.functions.invoke('analyze-soil-health', {
    body: { imageData, location, cropId, userId }
  });

  if (error) throw new Error(error.message);
  return data;
};

// Weather Alerts API
export const fetchWeatherAlerts = async (
  location: string,
  userId?: string
): Promise<{ alerts: WeatherAlert[]; newAlertsCount: number }> => {
  const { data, error } = await supabase.functions.invoke('fetch-weather-alerts', {
    body: { location, userId }
  });

  if (error) throw new Error(error.message);
  return data;
};

// Market Prices API
export const fetchMarketPrices = async (
  cropName?: string,
  location?: string
): Promise<{ prices: MarketPrice[]; insights: any; lastUpdated: string }> => {
  const { data, error } = await supabase.functions.invoke('fetch-market-prices', {
    body: { cropName, location }
  });

  if (error) throw new Error(error.message);
  return data;
};

// Database operations for crops
export const addCrop = async (cropData: {
  name: string;
  variety?: string;
  planted_date: string;
  area_size: number;
  area_unit?: string;
  location: string;
  stage: string;
  notes?: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('crops')
    .insert([{
      ...cropData,
      user_id: user.id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserCrops = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('crops')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateCrop = async (id: string, updates: any) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('crops')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteCrop = async (id: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('crops')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  return true;
};

// Get user's disease detections
export const getDiseaseDetections = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('disease_detections')
    .select(`
      *,
      crops (name, variety)
    `)
    .eq('user_id', user.id)
    .order('detected_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get user's pest detections
export const getPestDetections = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('pest_detections')
    .select(`
      *,
      crops (name, variety)
    `)
    .eq('user_id', user.id)
    .order('detected_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get user's soil tests
export const getSoilTests = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('soil_tests')
    .select(`
      *,
      crops (name, variety)
    `)
    .eq('user_id', user.id)
    .order('tested_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get user's weather alerts
export const getWeatherAlerts = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('weather_alerts')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Update alert status
export const updateAlertStatus = async (id: string, isActive: boolean) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('weather_alerts')
    .update({ is_active: isActive })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  return true;
};