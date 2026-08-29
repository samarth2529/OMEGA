import React from 'react';
import { useLiveData, StatusIndicator } from '../core/LiveDataProvider';

export default function HolographicEarth() {
  const liveData = useLiveData();
  
  return (
    <div style={{ flex: 1, minHeight: '300px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
           <StatusIndicator status="OFFLINE" />
       </div>
       
       {/* High-Tech Generated Earth Image with screen blend mode to remove black background */}
       <img 
         src="/holographic_earth.png" 
         alt="Holographic Earth"
         style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            animation: 'pulse-opacity 10s infinite alternate'
         }}
       />

       {/* Detailed Telemetry overlays positioned over the raw image */}
       <div style={{ position: 'absolute', top: '20px', right: '20px', textAlign: 'right' }}>
          <div style={{ fontSize: 'var(--text-micro)', color: 'var(--hud-cyan-dim)', letterSpacing: '1px' }}>ORBITAL SATELLITES</div>
          <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', textShadow: '0 0 10px var(--hud-red)', color: 'var(--hud-red)' }}>N/A</div>
          <div style={{ fontSize: 'calc(var(--text-micro) * 0.8)', color: 'var(--hud-red)' }}>DATA STREAM OFFLINE</div>
       </div>
       
       <div style={{ position: 'absolute', bottom: '20px', left: '20px', textAlign: 'left' }}>
          <div style={{ fontSize: 'var(--text-micro)', color: 'var(--hud-cyan-dim)', letterSpacing: '1px' }}>GLOBAL COVERAGE</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--hud-red)' }}>OFFLINE</div>
          {/* Mini data bar */}
          <div style={{ width: '80px', height: '3px', background: 'rgba(255,0,0,0.2)', marginTop: '4px' }}>
             <div style={{ width: '0%', height: '100%', background: 'var(--hud-red)' }}></div>
          </div>
       </div>
    </div>
  );
}
