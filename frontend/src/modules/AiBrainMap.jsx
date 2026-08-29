import React from 'react';
import ModuleContainer from './ModuleContainer';

export default function AiBrainMap() {
  return (
    <ModuleContainer title="AI BRAIN MAP" icon="🧬" sysCode="SYS.882">
       <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
             {/* Dense Brain SVG */}
             <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%' }}>
                {/* Outer bounding mesh */}
                <path d="M15,30 Q25,5 50,10 T85,30 T50,55 T15,30 Z" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="0.5" strokeDasharray="1 1" />
                
                {/* Dense inner mesh */}
                <path d="M25,30 L35,20 L50,15 L65,20 L75,30 L65,45 L50,50 L35,45 Z" fill="none" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="0.3" />
                <path d="M35,20 L65,45 M50,15 L50,50 M65,20 L35,45" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="0.2" />
                
                {/* Neural pulses */}
                <path d="M25,30 Q40,15 60,20 T80,35" fill="none" stroke="var(--hud-cyan)" strokeWidth="0.8" />
                <path d="M30,40 Q50,25 70,35" fill="none" stroke="var(--hud-magenta)" strokeWidth="0.5" />
                
                {/* Dense Nodes */}
                {[...Array(20)].map((_, i) => (
                   <circle key={i} 
                      cx={15 + Math.random() * 70} 
                      cy={10 + Math.random() * 40} 
                      r={Math.random() * 1.5} 
                      fill={Math.random() > 0.5 ? 'var(--hud-cyan)' : 'var(--hud-magenta)'} 
                   />
                ))}
                <circle cx="40" cy="25" r="1.5" fill="#fff" />
                <circle cx="60" cy="25" r="1.5" fill="#fff" />
                <circle cx="50" cy="35" r="2" fill="var(--hud-cyan)" />
             </svg>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', borderTop: '1px solid var(--hud-cyan-dark)', paddingTop: '5px' }}>
             <div>
                <span style={{ color: 'var(--hud-cyan-dim)' }}>LEARNING RATE</span><br/>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>1.7x</span>
             </div>
             <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--hud-cyan-dim)' }}>QUANTUM FLUX</span><br/>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>1.3 QPS</span>
             </div>
          </div>
       </div>
    </ModuleContainer>
  );
}
