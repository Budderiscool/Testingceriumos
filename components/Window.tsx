import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  children 
}) => {
  const [pos, setPos] = useState({ x: window.x, y: window.y });
  const [size, setSize] = useState({ width: window.width, height: window.height });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(window.id);
    if (window.isMaximized) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPos({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Fix: Explicitly use globalThis.addEventListener to avoid conflict with 'window' prop shadowing
    globalThis.addEventListener('mousemove', handleMouseMove);
    globalThis.addEventListener('mouseup', handleMouseUp);
    return () => {
      globalThis.removeEventListener('mousemove', handleMouseMove);
      globalThis.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (window.isMinimized) return null;

  const style: React.CSSProperties = window.isMaximized 
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', zIndex: window.zIndex }
    : { top: pos.y, left: pos.x, width: size.width, height: size.height, zIndex: window.zIndex };

  return (
    <div 
      className={`absolute flex flex-col glass rounded-xl overflow-hidden shadow-2xl border border-white/40 transition-shadow duration-300 ${window.isMaximized ? '' : 'rounded-xl'}`}
      style={style}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div 
        className="h-10 flex items-center justify-between px-3 bg-white/30 backdrop-blur-md cursor-default"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div className="flex items-center gap-2">
          <Icon name={getAppIcon(window.appId)} size={16} className="text-slate-700" />
          <span className="text-sm font-medium text-slate-800 truncate select-none">{window.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
            className="p-2 hover:bg-slate-200/50 rounded-md transition-colors"
          >
            <Icon name="Minus" size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
            className="p-2 hover:bg-slate-200/50 rounded-md transition-colors"
          >
            <Icon name={window.isMaximized ? "Copy" : "Square"} size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            className="p-2 hover:bg-red-500 hover:text-white rounded-md transition-colors"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white/60">
        {children}
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
