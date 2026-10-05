import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * BrandWingsLogo / FemTechDynamicLogo
 * 
 * Supports user-requested distinct artworks:
 * 1. 'curl_knees': A girl hugging her knees tightly in self-care & comforting menstrual curl ("ஒரு பொண்ணு முட்டிய போட்டு கட்டிப் பிடிக்கிற மாதிரி, லெக்ஸ டைட்டா கட்டிப் பிடிப்பாங்கல்ல")
 * 2. 'heart': Vitality Pulse Heart for Sapphire Blue ("ப்ளூனா ஹார்ட்")
 * 3. 'pad': Sanitary Pad & Menstrual Care emblem with crimson droplet ("ஒண்ணா பேடு அந்த மாதிரி")
 * 4. 'wings': Empowered woman soaring with freedom wings
 * 5. 'lotus': Herbal lotus wellness & serene posture
 * 6. 'moon': Crescent moon & restorative slumber for Midnight Plum
 * 7. 'auto': Auto-adapts distinctly based on the active visual theme!
 */
export default function BrandWingsLogo({ size = 42, style = {}, className = '', variant = null, withGlow = true }) {
  let themeContext = null;
  try {
    themeContext = useTheme();
  } catch (e) {
    // Fallback if rendered outside ThemeProvider
  }

  const activeTheme = themeContext?.theme || 'cherry-red';
  const selectedStyle = themeContext?.logoStyle || 'auto';

  // Determine which artwork to render
  let activeVariant = variant || (selectedStyle !== 'auto' ? selectedStyle : null);
  if (!activeVariant) {
    switch (activeTheme) {
      case 'cherry-red':
        activeVariant = 'curl_knees'; // Girl hugging her knees with crimson comfort
        break;
      case 'ruby-crimson':
        activeVariant = 'curl_knees';
        break;
      case 'sapphire-blue':
        activeVariant = 'heart'; // Blue Heart
        break;
      case 'soft-pink':
        activeVariant = 'pad'; // Sanitary Pad & Menstrual Care
        break;
      case 'light-lavender':
        activeVariant = 'wings'; // Freedom Wings
        break;
      case 'soft-sage':
        activeVariant = 'lotus'; // Herbal Lotus
        break;
      case 'warm-peach':
        activeVariant = 'curl_knees'; // Warm comfort embrace
        break;
      case 'midnight-plum':
        activeVariant = 'moon'; // Moon slumber
        break;
      case 'onyx-black':
        activeVariant = 'wings'; // Radiant freedom wings in dark AMOLED
        break;
      case 'crimson-white':
      case 'whitish-red':
        activeVariant = 'curl_knees'; // Crimson comfort embrace
        break;
      case 'burgundy-wine':
        activeVariant = 'curl_knees'; // Deep velvet embrace
        break;
      case 'sunshine-yellow':
        activeVariant = 'lotus'; // Radiant vitality lotus
        break;
      case 'grey-pink':
        activeVariant = 'wings'; // Elegant freedom wings
        break;
      case 'plain-grey':
        activeVariant = 'heart'; // Minimalist pulse
        break;
      case 'grey-red':
        activeVariant = 'wings'; // High contrast courage wings
        break;
      case 'custom-palette':
        activeVariant = 'curl_knees';
        break;
      case 'emerald-gold':
        activeVariant = 'lotus'; // Royal herbal lotus
        break;
      case 'rose-gold':
        activeVariant = 'wings'; // Sunset golden wings
        break;
      default:
        activeVariant = 'curl_knees';
    }
  }

  const dimension = typeof size === 'number' ? `${size}px` : size;

  // Background gradient per theme
  const getGradient = () => {
    switch (activeTheme) {
      case 'cherry-red':
        return 'linear-gradient(135deg, #e11d48 0%, #be123c 50%, #881337 100%)';
      case 'ruby-crimson':
        return 'linear-gradient(135deg, #be123c 0%, #990024 50%, #580015 100%)';
      case 'whitish-red':
      case 'crimson-white':
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)';
      case 'burgundy-wine':
        return 'linear-gradient(135deg, #9f1239 0%, #700b2b 50%, #4c0519 100%)';
      case 'sunshine-yellow':
        return 'linear-gradient(135deg, #facc15 0%, #eab308 50%, #b45309 100%)';
      case 'grey-pink':
        return 'linear-gradient(135deg, #64748b 0%, #ec4899 50%, #be185d 100%)';
      case 'plain-grey':
        return 'linear-gradient(135deg, #64748b 0%, #475569 50%, #1e293b 100%)';
      case 'grey-red':
        return 'linear-gradient(135deg, #475569 0%, #dc2626 50%, #991b1b 100%)';
      case 'custom-palette':
        return 'var(--rose-gradient)';
      case 'sapphire-blue':
        return 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0369a1 100%)';
      case 'soft-pink':
        return 'linear-gradient(135deg, #fb7185 0%, #e11d48 50%, #be123c 100%)';
      case 'light-lavender':
        return 'linear-gradient(135deg, #c084fc 0%, #8b5cf6 50%, #7c3aed 100%)';
      case 'soft-sage':
        return 'linear-gradient(135deg, #34d399 0%, #059669 50%, #065f46 100%)';
      case 'warm-peach':
        return 'linear-gradient(135deg, #fb923c 0%, #ea580c 50%, #c2410c 100%)';
      case 'midnight-plum':
        return 'linear-gradient(135deg, #a855f7 0%, #7e22ce 50%, #3b0764 100%)';
      case 'onyx-black':
        return 'linear-gradient(135deg, #27272a 0%, #18181b 50%, #09090b 100%)';
      case 'emerald-gold':
        return 'linear-gradient(135deg, #10b981 0%, #059669 50%, #064e3b 100%)';
      case 'rose-gold':
        return 'linear-gradient(135deg, #fb7185 0%, #f43f5e 50%, #d97706 100%)';
      default:
        return 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #881337 100%)';
    }
  };

  return (
    <div
      className={`femtech-dynamic-logo ${className}`}
      style={{
        width: dimension,
        height: dimension,
        minWidth: dimension,
        minHeight: dimension,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: getGradient(),
        boxShadow: withGlow ? '0 6px 18px rgba(0, 0, 0, 0.22)' : 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style
      }}
      title={`FemTech Emblem - ${activeVariant}`}
    >
      {/* 1. GIRL HUGGING KNEES (Comfort / Self-Care Pose) */}
      {activeVariant === 'curl_knees' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '82%', height: '82%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          <defs>
            <linearGradient id="bodySkin" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fff1f2" />
              <stop offset="100%" stopColor="#fecdd3" />
            </linearGradient>
            <linearGradient id="hairGlow" x1="20" y1="20" x2="40" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="auraGlow" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Gentle Protective Aura Circle */}
          <circle cx="50" cy="50" r="42" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />

          {/* Head bowed gently towards her bent knees */}
          <circle cx="39" cy="30" r="7.5" fill="url(#bodySkin)" />

          {/* Flowing hair cascading down her back */}
          <path
            d="M 33 28
               C 28 32, 22 42, 21 56
               C 24 50, 28 44, 34 38 Z"
            fill="url(#hairGlow)"
            opacity="0.9"
          />

          {/* Curved Back silhouette sitting down */}
          <path
            d="M 34 36
               C 27 42, 23 54, 25 68
               C 27 74, 33 78, 42 78
               L 48 78
               C 38 78, 32 72, 30 65
               C 29 55, 33 45, 38 38 Z"
            fill="url(#bodySkin)"
          />

          {/* Bent Legs / Knees drawn tightly up to her chest */}
          {/* Thigh rising from hip up to knee */}
          <path
            d="M 32 68
               C 36 60, 48 48, 62 44
               C 69 42, 73 46, 71 52
               C 68 59, 58 70, 52 78
               C 44 80, 36 78, 32 68 Z"
            fill="url(#bodySkin)"
          />

          {/* Arms wrapping tightly and lovingly around her knees/shins */}
          <path
            d="M 37 42
               C 42 46, 52 46, 68 49
               C 72 50, 72 58, 66 60
               C 56 61, 46 59, 39 48 Z"
            fill="url(#bodySkin)"
            opacity="0.95"
          />

          {/* Clasping hands hugging shins */}
          <circle cx="68" cy="54" r="3.5" fill="#ffffff" />

          {/* Gentle heart floating inside the embrace (Self-love / Cramp relief) */}
          <path
            d="M 49 46
               C 49 42, 44 39, 41 42
               C 38 45, 41 50, 49 55
               C 57 50, 60 45, 57 42
               C 54 39, 49 42, 49 46 Z"
            fill="#ffffff"
            opacity="0.9"
          />

          {/* Soothing Comfort Stars */}
          <circle cx="78" cy="24" r="1.5" fill="#fef08a" />
          <circle cx="20" cy="24" r="1.2" fill="#ffffff" />
          <circle cx="76" cy="72" r="1.5" fill="#ffffff" opacity="0.8" />
        </svg>
      )}

      {/* 2. SAPPHIRE BLUE VITALITY PULSE HEART */}
      {activeVariant === 'heart' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '80%', height: '80%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          <defs>
            <linearGradient id="heartGrad" x1="15" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>

          {/* Radiant Heart Base */}
          <path
            d="M 50 82
               C 42 74, 18 54, 18 34
               C 18 20, 30 14, 40 18
               C 46 21, 48 26, 50 28
               C 52 26, 54 21, 60 18
               C 70 14, 82 20, 82 34
               C 82 54, 58 74, 50 82 Z"
            fill="url(#heartGrad)"
            opacity="0.95"
          />

          {/* Heart Rhythm / ECG Vital Pulse Line */}
          <path
            d="M 24 45
               L 36 45
               L 42 33
               L 48 57
               L 53 38
               L 58 48
               L 64 45
               L 76 45"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing pulse dots */}
          <circle cx="48" cy="57" r="2" fill="#ffffff" />
          <circle cx="53" cy="38" r="2" fill="#ffffff" />
        </svg>
      )}

      {/* 3. SANITARY PAD & MENSTRUAL CARE EMBLEM */}
      {activeVariant === 'pad' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '82%', height: '82%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          <defs>
            <linearGradient id="padGrad" x1="30" y1="15" x2="70" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffe4e6" />
            </linearGradient>
            <linearGradient id="dropGrad" x1="50" y1="36" x2="50" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>

          {/* Outer Soft Wellness Wings / Pad Silhouette */}
          <path
            d="M 50 14
               C 62 14, 68 24, 66 38
               C 78 38, 86 44, 86 50
               C 86 56, 78 62, 66 62
               C 68 76, 62 86, 50 86
               C 38 86, 32 76, 34 62
               C 22 62, 14 56, 14 50
               C 14 44, 22 38, 34 38
               C 32 24, 38 14, 50 14 Z"
            fill="url(#padGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
          />

          {/* Inner Contoured Absorption Core */}
          <rect x="42" y="22" width="16" height="56" rx="8" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1" strokeDasharray="2 2" />

          {/* Central Loving Crimson Droplet (Sacred & Healthy Menstruation) */}
          <path
            d="M 50 38
               C 50 38, 41 50, 41 55
               C 41 60, 45 64, 50 64
               C 55 64, 59 60, 59 55
               C 59 50, 50 38, 50 38 Z"
            fill="url(#dropGrad)"
          />

          {/* Droplet Light Reflection */}
          <circle cx="47" cy="52" r="1.5" fill="#ffffff" opacity="0.9" />

          {/* Gentle Floral Care Dots */}
          <circle cx="50" cy="28" r="1.5" fill="#fb7185" />
          <circle cx="50" cy="72" r="1.5" fill="#fb7185" />
        </svg>
      )}

      {/* 4. EMPOWERED WOMAN WITH FREEDOM WINGS */}
      {activeVariant === 'wings' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '84%', height: '84%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}>
          <defs>
            <linearGradient id="wingGlow" x1="20" y1="20" x2="80" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Left Wing */}
          <path
            d="M 46 36
               C 38 24, 25 12, 12 18
               C 6 22, 8 32, 16 38
               C 10 42, 12 50, 20 54
               C 16 58, 20 66, 30 68
               C 38 70, 44 56, 46 44 Z"
            fill="url(#wingGlow)"
            opacity="0.95"
          />

          {/* Right Wing */}
          <path
            d="M 54 36
               C 62 24, 75 12, 88 18
               C 94 22, 92 32, 84 38
               C 90 42, 88 50, 80 54
               C 84 58, 80 66, 70 68
               C 62 70, 56 56, 54 44 Z"
            fill="url(#wingGlow)"
            opacity="0.95"
          />

          {/* Head & Halo */}
          <circle cx="50" cy="22" r="5" fill="#ffffff" />
          <circle cx="50" cy="22" r="7" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.8" />

          {/* Outstretched Arms */}
          <path d="M 48 31 C 42 27, 34 22, 28 17 C 29 20, 36 28, 46 34 Z" fill="#ffffff" />
          <path d="M 52 31 C 58 27, 66 22, 72 17 C 71 20, 64 28, 54 34 Z" fill="#ffffff" />

          {/* Soaring Body Dress */}
          <path
            d="M 47 30 Q 50 31 53 30 L 54 44 C 56 54, 60 68, 58 84 C 55 86, 52 82, 50 74 C 48 82, 45 86, 42 84 C 40 68, 44 54, 46 44 Z"
            fill="#ffffff"
          />
        </svg>
      )}

      {/* 5. HERBAL LOTUS WELLNESS */}
      {activeVariant === 'lotus' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '80%', height: '80%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}>
          {/* Central Lotus Petal */}
          <path
            d="M 50 20
               C 42 34, 40 54, 50 72
               C 60 54, 58 34, 50 20 Z"
            fill="#ffffff"
          />
          {/* Left Petal */}
          <path
            d="M 50 72
               C 34 66, 18 52, 22 36
               C 28 36, 40 48, 50 72 Z"
            fill="#ffffff"
            opacity="0.88"
          />
          {/* Right Petal */}
          <path
            d="M 50 72
               C 66 66, 82 52, 78 36
               C 72 36, 60 48, 50 72 Z"
            fill="#ffffff"
            opacity="0.88"
          />
          {/* Lower Floating Base Leaves */}
          <path
            d="M 16 68
               C 34 76, 66 76, 84 68
               C 74 82, 26 82, 16 68 Z"
            fill="#a7f3d0"
            opacity="0.9"
          />
          {/* Meditating Center Glow */}
          <circle cx="50" cy="46" r="3.5" fill="#fef08a" />
        </svg>
      )}

      {/* 6. CRESCENT MOON & RESTORATIVE SLUMBER */}
      {activeVariant === 'moon' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '80%', height: '80%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          {/* Golden Crescent Moon */}
          <path
            d="M 64 16
               C 38 16, 20 34, 20 60
               C 20 78, 32 86, 44 88
               C 30 78, 30 46, 52 32
               C 60 26, 70 26, 76 28
               C 74 20, 70 16, 64 16 Z"
            fill="#fef08a"
          />
          {/* Sleeping Girl Head Resting in the Moon Cusp */}
          <circle cx="52" cy="48" r="6" fill="#ffffff" />
          {/* Peaceful closed eye arc */}
          <path d="M 49 48 Q 52 50 55 48" stroke="#7e22ce" strokeWidth="0.8" strokeLinecap="round" />
          {/* Flowing slumber hair */}
          <path d="M 48 44 C 40 48, 38 60, 42 70" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          {/* Restorative Night Stars */}
          <circle cx="72" cy="42" r="1.8" fill="#ffffff" />
          <circle cx="78" cy="62" r="1.5" fill="#fef08a" />
          <circle cx="36" cy="24" r="1.2" fill="#ffffff" />
        </svg>
      )}

      {/* 7. FLUTTER BUTTERFLY (Rebirth, Vitality & Transformation) */}
      {activeVariant === 'butterfly' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-butterfly" style={{ width: '84%', height: '84%', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.22))' }}>
          <defs>
            <linearGradient id="bfWingLeft" x1="10" y1="15" x2="50" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <linearGradient id="bfWingRight" x1="90" y1="15" x2="50" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <linearGradient id="bfLower" x1="30" y1="50" x2="50" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Left Forewing */}
          <path
            d="M 49 46
               C 42 36, 26 14, 12 24
               C 2 32, 8 50, 22 56
               C 32 60, 44 54, 49 46 Z"
            fill="url(#bfWingLeft)"
            opacity="0.95"
          />
          <path
            d="M 45 44
               C 38 36, 26 22, 16 30
               C 12 34, 16 46, 26 50
               C 34 52, 42 48, 45 44 Z"
            fill="#ffffff"
            opacity="0.75"
          />

          {/* Right Forewing */}
          <path
            d="M 51 46
               C 58 36, 74 14, 88 24
               C 98 32, 92 50, 78 56
               C 68 60, 56 54, 51 46 Z"
            fill="url(#bfWingRight)"
            opacity="0.95"
          />
          <path
            d="M 55 44
               C 62 36, 74 22, 84 30
               C 88 34, 84 46, 74 50
               C 66 52, 58 48, 55 44 Z"
            fill="#ffffff"
            opacity="0.75"
          />

          {/* Left Hindwing */}
          <path
            d="M 48 52
               C 38 52, 18 58, 20 74
               C 22 84, 38 86, 44 76
               C 47 70, 48 60, 48 52 Z"
            fill="url(#bfLower)"
            opacity="0.9"
          />

          {/* Right Hindwing */}
          <path
            d="M 52 52
               C 62 52, 82 58, 80 74
               C 78 84, 62 86, 56 76
               C 53 70, 52 60, 52 52 Z"
            fill="url(#bfLower)"
            opacity="0.9"
          />

          {/* Slender Butterfly Body */}
          <ellipse cx="50" cy="56" rx="2.5" ry="16" fill="#ffffff" />

          {/* Head */}
          <circle cx="50" cy="38" r="3.5" fill="#ffffff" />

          {/* Curled Antennae */}
          <path
            d="M 49 36
               C 47 30, 41 24, 35 22
               C 33 21, 33 25, 36 26"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="34" cy="22" r="1.2" fill="#fef08a" />

          <path
            d="M 51 36
               C 53 30, 59 24, 65 22
               C 67 21, 67 25, 64 26"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="66" cy="22" r="1.2" fill="#fef08a" />

          {/* Sparkles / Golden Pollen Dots */}
          <circle cx="50" cy="18" r="1.2" fill="#fef08a" />
          <circle cx="15" cy="18" r="1" fill="#ffffff" />
          <circle cx="85" cy="18" r="1" fill="#ffffff" />
          <circle cx="16" cy="80" r="1" fill="#fef08a" />
          <circle cx="84" cy="80" r="1" fill="#fef08a" />
        </svg>
      )}
    </div>
  );
}
