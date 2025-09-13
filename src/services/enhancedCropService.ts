import { supabase } from "@/integrations/supabase/client";
import { 
  addCrop as apiAddCrop, 
  getUserCrops as apiGetUserCrops,
  updateCrop as apiUpdateCrop,
  deleteCrop as apiDeleteCrop,
  analyzeDisease,
  detectPests,
  analyzeSoilHealth
} from './apiService';

export interface Crop {
  id: string;
  name: string;
  variety?: string;
  planted_date: string;
  area_size: number;
  area_unit: string;
  location: string;
  stage: string;
  health_status: string;
  expected_harvest_date?: string;
  notes?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
}

export interface CropActivity {
  id: string;
  crop_id: string;
  type: 'irrigation' | 'fertilizer' | 'pest_control' | 'harvest' | 'photo' | 'note' | 'disease_detection' | 'pest_detection' | 'soil_test';
  description: string;
  timestamp: Date;
  data?: any;
}

// Enhanced crop management with database integration
export const getCrops = async (): Promise<Crop[]> => {
  try {
    return await apiGetUserCrops();
  } catch (error) {
    console.error('Error fetching crops:', error);
    // Return mock data as fallback
    return getMockCrops();
  }
};

export const addCrop = async (cropData: {
  name: string;
  variety?: string;
  planted_date: string;
  area_size: number;
  area_unit?: string;
  location: string;
  stage: string;
  notes?: string;
}): Promise<Crop> => {
  try {
    return await apiAddCrop({
      ...cropData,
      area_unit: cropData.area_unit || 'acres'
    });
  } catch (error) {
    console.error('Error adding crop:', error);
    // Return mock crop as fallback
    return {
      id: Date.now().toString(),
      ...cropData,
      area_unit: cropData.area_unit || 'acres',
      health_status: 'good',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as Crop;
  }
};

export const updateCrop = async (id: string, updates: Partial<Crop>): Promise<Crop | null> => {
  try {
    return await apiUpdateCrop(id, updates);
  } catch (error) {
    console.error('Error updating crop:', error);
    return null;
  }
};

export const deleteCrop = async (id: string): Promise<boolean> => {
  try {
    await apiDeleteCrop(id);
    return true;
  } catch (error) {
    console.error('Error deleting crop:', error);
    return false;
  }
};

// Enhanced analysis functions
export const analyzeCropImage = async (
  imageData: string,
  cropId: string,
  analysisType: 'disease' | 'pest' | 'soil',
  location?: string
) => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  try {
    switch (analysisType) {
      case 'disease':
        return await analyzeDisease(imageData, cropId, userId);
      case 'pest':
        return await detectPests(imageData, cropId, userId);
      case 'soil':
        if (!location) throw new Error('Location required for soil analysis');
        return await analyzeSoilHealth(imageData, location, cropId, userId);
      default:
        throw new Error('Invalid analysis type');
    }
  } catch (error) {
    console.error(`Error analyzing ${analysisType}:`, error);
    throw error;
  }
};

// Mock data fallback
const getMockCrops = (): Crop[] => {
  return [
    {
      id: "1",
      name: "Wheat",
      variety: "HD-2967",
      planted_date: "2024-11-15",
      area_size: 2.5,
      area_unit: "acres",
      location: "Punjab, Moga",
      stage: "flowering",
      health_status: "excellent",
      expected_harvest_date: "2024-04-15",
      notes: "Growing well, no issues detected",
      created_at: "2024-11-15T00:00:00Z",
      updated_at: "2024-11-15T00:00:00Z"
    },
    {
      id: "2",
      name: "Chickpea",
      variety: "JG-315",
      planted_date: "2024-11-20",
      area_size: 1.8,
      area_unit: "acres",
      location: "Haryana, Karnal",
      stage: "vegetative",
      health_status: "good",
      expected_harvest_date: "2024-04-20",
      notes: "Minor weed issues, needs attention",
      created_at: "2024-11-20T00:00:00Z",
      updated_at: "2024-11-20T00:00:00Z"
    },
    {
      id: "3",
      name: "Mustard",
      variety: "Pusa Bold",
      planted_date: "2024-10-25",
      area_size: 1.2,
      area_unit: "acres",
      location: "Rajasthan, Jaipur",
      stage: "fruiting",
      health_status: "fair",
      expected_harvest_date: "2024-03-25",
      notes: "Pest infestation detected, treatment needed",
      created_at: "2024-10-25T00:00:00Z",
      updated_at: "2024-10-25T00:00:00Z"
    }
  ];
};

export const getCropActivities = async (cropId: string): Promise<CropActivity[]> => {
  // Mock activities - in real implementation, this would fetch from database
  return [
    {
      id: "1",
      crop_id: cropId,
      type: 'irrigation',
      description: 'Scheduled irrigation completed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      crop_id: cropId,
      type: 'photo',
      description: 'Growth progress photo taken',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      crop_id: cropId,
      type: 'note',
      description: 'Crop looking healthy, no issues',
      timestamp: new Date(),
    }
  ];
};

export const addCropActivity = async (activity: Omit<CropActivity, 'id'>): Promise<CropActivity> => {
  const newActivity: CropActivity = {
    ...activity,
    id: Date.now().toString(),
  };
  
  console.log('New crop activity added:', newActivity);
  return newActivity;
};