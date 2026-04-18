'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type CameraState = 'idle' | 'requesting' | 'active' | 'denied' | 'unsupported';

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>('idle');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(
    async (facing: 'environment' | 'user' = facingMode) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState('unsupported');
        return;
      }
      stopStream();
      setState('requesting');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1080 } },
        });
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          // Use the `playing` event — it fires only when the video is actually
          // rendering frames, so videoWidth/videoHeight are guaranteed non-zero.
          // `loadeddata` can fire before the decoder has produced any frames on
          // iOS Safari and some Android browsers.
          await new Promise<void>((resolve) => {
            if (video.readyState >= 3) { resolve(); return; }
            video.addEventListener('playing', () => resolve(), { once: true });
          });
        }
        setState('active');
      } catch (err: unknown) {
        const name = err instanceof Error ? err.name : '';
        setState(
          name === 'NotAllowedError' || name === 'PermissionDeniedError' ? 'denied' : 'unsupported'
        );
      }
    },
    [facingMode, stopStream]
  );

  const flipCamera = useCallback(() => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  }, [facingMode, startCamera]);

  const capture = useCallback((): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;
    if (video.videoWidth === 0 || video.videoHeight === 0) return null;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.92);
  }, []);

  useEffect(() => {
    return () => stopStream();
  }, [stopStream]);

  return { videoRef, canvasRef, state, startCamera, flipCamera, capture };
}
