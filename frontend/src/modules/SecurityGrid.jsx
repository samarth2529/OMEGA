import React from 'react';
import ModuleContainer from './ModuleContainer';

export default function SecurityGrid() {
  return (
    <ModuleContainer title="SECURITY GRID" icon="🛡️" sysCode="SYS.512">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
           <div style={{ fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>STATUS</div>
           <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--hud-green)' }}>SECURE</div>
           <div style={{ fontSize: '10px', color: 'var(--hud-cyan-dim)', marginTop: '8px' }}>THREAT LEVEL</div>
           <div style={{ fontSize: '12px', fontWeight: 'bold' }}>LOW</div>
        </div>
        <div style={{ 
           width: '50px', height: '60px', 
           border: '2px solid var(--hud-cyan)', 
           borderRadius: '4px 4px 25px 25px',
           display: 'flex', justifyContent: 'center', alignItems: 'center',
           boxShadow: '0 0 15px var(--hud-cyan-glow)'
        }}>
           <span style={{ fontSize: '24px' }}>🔒</span>
        </div>
      </div>
    </ModuleContainer>
  );
}
