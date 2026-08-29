import React from 'react';
import ModuleContainer from './ModuleContainer';
import { useLiveData } from '../core/LiveDataProvider';

export default function Calendar() {
  const { calendar } = useLiveData();
  return (
    <ModuleContainer title="CALENDAR" icon="📅" sysCode="SYS.600" status={calendar.status}>
       <div style={{ color: 'var(--hud-cyan-dim)', fontStyle: 'italic', padding: '20px 0', textAlign: 'center', fontSize: 'var(--text-sm)' }}>
          EXTERNAL CALENDAR API<br/>NOT CONNECTED
       </div>
    </ModuleContainer>
  );
}
