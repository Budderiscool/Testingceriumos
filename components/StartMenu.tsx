
import React from 'react';
import { Icon } from './Icon';
import { AppId } from '../types';

interface StartMenuProps {
  onLaunch: (appId: AppId) => void;
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onLaunch, onClose }) => {
  const apps: { id: AppId; label: string; icon: string; color: string }[] = [
    { id: 'terminal', label: 'Terminal', icon: 'Terminal', color: 'bg-slate-800' },
    { id: 'notepad', label: 'Notepad', icon: 'FileText', color: 'bg-blue-500' },
    { id: 'explorer', label: 'Files', icon: 'Folder', color: 'bg-yellow-500' },
    { id: 'settings', label: 'Settings', icon: 'Settings', color: 'bg-slate-500' },
    { id: 'browser', label: 'Web', icon: 'Globe', color: 'bg-indigo-500' },
    { id: 'camera', label: 'Camera', icon: 'Camera', color: 'bg-red-500' },
    { id: 'calculator', label: 'Calc', icon: 'Calculator', color: 'bg-green-600' },
  ];

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[540px] h-[600px] glass-dark rounded-2xl shadow-2xl p-8 z-[9999] flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="relative mb-8">
        <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          placeholder="Search for apps, settings, and files"
          className="w-full h-12 bg-slate-800/50 border border-slate-700/50 rounded-full pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-semibold">Pinned</h3>
          <button className="text-xs text-blue-400 hover:underline">All apps &gt;</button>
        </div>
        
        <div className="grid grid-cols-6 gap-y-8">
          {apps.map((app) => (
            <div 
              key={app.id} 
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => { onLaunch(app.id); onClose(); }}
            >
              <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon name={app.icon} color="white" size={24} />
              </div>
              <span className="text-[11px] text-slate-200 text-center">{app.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-12">
           <h3 className="text-white font-semibold mb-4">Recommended</h3>
           <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Icon name="FileText" className="text-blue-400" />
                <div>
                  <div className="text-sm text-white">Project Proposal</div>
                  <div className="text-xs text-slate-400">Recently edited</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Icon name="Camera" className="text-red-400" />
                <div>
                  <div className="text-sm text-white">Selfie_01.jpg</div>
                  <div className="text-xs text-slate-400">12h ago</div>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700/50 flex justify-between items-center">
        <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
          <span className="text-white text-sm">John Doe</span>
        </div>
        <Icon name="Power" className="text-slate-400 hover:text-red-400 cursor-pointer transition-colors" size={18} />
      </div>
    </div>
  );
};
