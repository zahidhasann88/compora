import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getDropdownStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;
  
  return {
    borderRadius: `${styles.borderRadius}px`,
    width: '224px',
    border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme === 'dark' ? '#020617' : '#ffffff',
    color: textColor,
  };
}

export function DropdownPreview() {
  const { styles, variant, theme } = usePlaygroundStore();
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <button style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: '36px', padding: '0 16px', fontSize: '0.875rem', fontWeight: 500,
        borderRadius: `${styles.borderRadius}px`,
        border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`,
        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
        color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor,
        marginBottom: '8px'
      }}>
        Options
        <svg style={{ marginLeft: '8px', opacity: 0.5 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div style={getDropdownStyles(styles, variant, theme)}>
        <div style={{ padding: '4px' }}>
          <div style={{ padding: '8px', fontSize: '0.875rem', borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`, cursor: 'pointer', opacity: 0.9 }}>Edit</div>
          <div style={{ padding: '8px', fontSize: '0.875rem', borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`, cursor: 'pointer', opacity: 0.9 }}>Duplicate</div>
        </div>
        <div style={{ borderTop: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`, padding: '4px' }}>
          <div style={{ padding: '8px', fontSize: '0.875rem', borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`, cursor: 'pointer', color: theme === 'dark' ? '#f87171' : '#dc2626' }}>Delete</div>
        </div>
      </div>
    </div>
  );
}
