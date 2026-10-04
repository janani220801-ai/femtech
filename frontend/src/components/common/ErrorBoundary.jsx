import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FemTech Application Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    try {
      sessionStorage.removeItem('femtech_splash_seen');
      sessionStorage.removeItem('femtech_just_logged_out');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e6 50%, #f3e8ff 100%)',
          padding: '24px',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '36px 28px',
            border: '2px solid rgba(251, 113, 133, 0.35)',
            boxShadow: '0 20px 50px rgba(244, 63, 94, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(220, 38, 38, 0.2)'
            }}>
              <AlertCircle size={32} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#881337', margin: '0 0 10px 0' }}>
              ஏதோ பிழை ஏற்பட்டது (An Error Occurred)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
              பயன்பாட்டை மீண்டும் துவங்க கீழே உள்ள பொத்தானை அழுத்தவும். உங்கள் தரவுகள் பாதுகாப்பாக உள்ளன.
            </p>

            <button
              onClick={this.handleReload}
              className="btn-primary"
              style={{
                padding: '12px 28px',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '0.96rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                border: 'none',
                background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                color: 'white',
                boxShadow: '0 6px 18px rgba(225, 29, 72, 0.35)'
              }}
            >
              <RefreshCw size={18} />
              <span>மீண்டும் தொடங்கு (Reload FemTech)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
