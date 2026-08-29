import React from 'react';
import ModuleContainer from './ModuleContainer';
import { useLiveData } from '../core/LiveDataProvider';

export default function RealTimeAnalytics() {
  const { cpu, ram, gpu, network } = useLiveData();
  return (
    <ModuleContainer title="REAL TIME ANALYTICS" icon="📈" sysCode="SYS.110" style={{ flex: 1, minHeight: '120px' }} status={cpu.status}>
       <div style={{ display: 'flex', gap: '25px', height: '100%', alignItems: 'center' }}>
          <Chart label="CPU USAGE" value={`${cpu.value.toFixed(1)}%`} color="var(--hud-cyan)" />
          <Chart label="GPU USAGE" value={gpu && gpu.value > 0 ? `${gpu.value.toFixed(1)}%` : "N/A"} color="var(--hud-red)" />
          <Chart label="NETWORK I/O" value={`${(network.download + network.upload).toFixed(1)} Mbps`} color="var(--hud-magenta)" />
          <Chart label="NET USAGE" value="12%" color="var(--hud-green)" />
       </div>
    </ModuleContainer>
  );
}

function Chart({ label, value, color }) {
  return (
     <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5px' }}>
           <span style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)', letterSpacing: '1px' }}>{label}</span>
           <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold', textShadow: `0 0 10px ${color}` }}>{value}</span>
        </div>
        
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '1px' }}>
           {/* Detailed Data Matrix */}
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 20%' }}></div>
           
           {[...Array(24)].map((_, i) => (
              <div key={i} style={{ 
                 flex: 1, 
                 background: `linear-gradient(0deg, ${color} 0%, transparent 100%)`,
                 height: `${10 + Math.random() * 90}%`, 
                 borderTop: `1px solid ${color}`,
                 opacity: 0.8
              }}></div>
           ))}
        </div>
     </div>
  );
}
