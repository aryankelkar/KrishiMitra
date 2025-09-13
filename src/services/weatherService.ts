// Weather service for fetching and managing weather data
export interface WeatherData {
  temperature: string;
  humidity: string;
  rainfall: string;
  windSpeed: string;
  condition: string;
  location?: string;
  timestamp: Date;
}

// Mock weather data - in a real app, this would fetch from an API
export const getCurrentWeather = (): WeatherData => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Windy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    temperature: `${Math.floor(Math.random() * 15) + 20}°C`,
    humidity: `${Math.floor(Math.random() * 30) + 50}%`,
    rainfall: `${Math.floor(Math.random() * 20)}mm`,
    windSpeed: `${Math.floor(Math.random() * 15) + 5} km/h`,
    condition: randomCondition,
    location: 'Farm Location',
    timestamp: new Date()
  };
};

// Get weather forecast for the next few days
export const getWeatherForecast = (days: number = 5): WeatherData[] => {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    
    return {
      ...getCurrentWeather(),
      timestamp: date
    };
  });
};

// Get weather alerts
export const getWeatherAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Heavy rainfall expected in the next 24 hours',
      severity: 'medium',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'info',
      message: 'Optimal conditions for crop irrigation today',
      severity: 'low',
      timestamp: new Date()
    }
  ];
  
  return alerts;
};
