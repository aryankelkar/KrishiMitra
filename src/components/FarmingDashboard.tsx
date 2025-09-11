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

const FarmingDashboard = () => {
  const weatherData = {
    temperature: "28°C",
    humidity: "65%",
    rainfall: "12mm",
    windSpeed: "8 km/h",
    condition: "Partly Cloudy"
  };

  const cropPredictions = [
    { crop: "Wheat", health: "Excellent", yield: "+15%", status: "success" },
    { crop: "Rice", health: "Good", yield: "+8%", status: "success" },
    { crop: "Corn", health: "Attention", yield: "-2%", status: "warning" },
  ];

  const languages = [
    { code: "hi", name: "हिंदी" },
    { code: "en", name: "English" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "bn", name: "বাংলা" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              KrishiMitra
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <select className="px-3 py-2 rounded-lg border bg-background text-sm">
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
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
                Smart Farming for Better Harvests
              </h2>
              <p className="text-xl mb-6 text-white/90">
                AI-powered insights for crop prediction, weather monitoring, and pest detection
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <MapPin className="h-4 w-4 mr-2" />
                Set Farm Location
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Weather Card */}
          <Card className="col-span-1 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cloud className="h-5 w-5 text-primary" />
                Weather Today
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
                  <span>Humidity: {weatherData.humidity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span>Wind: {weatherData.windSpeed}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span>Rainfall: {weatherData.rainfall}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Health Predictions */}
          <Card className="col-span-1 lg:col-span-2 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Crop Predictions
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
                        <p className="text-sm text-muted-foreground">Health: {crop.health}</p>
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

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pest Detection */}
          <Card className="group hover:shadow-[var(--shadow-strong)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-2">
              <Bug className="h-12 w-12 text-destructive mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg">Pest Detection</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered pest identification and treatment recommendations
              </p>
              <Button variant="outline" className="w-full">
                Scan Crop
              </Button>
            </CardContent>
          </Card>

          {/* Disease Analysis */}
          <Card className="group hover:shadow-[var(--shadow-strong)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-2">
              <Sprout className="h-12 w-12 text-warning mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg">Disease Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Early disease detection with treatment suggestions
              </p>
              <Button variant="outline" className="w-full">
                Analyze Plant
              </Button>
            </CardContent>
          </Card>

          {/* Soil Health */}
          <Card className="group hover:shadow-[var(--shadow-strong)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-2">
              <Globe className="h-12 w-12 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg">Soil Health</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive soil analysis and improvement tips
              </p>
              <Button variant="outline" className="w-full">
                Check Soil
              </Button>
            </CardContent>
          </Card>

          {/* Market Prices */}
          <Card className="group hover:shadow-[var(--shadow-strong)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-2">
              <TrendingUp className="h-12 w-12 text-success mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg">Market Prices</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Real-time crop prices and market trends
              </p>
              <Button variant="outline" className="w-full">
                View Prices
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
              <h3 className="text-xl font-semibold mb-2">Ask KrishiMitra Assistant</h3>
              <p className="text-muted-foreground mb-4">
                Get instant answers in your local language about farming, weather, and crops
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  🎤 Voice Chat
                </Button>
                <Button variant="outline" size="lg">
                  💬 Text Chat
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