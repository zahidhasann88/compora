import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getCommandStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  return {
    borderRadius: `${styles.borderRadius}px`,
    width: '100%',
    maxWidth: '400px',
    border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: theme === 'dark' ? '#020617' : '#ffffff',
    color: textColor,
  };
}

export function CommandPreview() {
  const { styles, variant, theme } = usePlaygroundStore();

  return (
    <div style={getCommandStyles(styles, variant, theme)} className="animate-fade-in">
      <div style={{ 
        display: 'flex', alignItems: 'center', padding: '0 12px',
        borderBottom: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginRight: '8px' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" placeholder="Type a command or search..." style={{
          flex: 1, height: '44px', background: 'transparent', border: 'none', outline: 'none',
          fontSize: '0.875rem', color: 'inherit'
        }} readOnly />
      </div>
      <div style={{ padding: '4px', maxHeight: '300px', overflowY: 'auto' }}>
        <div style={{ padding: '8px 8px 4px 8px', fontSize: '0.75rem', fontWeight: 500, color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Suggestions</div>
        <div style={{ padding: '8px', fontSize: '0.875rem', borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`, cursor: 'pointer', opacity: 0.9 }}>Calendar</div>
        <div style={{ padding: '8px', fontSize: '0.875rem', borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`, cursor: 'pointer', opacity: 0.9 }}>Search Emoji</div>
        <div style={{ 
          padding: '8px', fontSize: '0.875rem', borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`, cursor: 'pointer',
          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
        }}>Calculator</div>
      </div>
    </div>
  );
}
