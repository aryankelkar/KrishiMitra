import { useEffect, useCallback } from 'react';
import { useOfflineStorage } from './useOfflineStorage';
import { toast } from 'sonner';

export const useSyncManager = () => {
  const {
    isOnline,
    getSyncQueue,
    clearSyncQueue,
    updateLastSync,
    saveWeatherData,
    saveAdvisory
  } = useOfflineStorage();

  const syncWithServer = useCallback(async () => {
    if (!isOnline) return;

    try {
      const queue = getSyncQueue();
      
      if (queue.length === 0) return;

      // Simulate API calls - replace with actual server endpoints
      for (const action of queue) {
        switch (action.type) {
          case 'WEATHER_UPDATE':
            // await uploadWeatherData(action.data);
            break;
          case 'SOIL_UPDATE':
            // await uploadSoilData(action.data);
            break;
          case 'ADVISORY_READ':
            // await markAdvisoryReadOnServer(action.data);
            break;
        }
      }

      // Clear queue and update sync time
      clearSyncQueue();
      updateLastSync();
      
      toast.success('Data synced successfully', {
        description: 'All offline changes have been uploaded'
      });

    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Sync failed', {
        description: 'Will retry when connection improves'
      });
    }
  }, [isOnline, getSyncQueue, clearSyncQueue, updateLastSync]);

  const fetchLatestData = useCallback(async () => {
    if (!isOnline) return;

    try {
      // Simulate fetching latest data from server
      const mockWeatherData = {
        temperature: "28°C",
        humidity: "65%",
        rainfall: "12mm",
        windSpeed: "8 km/h",
        condition: "Partly Cloudy",
        location: "Farm Location",
        timestamp: Date.now()
      };

      const mockAdvisory = {
        id: `advisory_${Date.now()}`,
        title: "Weather Alert",
        content: "Expect light rainfall in the next 24 hours. Good time for sowing.",
        category: 'weather' as const,
        language: 'en',
        timestamp: Date.now(),
        isRead: false
      };

      saveWeatherData(mockWeatherData);
      saveAdvisory(mockAdvisory);

    } catch (error) {
      console.error('Failed to fetch latest data:', error);
    }
  }, [isOnline, saveWeatherData, saveAdvisory]);

  useEffect(() => {
    if (isOnline) {
      // Sync offline changes and fetch latest data
      syncWithServer();
      fetchLatestData();
    }
  }, [isOnline, syncWithServer, fetchLatestData]);

  useEffect(() => {
    // Set up periodic sync when online
    if (!isOnline) return;

    const interval = setInterval(() => {
      fetchLatestData();
    }, 30000); // Sync every 30 seconds when online

    return () => clearInterval(interval);
  }, [isOnline, fetchLatestData]);

  return {
    isOnline,
    syncWithServer,
    fetchLatestData
  };
};