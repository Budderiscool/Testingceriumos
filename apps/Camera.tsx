
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../components/Icon';

export const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        setError("Camera access denied or not available. Please ensure permissions are granted.");
        console.error(err);
      }
    }
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center relative group select-none">
      {error ? (
        <div className="text-white text-center p-8 max-w-xs">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CameraOff" size={32} className="text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-300">{error}</p>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
          <div className="absolute bottom-10 flex gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center hover:bg-white/40 transition-all active:scale-90 shadow-2xl">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
            </button>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="p-2 bg-black/40 backdrop-blur rounded-lg text-white hover:bg-black/60">
              <Icon name="Settings" size={18} />
            </button>
            <button className="p-2 bg-black/40 backdrop-blur rounded-lg text-white hover:bg-black/60">
              <Icon name="RotateCw" size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
