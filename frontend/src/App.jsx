import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import { OmegaSocket } from './lib/socket';
import { UIOrchestrator, useUI } from './core/UIOrchestrator';
import DynamicSurface from './components/DynamicSurface';
import SurfaceRegistry from './surfaces/SurfaceRegistry';
import { LiveDataProvider } from './core/LiveDataProvider';

// Import all Modules
import OmegaCore from './components/OmegaCore';
import SystemStatus from './modules/SystemStatus';
import NeuralNetwork from './modules/NeuralNetwork';
import VoiceMatrix from './modules/VoiceMatrix';
import CommandTerminal from './modules/CommandTerminal';
import SecurityGrid from './modules/SecurityGrid';
import HolographicEarth from './modules/HolographicEarth';
import AiBrainMap from './modules/AiBrainMap';
import Calendar from './modules/Calendar';
import Weather from './modules/Weather';
import Notifications from './modules/Notifications';
import RealTimeAnalytics from './modules/RealTimeAnalytics';
import BottomDock from './modules/BottomDock';
import SystemPower from './modules/SystemPower';

function CommandCenter() {
  const { surfaces, executeCommand } = useUI();
  
  const [status, setStatus] = useState('offline');
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('IDLE');
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [telemetryData, setTelemetryData] = useState(null);
  const socketRef = useRef(null);

  const logToTerminal = (msg) => {
     setTerminalLogs(prev => {
        const newLogs = [...prev, msg];
        if (newLogs.length > 20) newLogs.shift();
        return newLogs;
     });
  };

  const audioQueue = useRef([]);
  const isPlaying = useRef(false);

  const playNextAudio = () => {
      if (audioQueue.current.length === 0) {
          isPlaying.current = false;
          return;
      }
      isPlaying.current = true;
      const base64Audio = audioQueue.current.shift();
      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
      audio.onended = () => playNextAudio();
      audio.onerror = () => playNextAudio();
      audio.play().catch(e => {
          console.error("Audio playback error:", e);
          playNextAudio();
      });
  };

  useEffect(() => {
    socketRef.current = new OmegaSocket('ws://127.0.0.1:8000/ws', (msg) => {
      if (msg.type === 'status') {
        setStatus(msg.data);
      } else if (msg.type === 'message') {
        try {
          const payload = JSON.parse(msg.data);
          if (payload.type === 'SYSTEM_METRICS') {
             setTelemetryData(payload.data);
          } else if (payload.type === 'STATUS_UPDATE') {
             setVoiceStatus(payload.status);
             if (payload.status === 'LISTENING' || payload.status === 'SPEAKING') {
                 setIsListening(true);
             } else if (payload.status === 'IDLE') {
                 setIsListening(false);
             }
          } else if (payload.type === 'TRANSCRIPT_UPDATE') {
             logToTerminal(payload.text);
          } else if (payload.type === 'text') {
             logToTerminal(`OMEGA: ${payload.data}`);
          } else if (payload.type === 'audio') {
             audioQueue.current.push(payload.data);
             if (!isPlaying.current) {
                 playNextAudio();
             }
          } else if (payload.type === 'ui_command') {
             executeCommand(payload.data);
             logToTerminal(`EXECUTING UI_COMMAND: ${payload.data.command}`);
          }
        } catch(e) {}
      }
    });

    return () => {
      if (socketRef.current && socketRef.current.socket) socketRef.current.socket.close();
    };
  }, []);

  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.lang = 'en-US';
      rec.interimResults = false;
      
      rec.onstart = () => {
        setIsListening(true);
        setVoiceStatus('LISTENING');
      };
      
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        logToTerminal(`USER: ${transcript}`);
        if (socketRef.current && socketRef.current.socket.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ type: 'text', data: transcript }));
        }
      };
      
      rec.onerror = (event) => {
        logToTerminal(`MIC ERROR: ${event.error}`);
        setIsListening(false);
        setVoiceStatus('IDLE');
      };
      
      rec.onend = () => {
        setIsListening(false);
        setVoiceStatus('IDLE');
      };
      
      setRecognition(rec);
    }
  }, []);

  const toggleMic = () => {
    if (isListening && recognition) {
      recognition.stop();
      setIsListening(false);
      setVoiceStatus('IDLE');
    } else if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        logToTerminal(`MIC START ERROR: ${e}`);
      }
    } else {
      logToTerminal("Speech recognition not supported in this browser.");
    }
  };

  return (
    <LiveDataProvider telemetryData={telemetryData}>
      {/* FULL COMMAND CENTER GRID */}
      <div className="command-center">
        
        {/* HEADER */}
        <div className="cc-header">
           <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '8px' }}>O M E G A</div>
           <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '4px' }}>17:45:12</div>
              <div style={{ fontSize: '9px', color: 'var(--hud-cyan-dim)' }}>SATURDAY, MAY 31, 2090</div>
           </div>
           <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ textAlign: 'right', fontSize: '10px', color: 'var(--hud-cyan-dim)' }}>
                 <div>USER</div>
                 <div style={{ color: '#fff', fontSize: '12px' }}>ADMIN</div>
              </div>
              <div style={{ width: '30px', height: '30px', border: '1px solid var(--hud-cyan)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>👤</div>
           </div>
        </div>

        {/* LEFT COLUMN */}
        <div className="cc-left">
           <SystemStatus />
           <NeuralNetwork />
           <VoiceMatrix isListening={isListening} voiceStatus={voiceStatus} />
           <CommandTerminal logs={terminalLogs} />
           <SecurityGrid />
        </div>

        {/* CENTER COLUMN */}
        <div className="cc-center">
           <div className="center-top-nav">
              <div className="nav-item active"><span className="nav-icon">◎</span>CORE</div>
              <div className="nav-item"><span className="nav-icon">⚙</span>SYSTEM</div>
              <div className="nav-item"><span className="nav-icon">🌐</span>NETWORK</div>
              <div className="nav-item"><span className="nav-icon">🧠</span>AI</div>
              <div className="nav-item"><span className="nav-icon">📊</span>DATA</div>
              <div className="nav-item"><span className="nav-icon">▶</span>MEDIA</div>
              <div className="nav-item"><span className="nav-icon">🛠</span>TOOLS</div>
              <div className="nav-item"><span className="nav-icon">⚙️</span>SETTINGS</div>
           </div>

           <OmegaCore voiceStatus={voiceStatus} status={status} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="cc-right">
           <HolographicEarth />
           <AiBrainMap />
           <Calendar />
           <Weather />
           <Notifications />
        </div>

        {/* BOTTOM ROW */}
        <div className="cc-bottom">
           <RealTimeAnalytics />
           <BottomDock onMicToggle={toggleMic} isListening={isListening} />
           <SystemPower />
        </div>

      </div>

      {/* DYNAMIC SURFACES LAYER */}
      <div className="dynamic-surface-layer">
        {surfaces.map(s => (
          <DynamicSurface key={s.id} surface={s}>
            <SurfaceRegistry type={s.type} data={s.data} />
          </DynamicSurface>
        ))}
      </div>
    </LiveDataProvider>
  );
}

export default function App() {
  return (
    <UIOrchestrator>
      <CommandCenter />
    </UIOrchestrator>
  );
}
