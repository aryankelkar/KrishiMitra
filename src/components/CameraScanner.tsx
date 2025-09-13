import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Camera, 
  RotateCcw, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Download,
  RefreshCw,
  Upload
} from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';
import { useTranslation } from 'react-i18next';

interface CameraScannerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'scan-crop' | 'analyze-plant' | 'check-soil' | 'view-prices';
  onCapture?: (imageData: string) => void;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  onCapture 
}) => {
  const { t } = useTranslation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    isStreaming,
    hasPermission,
    error,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    requestPermission,
    videoRef,
    canvasRef
  } = useCamera();

  // Start camera when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Add a small delay to ensure the dialog is fully rendered
      const timer = setTimeout(() => {
        startCamera();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      stopCamera();
      setCapturedImage(null);
      setAnalysisResult(null);
    }
  }, [isOpen, startCamera, stopCamera]);

  const handleCapture = async () => {
    const imageData = capturePhoto();
    if (imageData) {
      setCapturedImage(imageData);
      setIsProcessing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        const mockResult = generateMockResult(mode);
        setAnalysisResult(mockResult);
        setIsProcessing(false);
        
        if (onCapture) {
          onCapture(imageData);
        }
      }, 2000);
    }
  };

  const generateMockResult = (mode: string) => {
    const results = {
      'scan-crop': {
        type: 'Crop Health Analysis',
        status: 'success',
        confidence: 87,
        findings: [
          { label: 'Overall Health', value: 'Good', status: 'success' },
          { label: 'Pest Detection', value: 'None detected', status: 'success' },
          { label: 'Disease Risk', value: 'Low', status: 'success' },
          { label: 'Growth Stage', value: 'Vegetative', status: 'info' }
        ]
      },
      'analyze-plant': {
        type: 'Plant Disease Analysis',
        status: 'warning',
        confidence: 92,
        findings: [
          { label: 'Plant Type', value: 'Tomato', status: 'info' },
          { label: 'Disease Detected', value: 'Early Blight', status: 'warning' },
          { label: 'Severity', value: 'Mild', status: 'warning' },
          { label: 'Treatment', value: 'Fungicide recommended', status: 'info' }
        ]
      },
      'check-soil': {
        type: 'Soil Health Analysis',
        status: 'success',
        confidence: 78,
        findings: [
          { label: 'Soil Type', value: 'Loamy', status: 'info' },
          { label: 'Moisture Level', value: 'Optimal', status: 'success' },
          { label: 'pH Level', value: '6.8', status: 'success' },
          { label: 'Nutrients', value: 'Balanced', status: 'success' }
        ]
      },
      'view-prices': {
        type: 'Market Price Analysis',
        status: 'info',
        confidence: 95,
        findings: [
          { label: 'Crop Identified', value: 'Wheat', status: 'info' },
          { label: 'Current Price', value: '₹2,450/quintal', status: 'success' },
          { label: 'Price Trend', value: 'Rising', status: 'success' },
          { label: 'Market Demand', value: 'High', status: 'success' }
        ]
      }
    };
    
    return results[mode as keyof typeof results] || results['scan-crop'];
  };

  const getModeConfig = (mode: string) => {
    const configs = {
      'scan-crop': {
        title: t('dashboard.scanCrop'),
        description: 'Point camera at your crop to analyze health and growth',
        icon: '🌱',
        color: 'text-green-600'
      },
      'analyze-plant': {
        title: t('dashboard.analyzePlant'),
        description: 'Capture plant image to detect diseases and pests',
        icon: '🔍',
        color: 'text-blue-600'
      },
      'check-soil': {
        title: t('dashboard.checkSoil'),
        description: 'Take a soil sample photo for health analysis',
        icon: '🌍',
        color: 'text-amber-600'
      },
      'view-prices': {
        title: t('dashboard.viewPrices'),
        description: 'Scan crop to get current market prices',
        icon: '💰',
        color: 'text-purple-600'
      }
    };
    
    return configs[mode as keyof typeof configs] || configs['scan-crop'];
  };

  const modeConfig = getModeConfig(mode);

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `${mode}-${Date.now()}.jpg`;
      link.href = capturedImage;
      link.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        setIsProcessing(true);
        
        // Simulate processing delay
        setTimeout(() => {
          const mockResult = generateMockResult(mode);
          setAnalysisResult(mockResult);
          setIsProcessing(false);
          
          if (onCapture) {
            onCapture(imageData);
          }
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{modeConfig.icon}</span>
            {modeConfig.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Camera View */}
          {!capturedImage ? (
            <div className="relative">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {error ? (
                    <div className="h-64 flex items-center justify-center bg-muted">
                      <div className="text-center space-y-4">
                        <Alert className="w-full max-w-md">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={startCamera}
                            variant="outline"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Again
                          </Button>
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            variant="default"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Instead
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full h-64 object-cover"
                        playsInline
                        muted
                      />
                      {!isStreaming && !error && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <div className="text-center space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                            <p>Starting camera...</p>
                            <p className="text-sm text-muted-foreground">
                              If this takes too long, try requesting permission manually
                            </p>
                            <Button
                              onClick={requestPermission}
                              variant="outline"
                              size="sm"
                            >
                              Request Camera Permission
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Camera Controls */}
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  onClick={handleCapture}
                  disabled={!isStreaming || error}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Capture
                </Button>
                <Button
                  variant="outline"
                  onClick={switchCamera}
                  disabled={!isStreaming || error}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Switch Camera
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button variant="outline" onClick={onClose}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            /* Captured Image and Results */
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Captured Image</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadImage}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCapturedImage(null);
                          setAnalysisResult(null);
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retake
                      </Button>
                    </div>
                  </div>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Analysis Results */}
              {isProcessing ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Analyzing image...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      This may take a few moments
                    </p>
                  </CardContent>
                </Card>
              ) : analysisResult ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{analysisResult.type}</h3>
                      <Badge 
                        variant={analysisResult.status === 'success' ? 'default' : 
                                analysisResult.status === 'warning' ? 'secondary' : 'outline'}
                        className={
                          analysisResult.status === 'success' ? 'bg-green-100 text-green-800' :
                          analysisResult.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }
                      >
                        {analysisResult.confidence}% Confidence
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {analysisResult.findings.map((finding: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">{finding.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{finding.value}</span>
                            {finding.status === 'success' && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                            {finding.status === 'warning' && (
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            )}
                            {finding.status === 'info' && (
                              <div className="h-4 w-4 rounded-full bg-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          )}

          {/* Instructions */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                {modeConfig.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default CameraScanner;


