
import React, { useState } from 'react';

export const Notepad: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <textarea 
      className="w-full h-full p-4 bg-white outline-none resize-none font-sans text-slate-800"
      placeholder="Type something..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
