import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sprout, 
  Bug, 
  TrendingUp, 
  MapPin, 
  Globe,
  Bell,
  User
} from "lucide-react";
import farmingHero from "@/assets/farming-hero.jpg";
import { OfflineIndicator } from "./OfflineIndicator";
import { AdvisoriesPanel } from "./AdvisoriesPanel";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { useSyncManager } from "@/hooks/useSyncManager";
import { useTranslation } from 'react-i18next';

const FarmingDashboard = () => {
  const { getWeatherData } = useOfflineStorage();
  useSyncManager(); // Initialize sync manager
  const { t } = useTranslation();
  
  const weatherHistory = getWeatherData();
  const weatherData = weatherHistory[0] || {
    temperature: "28°C",
    humidity: "65%",
    rainfall: "12mm",
    windSpeed: "8 km/h",
    condition: "Partly Cloudy"
  };

  const cropPredictions = [
    { crop: "Wheat", health: t('dashboard.health') + ': ' + "Excellent", yield: "+15%", status: "success" },
    { crop: "Rice", health: t('dashboard.health') + ': ' + "Good", yield: "+8%", status: "success" },
    { crop: "Corn", health: t('dashboard.health') + ': ' + "Attention", yield: "-2%", status: "warning" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/90 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img src="/logo.png" alt="logo" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow"></div>
            </div>
            <h1 className="text-2xl font-bold text-gradient">
              {t('dashboard.brand')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <OfflineIndicator />
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-lift hover-glow transition-all duration-300"
              onClick={() => {
                // Show alerts modal or page
                alert('Alerts: No new notifications at this time.');
              }}
            >
              <Bell className="h-4 w-4 mr-2" />
              {t('dashboard.alerts')}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-lift hover-glow transition-all duration-300"
              onClick={() => {
                // Navigate to profile or show profile modal
                alert('Profile: User profile management - Feature coming soon!');
              }}
            >
              <User className="h-4 w-4 mr-2" />
              {t('dashboard.profile')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${farmingHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-lg">
              <h2 className="text-4xl font-bold mb-4">
                {t('dashboard.heroTitle')}
              </h2>
              <p className="text-xl mb-6 text-white/90">
                {t('dashboard.heroSubtitle')}
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover-lift transition-all duration-300"
                onClick={() => {
                  // Open location picker or GPS
                  alert('Set Farm Location: GPS location feature - Coming soon!');
                }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {t('dashboard.setFarmLocation')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Advisories Panel */}
          <div className="lg:col-span-1">
            <AdvisoriesPanel />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Weather Card */}
              <Card className="col-span-1 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cloud className="h-5 w-5 text-primary" />
                {t('dashboard.weatherToday')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {weatherData.temperature}
                </div>
                <p className="text-muted-foreground">{weatherData.condition}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>{t('dashboard.humidity')}: {weatherData.humidity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span>{t('dashboard.wind')}: {weatherData.windSpeed}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span>{t('dashboard.rainfall')}: {weatherData.rainfall}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Health Predictions */}
          <Card className="col-span-1 lg:col-span-2 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                {t('dashboard.cropPredictions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropPredictions.map((crop, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Sprout className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">{crop.crop}</p>
                        <p className="text-sm text-muted-foreground">{crop.health}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={crop.status === "success" ? "default" : "secondary"}
                        className={crop.status === "success" ? "bg-success hover:bg-success/90" : "bg-warning text-warning-foreground hover:bg-warning/90"}
                      >
                        {crop.yield}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pest Detection */}
          <Card className="group hover-lift transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 shadow-soft hover:shadow-strong">
            <CardHeader className="text-center pb-2">
              <div className="relative">
                <Bug className="h-12 w-12 text-destructive mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardTitle className="text-lg">{t('dashboard.pestDetection')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t('dashboard.pestDetectionDesc')}
              </p>
              <Button 
                variant="outline" 
                className="w-full hover-glow transition-all duration-300"
                onClick={() => {
                  // Simulate pest detection scan
                  alert(t('dashboard.pestDetection') + ': ' + t('dashboard.scanCrop') + ' - Feature coming soon!');
                }}
              >
                {t('dashboard.scanCrop')}
              </Button>
            </CardContent>
          </Card>

          {/* Disease Analysis */}
          <Card className="group hover-lift transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 shadow-soft hover:shadow-strong">
            <CardHeader className="text-center pb-2">
              <div className="relative">
                <Sprout className="h-12 w-12 text-warning mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardTitle className="text-lg">{t('dashboard.diseaseAnalysis')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t('dashboard.diseaseAnalysisDesc')}
              </p>
              <Button 
                variant="outline" 
                className="w-full hover-glow transition-all duration-300"
                onClick={() => {
                  // Simulate disease analysis
                  alert(t('dashboard.diseaseAnalysis') + ': ' + t('dashboard.analyzePlant') + ' - Feature coming soon!');
                }}
              >
                {t('dashboard.analyzePlant')}
              </Button>
            </CardContent>
          </Card>

          {/* Soil Health */}
          <Card className="group hover-lift transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 shadow-soft hover:shadow-strong">
            <CardHeader className="text-center pb-2">
              <div className="relative">
                <Globe className="h-12 w-12 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardTitle className="text-lg">{t('dashboard.soilHealth')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t('dashboard.soilHealthDesc')}
              </p>
              <Button 
                variant="outline" 
                className="w-full hover-glow transition-all duration-300"
                onClick={() => {
                  // Simulate soil health check
                  alert(t('dashboard.soilHealth') + ': ' + t('dashboard.checkSoil') + ' - Feature coming soon!');
                }}
              >
                {t('dashboard.checkSoil')}
              </Button>
            </CardContent>
          </Card>

          {/* Market Prices */}
          <Card className="group hover-lift transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 shadow-soft hover:shadow-strong">
            <CardHeader className="text-center pb-2">
              <div className="relative">
                <TrendingUp className="h-12 w-12 text-success mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardTitle className="text-lg">{t('dashboard.marketPrices')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t('dashboard.marketPricesDesc')}
              </p>
              <Button 
                variant="outline" 
                className="w-full hover-glow transition-all duration-300"
                onClick={() => {
                  // Simulate market prices view
                  alert(t('dashboard.marketPrices') + ': ' + t('dashboard.viewPrices') + ' - Feature coming soon!');
                }}
              >
                {t('dashboard.viewPrices')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Voice Assistant Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('dashboard.askAssistant')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('dashboard.askAssistantDesc')}
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => window.location.href = '/'}>
                  💬 {t('dashboard.chatWithUs')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FarmingDashboard;