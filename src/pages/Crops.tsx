import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  Droplets, 
  Calendar, 
  TrendingUp,
  Camera,
  Plus
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const Crops = () => {
  const { t, i18n } = useTranslation();

  const myCrops = [
    {
      id: 1,
      name: i18n.language === 'hi' ? "गेहूं (Wheat)" : "Wheat",
      variety: "HD-2967",
      planted: "15 Nov 2024",
      area: i18n.language === 'hi' ? "2.5 एकड़" : "2.5 acres",
      stage: i18n.language === 'hi' ? "फूल आना" : "Flowering",
      health: i18n.language === 'hi' ? "उत्कृष्ट" : "Excellent",
      nextAction: i18n.language === 'hi' ? "सिंचाई करें" : "Irrigate",
      daysToHarvest: 45,
      expectedYield: i18n.language === 'hi' ? "25 क्विंटल" : "25 quintals",
      status: "success"
    },
    {
      id: 2,
      name: i18n.language === 'hi' ? "चना (Chickpea)" : "Chickpea",
      variety: "JG-315",
      planted: "20 Nov 2024",
      area: i18n.language === 'hi' ? "1.8 एकड़" : "1.8 acres",
      stage: i18n.language === 'hi' ? "फली भरना" : "Pod Filling",
      health: i18n.language === 'hi' ? "अच्छा" : "Good",
      nextAction: i18n.language === 'hi' ? "खरपतवार हटाएं" : "Weed removal",
      daysToHarvest: 38,
      expectedYield: i18n.language === 'hi' ? "15 क्विंटल" : "15 quintals",
      status: "success"
    },
    {
      id: 3,
      name: i18n.language === 'hi' ? "सरसों (Mustard)" : "Mustard",
      variety: "Pusa Bold",
      planted: "25 Oct 2024",
      area: i18n.language === 'hi' ? "1.2 एकड़" : "1.2 acres",
      stage: i18n.language === 'hi' ? "फली पकना" : "Pod Maturation",
      health: i18n.language === 'hi' ? "ध्यान चाहिए" : "Needs attention",
      nextAction: i18n.language === 'hi' ? "कीट नियंत्रण" : "Pest control",
      daysToHarvest: 15,
      expectedYield: i18n.language === 'hi' ? "8 क्विंटल" : "8 quintals",
      status: "warning"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'warning': return 'destructive';
      default: return 'secondary';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'उत्कृष्ट':
      case 'Excellent': return 'text-success';
      case 'अच्छा':
      case 'Good': return 'text-primary';
      case 'ध्यान चाहिए':
      case 'Needs attention': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4 pb-20 md:pb-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{t('crops.title')}</h1>
              <p className="text-muted-foreground">{t('crops.subtitle')}</p>
            </div>
            <Button 
              className="gap-2 hover-lift transition-all duration-300"
              onClick={() => {
                // Open add crop modal or form
                alert('Add Crop: Crop registration form - Feature coming soon!');
              }}
            >
              <Plus className="h-4 w-4" />
              {t('crops.addCrop')}
            </Button>
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myCrops.map((crop) => (
            <Card key={crop.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Sprout className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{crop.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{crop.variety}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(crop.status)}>
                    {crop.health}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('crops.plantedOn')}</p>
                    <p className="font-medium">{crop.planted}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('crops.area')}</p>
                    <p className="font-medium">{crop.area}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('crops.currentStage')}</p>
                    <p className="font-medium">{crop.stage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('crops.harvestIn')}</p>
                    <p className="font-medium">{crop.daysToHarvest} {t('crops.days')}</p>
                  </div>
                </div>

                {/* Health Status */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t('crops.healthStatus')}</span>
                    <span className={`text-sm font-semibold ${getHealthColor(crop.health)}`}>
                      {crop.health}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('crops.nextAction')}: {crop.nextAction}
                  </p>
                </div>

                {/* Expected Yield */}
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t('crops.expectedYield')}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {crop.expectedYield}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2 hover-lift transition-all duration-300"
                    onClick={() => {
                      alert(`Take Photo: Camera feature for ${crop.name} - Coming soon!`);
                    }}
                  >
                    <Camera className="h-4 w-4" />
                    {t('crops.takePhoto')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2 hover-lift transition-all duration-300"
                    onClick={() => {
                      alert(`Record: Log activity for ${crop.name} - Coming soon!`);
                    }}
                  >
                    <Calendar className="h-4 w-4" />
                    {t('crops.record')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2 hover-lift transition-all duration-300"
                    onClick={() => {
                      alert(`Irrigate: Schedule irrigation for ${crop.name} - Coming soon!`);
                    }}
                  >
                    <Droplets className="h-4 w-4" />
                    {t('crops.irrigate')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">{t('crops.quickActions')}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: t('crops.soilTest'), desc: t('crops.soilTestDesc'), icon: Sprout },
              { title: t('crops.weatherAlert'), desc: t('crops.weatherAlertDesc'), icon: Calendar },
              { title: t('crops.irrigationPlan'), desc: t('crops.irrigationPlanDesc'), icon: Droplets },
              { title: t('crops.cropRecords'), desc: t('crops.cropRecordsDesc'), icon: TrendingUp }
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-all duration-300 cursor-pointer hover-lift"
                  onClick={() => {
                    alert(`${action.title}: ${action.desc} - Feature coming soon!`);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-accent/10">
                        <IconComponent className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{action.title}</h4>
                        <p className="text-xs text-muted-foreground">{action.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crops;