import { useState, useRef, useCallback, useEffect } from 'react';

export interface CameraState {
  isStreaming: boolean;
  hasPermission: boolean;
  error: string | null;
  stream: MediaStream | null;
}

export interface CameraControls {
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => string | null;
  switchCamera: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
}

export const useCamera = (): CameraState & CameraControls => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      console.log('Starting camera...');
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      // Check if we're on HTTPS or localhost
      const isSecureContext = window.isSecureContext || window.location.hostname === 'localhost';
      if (!isSecureContext) {
        throw new Error('Camera access requires HTTPS or localhost');
      }

      console.log('Requesting camera permission...');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Camera access timeout after 5 seconds')), 5000);
      });

      // Try basic video first
      let mediaStream;
      try {
        mediaStream = await Promise.race([
          navigator.mediaDevices.getUserMedia({ video: true }),
          timeoutPromise
        ]) as MediaStream;
      } catch (basicErr) {
        console.log('Basic video failed, trying with constraints...');
        // Try with specific constraints
        mediaStream = await Promise.race([
          navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: facingMode,
              width: { min: 320, ideal: 640, max: 1280 },
              height: { min: 240, ideal: 480, max: 720 }
            }
          }),
          timeoutPromise
        ]) as MediaStream;
      }

      console.log('Camera permission granted, setting up stream...');
      setStream(mediaStream);
      setHasPermission(true);
      setIsStreaming(true);

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        console.log('Camera stream started successfully');
      }

    } catch (err) {
      console.error('Camera error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera';
      setError(errorMessage);
      setHasPermission(false);
      setIsStreaming(false);
      
      // Handle specific permission errors
      if (err instanceof DOMException) {
        switch (err.name) {
          case 'NotAllowedError':
            setError('Camera permission denied. Please allow camera access and try again.');
            break;
          case 'NotFoundError':
            setError('No camera found on this device.');
            break;
          case 'NotReadableError':
            setError('Camera is already in use by another application.');
            break;
          case 'OverconstrainedError':
            setError('Camera constraints cannot be satisfied. Please try the Upload Image option instead.');
            break;
          default:
            setError(`Camera error: ${errorMessage}`);
        }
      }
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsStreaming(false);
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      return null;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to data URL
    return canvas.toDataURL('image/jpeg', 0.8);
  }, []);

  const switchCamera = useCallback(async () => {
    if (isStreaming) {
      stopCamera();
      setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
      
      // Small delay to ensure camera is fully stopped
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  }, [isStreaming, stopCamera, startCamera]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      console.log('Requesting camera permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      setError(null);
      console.log('Camera permission granted');
      return true;
    } catch (err) {
      console.error('Camera permission denied:', err);
      setError('Camera permission denied. Please allow camera access in your browser settings.');
      setHasPermission(false);
      return false;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    isStreaming,
    hasPermission,
    error,
    stream,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    requestPermission,
    videoRef,
    canvasRef
  };
};


