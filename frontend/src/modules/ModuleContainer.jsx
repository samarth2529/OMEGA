import React from 'react';
import { StatusIndicator } from '../core/LiveDataProvider';

export default function ModuleContainer({ title, icon, sysCode, children, style, status }) {
  return (
    <div className="module-container" style={style}>
      <div className="module-inner">
        <div className="module-header">
          <div className="module-title">
            {icon && <span className="module-icon">{icon}</span>}
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {status && <StatusIndicator status={status} />}
            <div className="module-syscode">{sysCode}</div>
          </div>
        </div>
        <div className="module-content">
          {children}
        </div>
      </div>
    </div>
  );
}
