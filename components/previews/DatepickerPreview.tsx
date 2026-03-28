import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getDatepickerStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  return {
    borderRadius: `${styles.borderRadius}px`,
    padding: '12px',
    display: 'inline-block',
    border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme === 'dark' ? '#020617' : '#ffffff',
    color: textColor,
  };
}

export function DatepickerPreview() {
  const { styles, variant, theme } = usePlaygroundStore();

  return (
    <div className="animate-fade-in" style={getDatepickerStyles(styles, variant, theme)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, cursor: 'pointer' }}><path d="m15 18-6-6 6-6"/></svg>
        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>October 2026</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, cursor: 'pointer' }}><path d="m9 18 6-6-6-6"/></svg>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <th key={day} style={{ width: '36px', fontWeight: 400, fontSize: '0.8rem', color: theme === 'dark' ? '#94a3b8' : '#64748b', paddingBottom: '8px' }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {[27, 28, 29, 30].map(day => <td key={'prev'+day} style={{ textAlign: 'center', opacity: 0.3, fontSize: '0.875rem', height: '36px' }}>{day}</td>)}
            {[1, 2, 3].map(day => <td key={'cur'+day} style={{ textAlign: 'center', fontSize: '0.875rem', height: '36px' }}>{day}</td>)}
          </tr>
          <tr>
            {[4, 5, 6, 7, 8, 9].map(day => <td key={'cur'+day} style={{ textAlign: 'center', fontSize: '0.875rem', height: '36px' }}>{day}</td>)}
            <td style={{ 
              textAlign: 'center', fontSize: '0.875rem', height: '36px',
              backgroundColor: styles.bgColor, color: '#ffffff',
              borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`
            }}>10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
