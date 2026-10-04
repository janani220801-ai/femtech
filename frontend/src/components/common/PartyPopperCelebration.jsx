import React, { useEffect, useState } from 'react';

export default function PartyPopperCelebration({ active, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Generate 45 vibrant celebratory confetti pieces (hearts, stars, petals, sparkling gems)
    const shapes = ['🌸', '✨', '💖', '🎉', '🌟', '🌺', '✨', '🎈'];
    const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6', '#10b981', '#fb7185', '#e11d48', '#fbbf24'];

    const newParticles = Array.from({ length: 45 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 45 + (Math.random() - 0.5) * 0.5;
      const distance = 80 + Math.random() * 220;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 80; // slightly upward bias like a party popper
      const rot = (Math.random() - 0.5) * 720;
      const size = 14 + Math.random() * 18;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 0.15;
      const duration = 1.2 + Math.random() * 0.9;

      return { id: i, tx, ty, rot, size, shape, color, delay, duration };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Central celebration pop text banner */}
      <div style={{
        animation: 'partyPopperPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e6 50%, #ffffff 100%)',
        border: '2px solid #fda4af',
        boxShadow: '0 12px 40px rgba(225, 29, 72, 0.35)',
        padding: '16px 28px',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#be123c',
        fontWeight: 800,
        fontSize: '1.25rem',
        textShadow: '0 2px 8px rgba(244, 63, 94, 0.2)'
      }}>
        <span style={{ fontSize: '1.6rem' }}>🎉</span>
        <span>FemTech Celebration! 🌸</span>
        <span style={{ fontSize: '1.6rem' }}>✨</span>
      </div>

      {/* Confetti particles bursting outwards */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            fontSize: `${p.size}px`,
            color: p.color,
            animation: `confettiBurst ${p.duration}s cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}s forwards`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--rot': `${p.rot}deg`
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}
