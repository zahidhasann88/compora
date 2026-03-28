import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getAlertStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  };
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: styles.bgColor + '1a', color: textColor, border: 'none' };
    case 'secondary':
      return { ...base, backgroundColor: styles.bgColor + '0d', color: textColor, border: 'none' };
    case 'outline':
      return { ...base, backgroundColor: 'transparent', color: textColor, border: `2px solid ${styles.bgColor}` };
  }
}

export function AlertPreview() {
  const { styles, variant, theme } = usePlaygroundStore();
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const descOpacity = isWhiteText && theme === 'light' ? 0.6 : 0.8;

  return (
    <div style={getAlertStyles(styles, variant, theme)} className="animate-fade-in">
      <div style={{ marginTop: '2px', flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div>
        <h4 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Information Update</h4>
        <p style={{ margin: 0, opacity: descOpacity, fontSize: '0.9em' }}>
          Please review the new features we added to the dashboard.
        </p>
      </div>
    </div>
  );
}
