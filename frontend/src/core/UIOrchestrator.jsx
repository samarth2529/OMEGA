import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const UIContext = createContext(null);

export const useUI = () => useContext(UIContext);

export function UIOrchestrator({ children }) {
  const [surfaces, setSurfaces] = useState([]);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const bringToFront = useCallback((id) => {
    setMaxZIndex(prev => {
      const nextZ = prev + 1;
      setSurfaces(current => 
        current.map(s => s.id === id ? { ...s, zIndex: nextZ } : s)
      );
      return nextZ;
    });
  }, []);

  const executeCommand = useCallback((cmd) => {
    if (!cmd || !cmd.command) return;

    switch (cmd.command) {
      case 'CREATE_SURFACE':
        setSurfaces(current => {
          const existingIdx = current.findIndex(s => s.type === cmd.type);
          if (existingIdx >= 0) {
            const updated = [...current];
            updated[existingIdx] = { 
              ...updated[existingIdx], 
              data: cmd.data || updated[existingIdx].data,
              title: cmd.title || updated[existingIdx].title
            };
            setTimeout(() => bringToFront(updated[existingIdx].id), 0);
            return updated;
          }
          
          // Responsive Workspace Layout Engine
          const count = current.length;
          const col = count % 2;
          const row = Math.floor(count / 2);
          
          const vWidth = window.innerWidth;
          const vHeight = window.innerHeight;
          
          // Fallback to simpler stacking on small screens
          const isMobile = vWidth < 768;
          const width = isMobile ? vWidth - 40 : 400;
          const height = 300;
          const gap = 20;
          
          const startX = isMobile ? 20 : Math.min(vWidth * 0.5, vWidth - 450);
          const startY = isMobile ? 100 : Math.max(100, vHeight * 0.15);
          
          return [...current, {
            id: Math.random().toString(36).substr(2, 9),
            type: cmd.type,
            title: cmd.title,
            data: cmd.data || {},
            position: { x: startX + (!isMobile ? col * (width + gap) : 0), y: startY + (row * (height + gap)) },
            size: { width, height },
            zIndex: maxZIndex + 1
          }];
        });
        setMaxZIndex(prev => prev + 1);
        break;

      case 'CLOSE_SURFACE':
        setSurfaces(current => current.filter(s => s.type !== cmd.type));
        break;

      case 'CLOSE_ALL_SURFACES':
        setSurfaces([]);
        break;

      default:
        console.warn('Unknown UI command:', cmd);
    }
  }, [bringToFront, maxZIndex]);

  return (
    <UIContext.Provider value={{ surfaces, executeCommand, bringToFront, setSurfaces }}>
      {children}
    </UIContext.Provider>
  );
}
