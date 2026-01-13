
import React from 'react';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1920&q=80'
];

export const Settings: React.FC<{ onWallpaperChange: (url: string) => void }> = ({ onWallpaperChange }) => {
  return (
    <div className="p-6 text-slate-800">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Personalization</h3>
        <p className="text-sm text-slate-500 mb-4">Choose your desktop background</p>
        <div className="grid grid-cols-2 gap-4">
          {WALLPAPERS.map((url, i) => (
            <div 
              key={i} 
              onClick={() => onWallpaperChange(url)}
              className="aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all shadow-md"
            >
              <img src={url} alt="Wallpaper" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">System Information</h3>
        <div className="bg-slate-100 p-4 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">OS Name:</span>
            <span>CeriumOS</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Version:</span>
            <span>1.0.42-stable</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Build:</span>
            <span>2024.05.21</span>
          </div>
        </div>
      </section>
    </div>
  );
};
