// Crop management service
export interface Crop {
  id: number;
  name: string;
  variety: string;
  planted: string;
  area: string;
  stage: string;
  health: string;
  nextAction: string;
  daysToHarvest: number;
  expectedYield: string;
  status: 'success' | 'warning' | 'error';
  imageUrl?: string;
  notes?: string;
}

export interface CropActivity {
  id: number;
  cropId: number;
  type: 'irrigation' | 'fertilizer' | 'pest_control' | 'harvest' | 'photo' | 'note';
  description: string;
  timestamp: Date;
  data?: any;
}

// Mock crop data
export const getCrops = (): Crop[] => {
  return [
    {
      id: 1,
      name: "Wheat",
      variety: "HD-2967",
      planted: "15 Nov 2024",
      area: "2.5 acres",
      stage: "Flowering",
      health: "Excellent",
      nextAction: "Irrigate",
      daysToHarvest: 45,
      expectedYield: "25 quintals",
      status: "success",
      notes: "Growing well, no issues detected"
    },
    {
      id: 2,
      name: "Chickpea",
      variety: "JG-315",
      planted: "20 Nov 2024",
      area: "1.8 acres",
      stage: "Pod Filling",
      health: "Good",
      nextAction: "Weed removal",
      daysToHarvest: 38,
      expectedYield: "15 quintals",
      status: "success",
      notes: "Minor weed issues, needs attention"
    },
    {
      id: 3,
      name: "Mustard",
      variety: "Pusa Bold",
      planted: "25 Oct 2024",
      area: "1.2 acres",
      stage: "Pod Maturation",
      health: "Needs attention",
      nextAction: "Pest control",
      daysToHarvest: 15,
      expectedYield: "8 quintals",
      status: "warning",
      notes: "Pest infestation detected, treatment needed"
    }
  ];
};

// Add a new crop
export const addCrop = (cropData: Omit<Crop, 'id'>): Crop => {
  const newCrop: Crop = {
    ...cropData,
    id: Date.now(),
  };
  
  // In a real app, this would save to a database
  console.log('New crop added:', newCrop);
  return newCrop;
};

// Update crop information
export const updateCrop = (id: number, updates: Partial<Crop>): Crop | null => {
  // In a real app, this would update the database
  console.log(`Updating crop ${id}:`, updates);
  return null;
};

// Delete a crop
export const deleteCrop = (id: number): boolean => {
  // In a real app, this would delete from database
  console.log(`Deleting crop ${id}`);
  return true;
};

// Get crop activities
export const getCropActivities = (cropId: number): CropActivity[] => {
  return [
    {
      id: 1,
      cropId,
      type: 'irrigation',
      description: 'Scheduled irrigation completed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: 2,
      cropId,
      type: 'photo',
      description: 'Growth progress photo taken',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 3,
      cropId,
      type: 'note',
      description: 'Crop looking healthy, no issues',
      timestamp: new Date(),
    }
  ];
};

// Add crop activity
export const addCropActivity = (activity: Omit<CropActivity, 'id'>): CropActivity => {
  const newActivity: CropActivity = {
    ...activity,
    id: Date.now(),
  };
  
  console.log('New crop activity added:', newActivity);
  return newActivity;
};
