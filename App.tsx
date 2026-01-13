
import React, { useState, useCallback, useEffect } from 'react';
import { Window } from './components/Window';
import { Icon } from './components/Icon';
import { StartMenu } from './components/StartMenu';
import { WindowState, AppId } from './types';
import { Terminal } from './apps/Terminal';
import { Notepad } from './apps/Notepad';
import { Settings } from './apps/Settings';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const launchApp = useCallback((appId: AppId) => {
    const id = `${appId}-${Date.now()}`;
    const newWindow: WindowState = {
      id,
      appId,
      title: appId.charAt(0).toUpperCase() + appId.slice(1),
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: windows.length + 1,
      x: 100 + (windows.length * 40),
      y: 100 + (windows.length * 40),
      width: 800,
      height: 600,
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(id);
  }, [windows.length]);

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindow(null);
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(0, ...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
    });
    setActiveWindow(id);
    setIsStartOpen(false);
  };

  const toggleStart = () => setIsStartOpen(prev => !prev);

  const renderAppContent = (window: WindowState) => {
    switch (window.appId) {
      case 'terminal': return <Terminal />;
      case 'notepad': return <Notepad />;
      case 'settings': return <Settings onWallpaperChange={setWallpaper} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Icon name="Construction" size={64} className="mb-4" />
          <p className="text-xl font-medium">Application under development</p>
        </div>
      );
    }
  };

  return (
    <div 
      className="h-screen w-screen relative overflow-hidden bg-cover bg-center transition-[background-image] duration-1000"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={() => setIsStartOpen(false)}
    >
      {/* Desktop Layer */}
      <div className="p-8 grid grid-cols-1 auto-rows-max gap-8 h-full">
        {[
          { id: 'terminal', label: 'Terminal', icon: 'Terminal' },
          { id: 'explorer', label: 'This PC', icon: 'Folder' },
          { id: 'notepad', label: 'Drafts', icon: 'FileText' },
          { id: 'browser', label: 'Cerium Browser', icon: 'Globe' },
        ].map(item => (
          <div 
            key={item.id}
            className="w-24 flex flex-col items-center gap-1 group cursor-default"
            onDoubleClick={() => launchApp(item.id as AppId)}
          >
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/10 group-hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors shadow-lg">
              <Icon name={item.icon} size={32} color="white" className="drop-shadow-md" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-lg text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Windows Layer */}
      {windows.map(window => (
        <Window 
          key={window.id}
          window={window}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
        >
          {renderAppContent(window)}
        </Window>
      ))}

      {/* Start Menu Overlay */}
      {isStartOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StartMenu onLaunch={launchApp} onClose={() => setIsStartOpen(false)} />
        </div>
      )}

      {/* Taskbar */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-12 glass-dark z-[10000] flex items-center justify-between px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center gap-1">
          <button 
            onClick={toggleStart}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${isStartOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <div className="grid grid-cols-2 gap-0.5 p-1 w-6 h-6 rotate-45">
               <div className="bg-blue-400 rounded-sm"></div>
               <div className="bg-blue-500 rounded-sm"></div>
               <div className="bg-blue-600 rounded-sm"></div>
               <div className="bg-blue-700 rounded-sm"></div>
            </div>
          </button>

          <div className="h-8 w-[1px] bg-white/10 mx-1" />

          {windows.map(w => (
            <button 
              key={w.id}
              onClick={() => focusWindow(w.id)}
              className={`min-w-[40px] px-3 h-10 rounded-md flex items-center gap-2 transition-all relative group ${activeWindow === w.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <Icon name={getAppIcon(w.appId)} size={20} className="text-slate-200" />
              {activeWindow === w.id && <span className="text-xs text-white max-w-[100px] truncate">{w.title}</span>}
              <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 bg-blue-500 rounded-full transition-all ${activeWindow === w.id ? 'w-4' : 'w-1'}`} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 px-4 text-white text-xs font-medium">
          <div className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded transition-colors cursor-default">
            <Icon name="Wifi" size={14} />
            <Icon name="Volume2" size={14} />
            <Icon name="Battery" size={14} />
          </div>
          <div className="flex flex-col items-end hover:bg-white/5 px-2 py-1 rounded transition-colors cursor-default">
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>{time.toLocaleDateString()}</span>
          </div>
          <button className="h-10 w-1 border-l border-white/20 ml-2 hover:bg-white/10" title="Peek at desktop" />
        </div>
      </div>
    </div>
  );
};

function getAppIcon(appId: string): string {
  switch (appId) {
    case 'terminal': return 'Terminal';
    case 'explorer': return 'Folder';
    case 'notepad': return 'FileText';
    case 'settings': return 'Settings';
    case 'browser': return 'Globe';
    case 'camera': return 'Camera';
    case 'calculator': return 'Calculator';
    default: return 'AppWindow';
  }
}

export default App;
