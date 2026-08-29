import React from 'react';
import ModuleContainer from './ModuleContainer';
import { useLiveData } from '../core/LiveDataProvider';

export default function Weather() {
  const { weather } = useLiveData();
  return (
    <ModuleContainer title="WEATHER" icon="☁️" sysCode="SYS.311" status={weather.status}>
       <div style={{ color: 'var(--hud-cyan-dim)', fontStyle: 'italic', padding: '20px 0', textAlign: 'center', fontSize: 'var(--text-sm)' }}>
          WEATHER DATA SOURCE<br/>UNAVAILABLE
       </div>
    </ModuleContainer>
  );
}
