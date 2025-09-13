import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: string;
  humidity: string;
  rainfall: string;
  windSpeed: string;
  condition: string;
  location: string;
  timestamp: number;
}

export interface SoilHistory {
  id: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  location: string;
  timestamp: number;
}

export interface Advisory {
  id: string;
  title: string;
  content: string;
  category: 'weather' | 'pest' | 'disease' | 'general';
  language: string;
  timestamp: number;
  isRead: boolean;
}

const STORAGE_KEYS = {
  WEATHER: 'krishimitra_weather',
  SOIL_HISTORY: 'krishimitra_soil_history',
  ADVISORIES: 'krishimitra_advisories',
  LAST_SYNC: 'krishimitra_last_sync',
  OFFLINE_QUEUE: 'krishimitra_offline_queue'
};

export const useOfflineStorage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load last sync time
    const savedLastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    if (savedLastSync) {
      setLastSync(new Date(parseInt(savedLastSync)));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveWeatherData = (data: WeatherData) => {
    const existingData = getWeatherData();
    const updatedData = [data, ...existingData.slice(0, 9)]; // Keep last 10 entries
    localStorage.setItem(STORAGE_KEYS.WEATHER, JSON.stringify(updatedData));
  };

  const getWeatherData = (): WeatherData[] => {
    const data = localStorage.getItem(STORAGE_KEYS.WEATHER);
    return data ? JSON.parse(data) : [];
  };

  const saveSoilHistory = (data: SoilHistory) => {
    const existingData = getSoilHistory();
    const updatedData = [data, ...existingData];
    localStorage.setItem(STORAGE_KEYS.SOIL_HISTORY, JSON.stringify(updatedData));
  };

  const getSoilHistory = (): SoilHistory[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SOIL_HISTORY);
    return data ? JSON.parse(data) : [];
  };

  const saveAdvisory = (data: Advisory) => {
    const existingData = getAdvisories();
    const updatedData = [data, ...existingData];
    localStorage.setItem(STORAGE_KEYS.ADVISORIES, JSON.stringify(updatedData));
  };

  const getAdvisories = (): Advisory[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ADVISORIES);
    return data ? JSON.parse(data) : [];
  };

  const markAdvisoryAsRead = (id: string) => {
    const advisories = getAdvisories();
    const updatedAdvisories = advisories.map(advisory => 
      advisory.id === id ? { ...advisory, isRead: true } : advisory
    );
    localStorage.setItem(STORAGE_KEYS.ADVISORIES, JSON.stringify(updatedAdvisories));
  };

  const clearAllAdvisories = () => {
    localStorage.setItem(STORAGE_KEYS.ADVISORIES, JSON.stringify([]));
  };

  const addToSyncQueue = (action: { type: string; data: any; timestamp: number }) => {
    const queue = getSyncQueue();
    queue.push(action);
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
  };

  const getSyncQueue = () => {
    const data = localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
    return data ? JSON.parse(data) : [];
  };

  const clearSyncQueue = () => {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
  };

  const updateLastSync = () => {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, now.toString());
    setLastSync(new Date(now));
  };

  return {
    isOnline,
    lastSync,
    saveWeatherData,
    getWeatherData,
    saveSoilHistory,
    getSoilHistory,
    saveAdvisory,
    getAdvisories,
    markAdvisoryAsRead,
    clearAllAdvisories,
    addToSyncQueue,
    getSyncQueue,
    clearSyncQueue,
    updateLastSync
  };
};