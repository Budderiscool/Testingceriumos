
import React, { useState } from 'react';
import { Icon } from '../components/Icon';

const FILESYSTEM = {
  'Quick access': ['Desktop', 'Downloads', 'Documents', 'Pictures'],
  'This PC': {
    'Local Disk (C:)': ['Users', 'Windows', 'Program Files'],
    'Data (D:)': ['Backups', 'Projects']
  }
};

export const Explorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('This PC > Local Disk (C:)');

  const folders = ['Documents', 'Downloads', 'Music', 'Pictures', 'Videos', 'System32', 'Users', 'Logs'];

  return (
    <div className="flex h-full bg-white select-none">
      {/* Sidebar */}
      <div className="w-48 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Navigation</div>
        <div className="flex items-center gap-2 p-1.5 hover:bg-slate-200 rounded cursor-pointer text-sm text-slate-700">
          <Icon name="Star" size={14} className="text-yellow-500" /> Quick access
        </div>
        <div className="flex items-center gap-2 p-1.5 hover:bg-slate-200 rounded cursor-pointer text-sm text-slate-700">
          <Icon name="Monitor" size={14} className="text-blue-500" /> Desktop
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-blue-100 rounded cursor-pointer text-sm text-slate-900 font-medium">
          <Icon name="HardDrive" size={14} className="text-slate-600" /> This PC
        </div>
        <div className="ml-4 flex flex-col gap-1 mt-1 border-l border-slate-300 pl-2">
           <div className="text-xs p-1 hover:text-blue-600 cursor-pointer">Local Disk (C:)</div>
           <div className="text-xs p-1 hover:text-blue-600 cursor-pointer">Data (D:)</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-10 border-b border-slate-200 flex items-center px-4 gap-4 bg-white">
          <div className="flex items-center gap-2">
            <Icon name="ArrowLeft" size={16} className="text-slate-400" />
            <Icon name="ArrowRight" size={16} className="text-slate-400" />
            <Icon name="ArrowUp" size={16} className="text-slate-600" />
          </div>
          <div className="flex-1 bg-slate-100 border border-slate-300 rounded px-3 py-1 text-xs text-slate-600 flex items-center gap-2">
            <Icon name="Folder" size={12} /> {currentPath}
          </div>
          <div className="w-48 bg-slate-100 border border-slate-300 rounded px-3 py-1 text-xs text-slate-400 flex items-center gap-2">
            <Icon name="Search" size={12} /> Search Drive
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 p-6 grid grid-cols-4 md:grid-cols-6 auto-rows-max gap-6 overflow-auto">
          {folders.map(folder => (
            <div key={folder} className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 rounded cursor-pointer group">
              <Icon name="Folder" size={48} className="text-yellow-500 group-hover:scale-105 transition-transform" />
              <span className="text-xs text-slate-700 text-center truncate w-full">{folder}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 rounded cursor-pointer group">
            <Icon name="FileText" size={48} className="text-blue-400 group-hover:scale-105 transition-transform" />
            <span className="text-xs text-slate-700 text-center truncate w-full">readme.txt</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 rounded cursor-pointer group">
            <Icon name="File" size={48} className="text-slate-400 group-hover:scale-105 transition-transform" />
            <span className="text-xs text-slate-700 text-center truncate w-full">config.sys</span>
          </div>
        </div>
      </div>
    </div>
  );
};
