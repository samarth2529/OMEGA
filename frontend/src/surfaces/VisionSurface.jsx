import React from 'react';

export default function VisionSurface({ data }) {
  const objects = data?.objects || [];
  const image = data?.image || null;
  
  return (
    <div style={{ padding: '10px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {image ? (
          <div style={{ flex: 1, backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', border: '1px solid var(--hud-cyan-dim)', marginBottom: '10px' }}></div>
      ) : (
          <div style={{ flex: 1, border: '1px solid var(--hud-cyan-dim)', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--hud-cyan-dim)' }}>AWAITING SENSOR DATA</div>
      )}
      
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>DETECTED ENTITIES</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', overflowY: 'auto', maxHeight: '100px' }}>
         {objects.map((obj, i) => (
             <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                <span style={{ color: 'var(--hud-cyan)' }}>{obj.label}</span>
                <span style={{ color: 'var(--hud-magenta)' }}>{obj.confidence}%</span>
             </div>
         ))}
         {objects.length === 0 && <div style={{ fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>No entities listed.</div>}
      </div>
    </div>
  );
}
