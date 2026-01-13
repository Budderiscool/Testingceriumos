
import React, { useState } from 'react';
import { Icon } from '../components/Icon';

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com/search?igu=1');
  const [inputUrl, setInputUrl] = useState('google.com');

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl;
    if (!target.startsWith('http')) target = 'https://' + target;
    setUrl(target);
  };

  return (
    <div className="flex flex-col h-full bg-[#f1f3f4]">
      {/* Browser UI */}
      <div className="h-10 flex items-center px-4 gap-3 bg-white border-b border-slate-200">
        <div className="flex gap-2">
          <Icon name="ArrowLeft" size={18} className="text-slate-600 hover:bg-slate-100 p-1 rounded cursor-pointer" />
          <Icon name="ArrowRight" size={18} className="text-slate-400 p-1 rounded" />
          <Icon name="RefreshCcw" size={18} className="text-slate-600 hover:bg-slate-100 p-1 rounded cursor-pointer" onClick={() => setUrl(url)} />
        </div>
        <form onSubmit={handleGo} className="flex-1">
          <input 
            className="w-full bg-[#f1f3f4] rounded-full px-4 py-1 text-sm outline-none border border-transparent focus:border-blue-500 focus:bg-white transition-all"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
        </form>
        <div className="flex gap-2">
          <Icon name="Star" size={18} className="text-slate-400" />
          <Icon name="MoreVertical" size={18} className="text-slate-600" />
        </div>
      </div>

      {/* Bookmarks */}
      <div className="h-8 flex items-center px-4 gap-4 bg-white border-b border-slate-100 text-[11px] text-slate-600">
        <div className="flex items-center gap-1 hover:bg-slate-100 px-2 py-0.5 rounded cursor-pointer" onClick={() => { setInputUrl('google.com'); setUrl('https://www.google.com/search?igu=1'); }}>
          <Icon name="Search" size={12} /> Google
        </div>
        <div className="flex items-center gap-1 hover:bg-slate-100 px-2 py-0.5 rounded cursor-pointer" onClick={() => { setInputUrl('wikipedia.org'); setUrl('https://en.m.wikipedia.org'); }}>
          <Icon name="Globe" size={12} /> Wikipedia
        </div>
        <div className="flex items-center gap-1 hover:bg-slate-100 px-2 py-0.5 rounded cursor-pointer" onClick={() => { setInputUrl('github.com'); setUrl('https://github.com'); }}>
          <Icon name="Github" size={12} /> GitHub
        </div>
      </div>

      {/* Web View */}
      <div className="flex-1 bg-white relative">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Cerium Browser"
        />
        {/* Safety overlay for non-embeddable sites */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded text-[10px] text-slate-400 pointer-events-none">
          Cerium Protected View
        </div>
      </div>
    </div>
  );
};
