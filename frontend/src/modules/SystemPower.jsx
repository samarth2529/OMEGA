import React from 'react';
import ModuleContainer from './ModuleContainer';

export default function SystemPower() {
  return (
    <ModuleContainer title="SYSTEM POWER" icon="⚡" sysCode="SYS.909" style={{ flex: 1, minHeight: '100px' }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '100%' }}>
          
          <div style={{ width: '40px', height: '60px', border: '2px solid var(--hud-cyan)', borderRadius: '4px', padding: '2px', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-4px', left: '10px', width: '16px', height: '2px', background: 'var(--hud-cyan)' }}></div>
             <div style={{ width: '100%', height: '100%', background: 'var(--hud-cyan)', boxShadow: '0 0 10px var(--hud-cyan)' }}></div>
          </div>
          
          <div>
             <div style={{ fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>BATTERY</div>
             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>100%</div>
             <div style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)' }}>FULLY CHARGED</div>
          </div>
          
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
             <div style={{ fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>POWER PLAN</div>
             <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--hud-cyan)' }}>QUANTUM MAX</div>
          </div>
          
       </div>
    </ModuleContainer>
  );
}
