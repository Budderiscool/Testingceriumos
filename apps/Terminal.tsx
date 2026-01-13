
import React, { useState, useRef, useEffect } from 'react';
import { queryCeriumAI } from '../services/geminiService';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<{ type: 'cmd' | 'res', text: string }[]>([
    { type: 'res', text: 'CeriumOS [Version 1.0.42]' },
    { type: 'res', text: '(c) Cerium Foundation. All rights reserved.' },
    { type: 'res', text: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    setHistory(prev => [...prev, { type: 'cmd', text: cmd }]);
    setInput('');

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd.toLowerCase() === 'help') {
       setHistory(prev => [...prev, { type: 'res', text: 'Available commands: clear, help, date, whoami, version, [anything else for AI]' }]);
       return;
    }

    setIsLoading(true);
    const response = await queryCeriumAI(cmd, "Current OS state: Desktop, Terminal open.");
    setHistory(prev => [...prev, { type: 'res', text: response || 'No response from kernel.' }]);
    setIsLoading(false);
  };

  return (
    <div className="h-full bg-slate-900 text-green-400 font-mono p-4 text-sm overflow-y-auto">
      {history.map((line, i) => (
        <div key={i} className="mb-1 leading-relaxed">
          {line.type === 'cmd' ? (
            <div className="flex">
              <span className="text-blue-400 mr-2">C:\Users\User&gt;</span>
              <span className="text-white">{line.text}</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{line.text}</div>
          )}
        </div>
      ))}
      {isLoading && <div className="animate-pulse">_ Processing request...</div>}
      <form onSubmit={handleCommand} className="flex mt-1">
        <span className="text-blue-400 mr-2">C:\Users\User&gt;</span>
        <input 
          autoFocus
          className="bg-transparent border-none outline-none text-white flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};
