import React, { createContext, useContext, useState, useEffect } from 'react';

const LiveDataContext = createContext(null);

export const useLiveData = () => useContext(LiveDataContext);

export function LiveDataProvider({ children, telemetryData }) {
  // telemetryData comes directly from the WebSocket in App.jsx
  
  const [data, setData] = useState({
    cpu: { value: 0, status: 'SYNCING' },
    ram: { value: 0, status: 'SYNCING' },
    disk: { value: 0, status: 'SYNCING' },
    network: { upload: 0, download: 0, status: 'SYNCING' },
    temperature: { status: 'UNAVAILABLE' },
    calendar: { status: 'NOT CONNECTED' },
    weather: { status: 'NOT CONNECTED' },
    notifications: { status: 'NOT CONNECTED' }
  });

  useEffect(() => {
    if (telemetryData) {
       setData(prev => ({ 
           ...prev, 
           cpu: { value: telemetryData.cpuUsage || 0, status: 'LIVE' },
           ram: { value: telemetryData.ramUsage || 0, status: 'LIVE' },
           disk: { value: telemetryData.ssdUsage || 0, status: 'LIVE' },
           gpu: { value: telemetryData.gpuUsage || 0, status: 'LIVE' },
           network: { upload: telemetryData.networkUp || 0, download: telemetryData.networkDown || 0, status: 'LIVE' }
       }));
    }
  }, [telemetryData]);

  return (
    <LiveDataContext.Provider value={data}>
      {children}
    </LiveDataContext.Provider>
  );
}

export function StatusIndicator({ status }) {
  let color = 'var(--hud-cyan-dim)';
  let dotColor = 'transparent';
  if (status === 'LIVE') { color = 'var(--hud-green)'; dotColor = 'var(--hud-green)'; }
  if (status === 'STALE') { color = '#ffdd00'; dotColor = '#ffdd00'; }
  if (status === 'OFFLINE' || status === 'UNAVAILABLE' || status === 'NOT CONNECTED') { color = 'var(--hud-red)'; }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-micro)', color, letterSpacing: '1px' }}>
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: dotColor, border: `1px solid ${color}` }}></div>
      {status}
    </div>
  );
}
