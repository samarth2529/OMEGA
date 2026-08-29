import React from 'react';
import ModuleContainer from './ModuleContainer';

export default function NeuralNetwork() {
  return (
    <ModuleContainer title="NEURAL NETWORK" icon="🧠" sysCode="SYS.771">
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
               <div style={{ fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>ACTIVITY</div>
               <div style={{ fontSize: '28px', fontWeight: 'bold', textShadow: '0 0 10px var(--hud-cyan)' }}>82%</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '9px', color: 'var(--hud-cyan-dim)' }}>
               PROCESSING<br/>
               <span style={{ color: '#fff' }}>DEEP LEARNING // V.09</span>
            </div>
         </div>
         
         <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Dense Neural Graph SVG */}
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
               {/* Background structural links */}
               <path d="M10,50 Q30,20 50,20 T90,50 T50,80 Z" fill="none" stroke="rgba(0, 119, 255, 0.15)" strokeWidth="1" strokeDasharray="1 2" />
               <path d="M20,40 Q40,10 60,30 T80,60" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="0.5" />
               <path d="M30,70 L50,40 L80,50 L60,80 Z" fill="none" stroke="rgba(255, 0, 170, 0.2)" strokeWidth="0.5" />
               
               {/* Foreground active links */}
               <path d="M30,40 L50,60 L70,40" fill="none" stroke="var(--hud-cyan)" strokeWidth="0.8" />
               <path d="M50,60 L60,80" fill="none" stroke="var(--hud-cyan)" strokeWidth="0.5" strokeDasharray="2 2" />
               <path d="M20,50 L30,40" fill="none" stroke="var(--hud-magenta)" strokeWidth="0.8" />
               
               {/* Dense Nodes */}
               <circle cx="10" cy="50" r="1" fill="var(--hud-cyan-dim)" />
               <circle cx="20" cy="50" r="1.5" fill="var(--hud-cyan)" />
               <circle cx="30" cy="40" r="2.5" fill="#fff" />
               <circle cx="50" cy="60" r="2.5" fill="var(--hud-cyan)" />
               <circle cx="70" cy="40" r="2" fill="var(--hud-magenta)" />
               <circle cx="80" cy="50" r="1.5" fill="var(--hud-cyan)" />
               <circle cx="90" cy="50" r="1" fill="var(--hud-cyan-dim)" />
               <circle cx="60" cy="80" r="1.5" fill="var(--hud-cyan)" />
               <circle cx="50" cy="40" r="1.5" fill="var(--hud-cyan-dim)" />
               <circle cx="60" cy="30" r="1" fill="var(--hud-magenta)" />
               <circle cx="40" cy="30" r="1.5" fill="#fff" />
               <circle cx="30" cy="70" r="1.5" fill="var(--hud-cyan)" />
               
               {/* Moving particles on lines */}
               <circle cx="30" cy="40" r="1" fill="#fff">
                  <animate attributeName="cx" values="30;50;70;30" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="40;60;40;40" dur="4s" repeatCount="indefinite" />
               </circle>
            </svg>
         </div>

         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--hud-cyan-dim)', borderTop: '1px solid var(--hud-cyan-dark)', paddingTop: '5px' }}>
           <div>NEURONS<br/><span style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold' }}>16.8B</span></div>
           <div style={{ textAlign: 'center' }}>LAYERS<br/><span style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold' }}>256</span></div>
           <div style={{ textAlign: 'right' }}>SYNAPSES<br/><span style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold' }}>102.4T</span></div>
         </div>
      </div>
    </ModuleContainer>
  );
}
