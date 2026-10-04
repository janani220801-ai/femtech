import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import BrandWingsLogo from '../common/BrandWingsLogo';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem('femtech_splash_seen', 'true');
    } catch (e) {}
    if (onFinish) onFinish();
  }, [onFinish]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => handleFinish(), 150);
          return 100;
        }
        return prev + 6.25; // Completes in ~600ms
      });
    }, 35);

    return () => {
      clearInterval(timer);
    };
  }, [handleFinish]);

  return (
    <div
      onClick={handleFinish}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e6 50%, #f3e8ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '24px',
        cursor: 'pointer'
      }}
    >
      {/* Animated Empowered Woman with Freedom Wings Emblem */}
      <div className="animate-float" style={{
        position: 'relative',
        marginBottom: '28px'
      }}>
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
        marginBottom: '32px',
        lineHeight: '1.4'
      }}>
        “Your Health. Your Pattern. Your FemTech.”
      </p>

      {/* Progress Bar */}
      <div style={{
        width: '260px',
        height: '7px',
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '999px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '26px'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'var(--rose-gradient)',
          borderRadius: '999px',
          transition: 'width 0.05s ease-out'
        }} />
      </div>

      {/* Skip / Enter Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleFinish();
        }}
        className="btn-primary"
        style={{
          padding: '12px 32px',
          fontSize: '1.05rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 6px 20px rgba(225, 29, 72, 0.35)',
          cursor: 'pointer'
        }}
      >
        <span>உள்ளே செல் (Enter FemTech)</span>
        <ArrowRight size={20} />
      </button>

      <div style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '0.8rem',
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
