import React from 'react';

export default function BottomDock({ onMicToggle, isListening }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100%', position: 'relative' }}>
      <div className="bottom-dock" style={{ padding: '0 clamp(20px, 4vw, 60px)' }}>
         <div 
           className="dock-btn core-btn" 
           onClick={onMicToggle}
           style={{ 
              borderColor: isListening ? 'var(--hud-red)' : 'var(--hud-cyan)',
              boxShadow: isListening ? '0 0 40px var(--hud-red)' : '0 0 30px var(--hud-cyan-glow)'
           }}
         >
            <span style={{ color: isListening ? 'var(--hud-red)' : '#fff' }}>
              {isListening ? 'STOP' : 'OMEGA'}
            </span>
         </div>
      </div>
    </div>
  );
}
