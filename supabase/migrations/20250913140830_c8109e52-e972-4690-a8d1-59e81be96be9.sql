-- Create tables for comprehensive farming features

-- Weather alerts table
CREATE TABLE public.weather_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('rain', 'storm', 'drought', 'heatwave', 'frost', 'wind')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

-- Crop monitoring table 
CREATE TABLE public.crops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  variety TEXT,
  planted_date DATE NOT NULL,
  area_size DECIMAL(10,2) NOT NULL,
  area_unit TEXT NOT NULL DEFAULT 'acres',
  location TEXT NOT NULL,
  stage TEXT NOT NULL CHECK (stage IN ('seed', 'germination', 'vegetative', 'flowering', 'fruiting', 'harvest')),
  health_status TEXT NOT NULL DEFAULT 'good' CHECK (health_status IN ('excellent', 'good', 'fair', 'poor', 'critical')),
  expected_harvest_date DATE,
  notes TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Disease detection records
CREATE TABLE public.disease_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  crop_id UUID REFERENCES public.crops,
  disease_name TEXT NOT NULL,
  confidence_score DECIMAL(5,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
  severity TEXT NOT NULL CHECK (severity IN ('mild', 'moderate', 'severe', 'critical')),
  symptoms TEXT[],
  treatment_recommendations TEXT[],
  image_url TEXT NOT NULL,
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'detected' CHECK (status IN ('detected', 'treating', 'resolved')),
  metadata JSONB DEFAULT '{}'
);

-- Pest detection records
CREATE TABLE public.pest_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  crop_id UUID REFERENCES public.crops,
  pest_name TEXT NOT NULL,
  confidence_score DECIMAL(5,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
  infestation_level TEXT NOT NULL CHECK (infestation_level IN ('low', 'medium', 'high', 'severe')),
  treatment_recommendations TEXT[],
  image_url TEXT NOT NULL,
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'detected' CHECK (status IN ('detected', 'treating', 'resolved')),
  metadata JSONB DEFAULT '{}'
);

-- Soil health records
CREATE TABLE public.soil_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  crop_id UUID REFERENCES public.crops,
  location TEXT NOT NULL,
  ph_level DECIMAL(3,1) CHECK (ph_level >= 0 AND ph_level <= 14),
  nitrogen_level DECIMAL(5,2),
  phosphorus_level DECIMAL(5,2), 
  potassium_level DECIMAL(5,2),
  organic_matter DECIMAL(5,2),
  moisture_content DECIMAL(5,2),
  soil_type TEXT,
  test_method TEXT NOT NULL CHECK (test_method IN ('image_analysis', 'digital_meter', 'lab_test')),
  recommendations TEXT[],
  image_url TEXT,
  tested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Market prices table
CREATE TABLE public.market_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  crop_name TEXT NOT NULL,
  variety TEXT,
  market_location TEXT NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'quintal',
  currency TEXT NOT NULL DEFAULT 'INR',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  source TEXT NOT NULL,
  quality_grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Chat conversations table
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.chat_conversations NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.weather_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pest_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own weather alerts" ON public.weather_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own weather alerts" ON public.weather_alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own weather alerts" ON public.weather_alerts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own crops" ON public.crops FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own crops" ON public.crops FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own crops" ON public.crops FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own crops" ON public.crops FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own disease detections" ON public.disease_detections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own disease detections" ON public.disease_detections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own disease detections" ON public.disease_detections FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own pest detections" ON public.pest_detections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own pest detections" ON public.pest_detections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own pest detections" ON public.pest_detections FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own soil tests" ON public.soil_tests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own soil tests" ON public.soil_tests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own soil tests" ON public.soil_tests FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Market prices are viewable by everyone" ON public.market_prices FOR SELECT USING (true);
CREATE POLICY "Only authenticated users can insert market prices" ON public.market_prices FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own conversations" ON public.chat_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own conversations" ON public.chat_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own conversations" ON public.chat_conversations FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages from their conversations" ON public.chat_messages 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chat_conversations 
      WHERE id = conversation_id AND user_id = auth.uid()
    )
  );
CREATE POLICY "Users can create messages in their conversations" ON public.chat_messages 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_conversations 
      WHERE id = conversation_id AND user_id = auth.uid()
    )
  );

-- Indexes for better performance
CREATE INDEX idx_weather_alerts_user_id ON public.weather_alerts(user_id);
CREATE INDEX idx_weather_alerts_location ON public.weather_alerts(location);
CREATE INDEX idx_crops_user_id ON public.crops(user_id);
CREATE INDEX idx_crops_planted_date ON public.crops(planted_date);
CREATE INDEX idx_disease_detections_user_id ON public.disease_detections(user_id);
CREATE INDEX idx_disease_detections_crop_id ON public.disease_detections(crop_id);
CREATE INDEX idx_pest_detections_user_id ON public.pest_detections(user_id);
CREATE INDEX idx_pest_detections_crop_id ON public.pest_detections(crop_id);
CREATE INDEX idx_soil_tests_user_id ON public.soil_tests(user_id);
CREATE INDEX idx_soil_tests_crop_id ON public.soil_tests(crop_id);
CREATE INDEX idx_market_prices_crop_name ON public.market_prices(crop_name);
CREATE INDEX idx_market_prices_date ON public.market_prices(date);
CREATE INDEX idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON public.crops
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_conversations_updated_at BEFORE UPDATE ON public.chat_conversations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();