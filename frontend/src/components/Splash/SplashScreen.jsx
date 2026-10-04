import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import BrandWingsLogo from '../common/BrandWingsLogo';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish(), 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e6 50%, #f3e8ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '24px'
    }}>
      {/* Animated Empowered Woman with Freedom Wings Emblem */}
      <div className="animate-float" style={{
        position: 'relative',
        marginBottom: '32px'
      }}>
        {/* Pulsing ring */}
        <div className="animate-glow" style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: '50%',
          border: '2px solid rgba(220, 38, 38, 0.4)'
        }} />
        <BrandWingsLogo size={120} />
      </div>

      {/* Brand Title */}
      <h1 style={{
        fontSize: '3.2rem',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '8px',
        letterSpacing: '-0.02em'
      }}>
        FemTech
      </h1>

      {/* Tagline */}
      <p style={{
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#881337',
        textAlign: 'center',
        maxWidth: '480px',
        marginBottom: '40px',
        lineHeight: '1.4'
      }}>
        “Your Health. Your Pattern. Your FemTech.”
      </p>

      {/* Progress Bar */}
      <div style={{
        width: '260px',
        height: '6px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '999px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '28px'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'var(--rose-gradient)',
          borderRadius: '999px',
          transition: 'width 0.1s linear'
        }} />
      </div>

      {/* Skip / Enter Button */}
      <button
        onClick={onFinish}
        className="btn-primary"
        style={{
          padding: '12px 28px',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>Enter FemTech</span>
        <ArrowRight size={18} />
      </button>

      <div style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <Sparkles size={14} color="#f43f5e" />
        <span>AI-IoT Women’s Health & Wellness Platform</span>
      </div>
    </div>
  );
}
