import React from 'react';
import ModuleContainer from './ModuleContainer';
import { useLiveData } from '../core/LiveDataProvider';

export default function Notifications() {
  const { notifications } = useLiveData();
  return (
    <ModuleContainer title="NOTIFICATIONS" icon="🔔" sysCode="SYS.88" status={notifications.status}>
       <div style={{ color: 'var(--hud-cyan-dim)', fontStyle: 'italic', padding: '20px 0', textAlign: 'center', fontSize: 'var(--text-sm)' }}>
          NO LIVE NOTIFICATIONS<br/>AVAILABLE
       </div>
    </ModuleContainer>
  );
}
