import React from 'react';
import SystemSurface from './SystemSurface';
import TerminalSurface from './TerminalSurface';
import VisionSurface from './VisionSurface';

export default function SurfaceRegistry({ type, data }) {
  switch (type) {
    case 'SYSTEM':
      return <SystemSurface data={data} />;
    case 'TERMINAL':
    case 'CODE':
      return <TerminalSurface data={data} />;
    case 'VISION':
    case 'CAMERA':
      return <VisionSurface data={data} />;
    default:
      return (
        <div style={{ padding: '10px', color: 'var(--hud-cyan-dim)', fontSize: '12px', wordBreak: 'break-all' }}>
          DATA STREAM:<br/>
          {JSON.stringify(data)}
        </div>
      );
  }
}
