import React from 'react';
import ModuleContainer from './ModuleContainer';

export default function VoiceMatrix({ isListening, voiceStatus }) {
  return (
    <ModuleContainer title="VOICE MATRIX" icon="🗣️" sysCode="SYS.069">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
         <div>
            <div style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)', letterSpacing: '1px' }}>SYSTEM STATUS</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: isListening ? '#fff' : 'var(--hud-cyan-dim)', textShadow: isListening ? '0 0 5px #fff' : 'none' }}>
               {isListening ? voiceStatus : 'AWAITING...'}
            </div>
         </div>
         <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)', letterSpacing: '1px' }}>WAKE WORD</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--hud-cyan)' }}>OMEGA</div>
         </div>
         
         {/* Hardware Mic Button */}
         <div style={{ 
            width: '40px', height: '40px', 
            border: `1px solid ${isListening ? 'var(--hud-red)' : 'var(--hud-cyan-dim)'}`,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: isListening ? 'var(--hud-red)' : 'var(--hud-cyan)',
            clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
            background: isListening ? 'rgba(255, 34, 85, 0.2)' : 'rgba(0, 85, 119, 0.2)'
         }}>🎤</div>
      </div>
      
      {/* Dense Spectrum Analyzer */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '1px', overflow: 'hidden', borderBottom: '1px solid var(--hud-cyan-dim)' }}>
         {[...Array(60)].map((_, i) => (
            <div key={i} style={{ 
                flex: 1, 
                background: isListening ? 'var(--hud-cyan)' : 'var(--hud-cyan-dim)', 
                height: `${isListening ? 10 + Math.random() * 90 : 10}%`,
                transition: 'height 0.1s ease-in-out',
                opacity: isListening ? 1 : 0.4
            }}></div>
         ))}
      </div>
      <div style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)', marginTop: '4px', textAlign: 'center', letterSpacing: '2px' }}>
         FREQ // 20Hz - 20kHz
      </div>
    </ModuleContainer>
  );
}
