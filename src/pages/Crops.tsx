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

const Crops = () => {
  const myCrops = [
    {
      id: 1,
      name: "गेहूं (Wheat)",
      variety: "HD-2967",
      planted: "15 Nov 2024",
      area: "2.5 एकड़",
      stage: "फूल आना",
      health: "उत्कृष्ट",
      nextAction: "सिंचाई करें",
      daysToHarvest: 45,
      expectedYield: "25 क्विंटल",
      status: "success"
    },
    {
      id: 2,
      name: "चना (Chickpea)",
      variety: "JG-315",
      planted: "20 Nov 2024",
      area: "1.8 एकड़",
      stage: "फली भरना",
      health: "अच्छा",
      nextAction: "खरपतवार हटाएं",
      daysToHarvest: 38,
      expectedYield: "15 क्विंटल",
      status: "success"
    },
    {
      id: 3,
      name: "सरसों (Mustard)",
      variety: "Pusa Bold",
      planted: "25 Oct 2024",
      area: "1.2 एकड़",
      stage: "फली पकना",
      health: "ध्यान चाहिए",
      nextAction: "कीट नियंत्रण",
      daysToHarvest: 15,
      expectedYield: "8 क्विंटल",
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
      case 'उत्कृष्ट': return 'text-success';
      case 'अच्छा': return 'text-primary';
      case 'ध्यान चाहिए': return 'text-warning';
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
              <h1 className="text-2xl font-bold text-foreground mb-2">मेरी फसलें</h1>
              <p className="text-muted-foreground">अपनी सभी फसलों की निगरानी करें</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              नई फसल जोड़ें
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
                    <p className="text-muted-foreground">रोपण तिथि</p>
                    <p className="font-medium">{crop.planted}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">क्षेत्रफल</p>
                    <p className="font-medium">{crop.area}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">वर्तमान अवस्था</p>
                    <p className="font-medium">{crop.stage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">कटाई में</p>
                    <p className="font-medium">{crop.daysToHarvest} दिन</p>
                  </div>
                </div>

                {/* Health Status */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">स्वास्थ्य स्थिति</span>
                    <span className={`text-sm font-semibold ${getHealthColor(crop.health)}`}>
                      {crop.health}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    अगला कार्य: {crop.nextAction}
                  </p>
                </div>

                {/* Expected Yield */}
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">अपेक्षित उत्पादन</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {crop.expectedYield}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Camera className="h-4 w-4" />
                    फोटो लें
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Calendar className="h-4 w-4" />
                    रिकॉर्ड
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Droplets className="h-4 w-4" />
                    सिंचाई
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">त्वरित कार्य</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "मिट्टी परीक्षण", desc: "मिट्टी की गुणवत्ता जांचें", icon: Sprout },
              { title: "मौसम अलर्ट", desc: "आज के मौसम की जानकारी", icon: Calendar },
              { title: "सिंचाई योजना", desc: "सिंचाई का समय निर्धारित करें", icon: Droplets },
              { title: "फसल रिकॉर्ड", desc: "अपने रिकॉर्ड देखें", icon: TrendingUp }
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
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