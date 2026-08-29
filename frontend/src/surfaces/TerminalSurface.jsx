import React from 'react';

export default function TerminalSurface({ data }) {
  const logs = data?.logs || ['> Awaiting execution...'];
  
  return (
    <div className="terminal-output" style={{ padding: '10px', height: '100%' }}>
      {logs.map((log, i) => (
         <div key={i} className={`terminal-line ${log.includes('ERROR') ? 'error' : 'active'}`}>{log}</div>
      ))}
    </div>
  );
}
