import React from 'react';

export default function OmegaCore({ voiceStatus, status }) {
  const isListening = voiceStatus === 'LISTENING' || voiceStatus === 'SPEAKING' || voiceStatus === 'THINKING';
  
  return (
    <div className="omega-core-wrapper">
      
      {/* 1. Massive Radial Grid Background */}
      <svg className="core-orbit-svg spin-slow" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
         <circle cx="500" cy="500" r="450" fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="1" strokeDasharray="5 15" />
         <circle cx="500" cy="500" r="380" fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="2" strokeDasharray="20 40" />
         <circle cx="500" cy="500" r="300" fill="none" stroke="rgba(0, 119, 255, 0.2)" strokeWidth="1" />
         {/* Internal orbital arcs */}
         <path d="M 200 500 A 300 300 0 0 1 500 200" fill="none" stroke="var(--hud-cyan)" strokeWidth="3" />
         <path d="M 800 500 A 300 300 0 0 1 500 800" fill="none" stroke="var(--hud-cyan)" strokeWidth="3" />
      </svg>
      
      {/* 2. Counter-Rotating Data Track */}
      <svg className="core-orbit-svg spin-reverse" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
         <circle cx="500" cy="500" r="240" fill="none" stroke="rgba(255, 0, 170, 0.3)" strokeWidth="4" strokeDasharray="50 100" />
         <circle cx="500" cy="260" r="8" fill="var(--hud-magenta)" />
         <circle cx="500" cy="740" r="8" fill="var(--hud-magenta)" />
         <circle cx="260" cy="500" r="8" fill="var(--hud-magenta)" />
         <circle cx="740" cy="500" r="8" fill="var(--hud-magenta)" />
      </svg>

      {/* 3. Fast Energy Nodes */}
      <svg className="core-orbit-svg spin-fast" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
         <circle cx="500" cy="500" r="180" fill="none" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="2" strokeDasharray="2 10" />
         {/* Orbiting data blocks */}
         <rect x="495" y="310" width="10" height="20" fill="var(--hud-cyan)" />
         <rect x="495" y="670" width="10" height="20" fill="var(--hud-cyan)" />
         <rect x="310" y="495" width="20" height="10" fill="var(--hud-cyan)" />
         <rect x="670" y="495" width="20" height="10" fill="var(--hud-cyan)" />
      </svg>

      {/* 4. Core Telemetry Labels (Responsive positioning using percentages) */}
      <div style={{ position: 'absolute', top: '15%', left: '0%', textAlign: 'right', width: '25%' }}>
         <div style={{ fontSize: 'var(--text-md)', color: 'var(--hud-cyan-dim)', letterSpacing: '2px' }}>CORE TEMP</div>
         <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: '#fff' }}>38.2°C</div>
         <div style={{ fontSize: 'var(--text-micro)', color: 'var(--hud-cyan)' }}>NOMINAL // STABLE</div>
      </div>

      <div style={{ position: 'absolute', top: '15%', right: '0%', textAlign: 'left', width: '25%' }}>
         <div style={{ fontSize: 'var(--text-md)', color: 'var(--hud-cyan-dim)', letterSpacing: '2px' }}>AI ACTIVITY</div>
         <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: '#fff' }}>92.4%</div>
         <div style={{ fontSize: 'var(--text-micro)', color: 'var(--hud-magenta)' }}>PEAK PROCESSING</div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '15%', left: '0%', textAlign: 'right', width: '25%' }}>
         <div style={{ fontSize: 'var(--text-md)', color: 'var(--hud-cyan-dim)', letterSpacing: '2px' }}>CORE LOAD</div>
         <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: '#fff' }}>67.1%</div>
         <div style={{ width: '100%', height: '2px', background: 'var(--hud-cyan)', marginTop: '5px' }}></div>
      </div>

      <div style={{ position: 'absolute', bottom: '15%', right: '0%', textAlign: 'left', width: '25%' }}>
         <div style={{ fontSize: 'var(--text-md)', color: 'var(--hud-cyan-dim)', letterSpacing: '2px' }}>QUANTUM FLUX</div>
         <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: '#fff' }}>1.3 QPS</div>
         <div style={{ width: '100%', height: '2px', background: 'var(--hud-cyan)', marginTop: '5px' }}></div>
      </div>

      {/* 5. Central Fluid Blob (The actual "Core") */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      <div style={{ position: 'absolute', filter: 'url(#gooey)', width: '50%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <div className="core-blob" style={{ background: isListening ? 'radial-gradient(circle, #fff 0%, var(--hud-red) 50%, transparent 80%)' : '' }}></div>
         <div className="core-blob" style={{ animationDelay: '-2s', opacity: 0.5 }}></div>
         
         <div style={{ position: 'absolute', zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px #fff' }}>O M E G A</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px' }}>{voiceStatus}</div>
         </div>
      </div>
      
    </div>
  );
}
