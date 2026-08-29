import React from 'react';

export default function HudPanel({ title, sysCode = "SYS.000", children, style }) {
  return (
    <div className="hud-panel" style={style}>
      <div className="hud-panel-header">
        <div className="hud-panel-title">{title}</div>
        <div className="hud-panel-sys">{sysCode}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
