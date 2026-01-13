
import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleClick = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
    } else if (val === '=') {
      try {
        // Simple eval replacement for basic math
        const result = eval(equation.replace(/×/g, '*').replace(/÷/g, '/'));
        setDisplay(String(result));
        setEquation(String(result));
      } catch {
        setDisplay('Error');
      }
    } else {
      setEquation(prev => (prev === '0' ? val : prev + val));
      setDisplay(prev => (prev === '0' || equation === display ? val : prev + val));
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    'C', '0', '=', '+'
  ];

  return (
    <div className="h-full bg-[#f3f3f3] p-4 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow-inner border border-slate-200">
        <div className="text-right text-xs text-slate-400 h-4 overflow-hidden">{equation || ' '}</div>
        <div className="text-right text-3xl font-bold text-slate-800 truncate">{display}</div>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-2">
        {buttons.map(btn => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`rounded-lg flex items-center justify-center text-lg font-medium transition-all shadow-sm
              ${btn === '=' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-slate-700 hover:bg-slate-100'}
              ${['÷', '×', '-', '+', 'C'].includes(btn) && btn !== '=' ? 'text-blue-600 bg-slate-50' : ''}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};
