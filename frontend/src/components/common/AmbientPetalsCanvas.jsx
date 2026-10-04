import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * AmbientPetalsCanvas
 * 
 * Renders an ethereal, ultra-lightweight floating petal & glowing particle
 * canvas in the background that elevates the entire FemTech aesthetic.
 */
export default function AmbientPetalsCanvas() {
  const canvasRef = useRef(null);
  const themeContext = useTheme();
  const activeTheme = themeContext?.theme || 'cherry-red';
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle Palette based on theme
    const getPalette = () => {
      if (activeTheme.includes('blue') || activeTheme.includes('sapphire')) {
        return ['rgba(147, 197, 253, 0.45)', 'rgba(186, 230, 253, 0.35)', 'rgba(56, 189, 248, 0.25)', 'rgba(255, 255, 255, 0.6)'];
      }
      if (activeTheme.includes('lavender') || activeTheme.includes('plum')) {
        return ['rgba(216, 180, 254, 0.45)', 'rgba(233, 213, 255, 0.4)', 'rgba(192, 132, 252, 0.25)', 'rgba(253, 244, 255, 0.6)'];
      }
      if (activeTheme.includes('sage')) {
        return ['rgba(167, 243, 208, 0.45)', 'rgba(187, 247, 208, 0.4)', 'rgba(110, 231, 183, 0.3)', 'rgba(255, 255, 255, 0.6)'];
      }
      // Default: Cherry Red / Rose / Crimson
      return ['rgba(254, 205, 211, 0.55)', 'rgba(253, 164, 175, 0.45)', 'rgba(244, 63, 94, 0.28)', 'rgba(255, 228, 230, 0.65)'];
    };

    const palette = getPalette();

    const particles = [];
    const PARTICLE_COUNT = Math.min(36, Math.floor(window.innerWidth / 40));

    class PetalParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -20;
        this.size = 5 + Math.random() * 8;
        this.speedY = 0.5 + Math.random() * 0.9;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.aspect = 0.4 + Math.random() * 0.4;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.02;
      }

      update() {
        this.wobble += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobble) * 0.5;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 25 || this.x < -30 || this.x > canvas.width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * this.aspect, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new PetalParticle());
    }

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [enabled, activeTheme]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8
      }}
    />
  );
}
