import React from 'react';
import ModuleContainer from './ModuleContainer';
import { useLiveData } from '../core/LiveDataProvider';

export default function SystemStatus() {
  const liveData = useLiveData();

  const cpu = liveData.cpu || { value: 0, status: 'SYNCING' };
  const ram = liveData.ram || { value: 0, status: 'SYNCING' };
  const disk = liveData.disk || { value: 0, status: 'SYNCING' };

  return (
    <ModuleContainer title="SYSTEM STATUS" icon="⚙️" sysCode="SYS.01" status={cpu.status}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <StatRow label="CPU" value={`${cpu.value.toFixed(1)}%`} percent={`${cpu.value}%`} color="var(--hud-cyan)" />
        <StatRow label="GPU" value="N/A" percent="0%" color="var(--hud-blue)" />
        <StatRow label="RAM" value={`${ram.value.toFixed(1)}%`} percent={`${ram.value}%`} color="var(--hud-magenta)" />
        <StatRow label="SSD" value={`${disk.value.toFixed(1)}%`} percent={`${disk.value}%`} color="var(--hud-cyan-dim)" />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--hud-cyan-dark)', paddingTop: '8px', marginTop: '4px' }}>
           <div>
              <div style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)' }}>TEMPERATURE</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>48 °C</div>
           </div>
           
           <div style={{ width: '50px', height: '20px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
              {/* Micro-graph */}
              {[...Array(8)].map((_, i) => (
                 <div key={i} style={{ flex: 1, background: 'var(--hud-red)', height: `${30 + Math.random() * 70}%`, opacity: 0.7 }}></div>
              ))}
           </div>
           
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)' }}>FAN SPEED</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>1280 RPM</div>
           </div>
        </div>
      </div>
    </ModuleContainer>
  );
}

function StatRow({ label, value, percent, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)' }}>
      <div style={{ width: '30px', fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>{label}</div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
         <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
         <div style={{ height: '4px', background: 'rgba(0, 85, 119, 0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: percent, background: color, boxShadow: `0 0 10px ${color}` }}></div>
         </div>
         <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
      </div>
      
      <div style={{ width: '35px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{value}</div>
    </div>
  );
}
