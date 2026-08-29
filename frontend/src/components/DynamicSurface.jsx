import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useUI } from '../core/UIOrchestrator';

export default function DynamicSurface({ surface, children }) {
  const { bringToFront, setSurfaces } = useUI();
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimatingIn(false), 500); // Cinematic open duration
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSurfaces(prev => prev.filter(s => s.id !== surface.id));
    }, 400); // Wait for cinematic close animation
  };

  const handleDragStop = (e, d) => {
    setSurfaces(prev => prev.map(s => s.id === surface.id ? { ...s, position: { x: d.x, y: d.y } } : s));
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    setSurfaces(prev => prev.map(s => s.id === surface.id ? {
      ...s,
      size: { width: ref.style.width, height: ref.style.height },
      position
    } : s));
  };

  let animationClass = isAnimatingIn ? 'surface-animating-in' : '';
  if (isClosing) animationClass = 'surface-closing';

  return (
    <Rnd
      size={{ width: surface.size.width, height: surface.size.height }}
      position={{ x: surface.position.x, y: surface.position.y }}
      onDragStart={() => bringToFront(surface.id)}
      onDragStop={handleDragStop}
      onResizeStart={() => bringToFront(surface.id)}
      onResizeStop={handleResizeStop}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="surface-header"
      style={{ zIndex: surface.zIndex }}
      className={`dynamic-surface ${animationClass}`}
    >
      <div className="surface-content-wrapper">
        <div className="surface-header">
          <div className="surface-title">{surface.title}</div>
          <button className="surface-close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="surface-body">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
