import React from 'react';
import ModuleContainer from './ModuleContainer';

export default function CommandTerminal({ logs = [] }) {
  return (
    <ModuleContainer title="COMMAND TERMINAL" icon=">_" sysCode="SYS.101" style={{ flex: 1 }}>
      <div className="terminal-box">
        <div className="sys">&gt; Initializing OMEGA Core...</div>
        <div className="sys">&gt; Loading Neural Network...</div>
        <div className="sys">&gt; Synchronizing System Modules...</div>
        <div className="sys">&gt; Connecting to Quantum Cloud...</div>
        <div className="sys">&gt; Security Protocols: ACTIVE</div>
        <div className="sys" style={{ marginBottom: '10px' }}>&gt; All Systems: OPERATIONAL</div>
        {logs.map((log, i) => (
           <div key={i} className={log.includes('ERROR') ? 'error' : 'active'}>&gt; {log}</div>
        ))}
        <div>&gt; Awaiting Command...</div>
      </div>
    </ModuleContainer>
  );
}
