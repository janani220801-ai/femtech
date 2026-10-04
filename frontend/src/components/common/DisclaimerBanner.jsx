import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function DisclaimerBanner({ customText }) {
  return (
    <div style={{
      background: 'rgba(255, 241, 242, 0.75)',
      border: '1px solid var(--pink-200)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      margin: '16px 0',
      fontSize: '0.82rem',
      lineHeight: '1.5',
      color: '#9f1239'
    }}>
      <ShieldCheck size={20} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <strong style={{ display: 'block', marginBottom: '2px', color: '#be123c' }}>
          Important Medical Safety Notice:
        </strong>
        {customText ||
          'FemTech provides health education, wellness tracking, and personalized insights based on information supplied by the user. FemTech does not provide medical diagnosis and does not replace professional medical advice, clinical examination, laboratory testing, or emergency medical care.'}
      </div>
    </div>
  );
}
