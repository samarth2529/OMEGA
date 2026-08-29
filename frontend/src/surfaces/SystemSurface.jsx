import React from 'react';

export default function SystemSurface({ data }) {
  const cpu = data?.cpu || '0%';
  const ram = data?.ram || '0%';
  
  return (
    <div style={{ padding: '10px', height: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div className="progress-bar-container">
         <div className="progress-label">CPU</div>
         <div className="progress-track"><div className="progress-fill segmented" style={{ width: cpu }}></div></div>
         <div className="progress-value">{cpu}</div>
      </div>
      <div className="progress-bar-container">
         <div className="progress-label">RAM</div>
         <div className="progress-track"><div className="progress-fill segmented" style={{ width: ram }}></div></div>
         <div className="progress-value">{ram}</div>
      </div>
      
      <div style={{ marginTop: 'auto', fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>
        SYSTEM.DIAGNOSTICS_OK
      </div>
    </div>
  );
}
