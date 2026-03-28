import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getToastStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: '24px',
    right: '24px',
  };
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: styles.bgColor, color: styles.textColor };
    case 'secondary':
      return { ...base, backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: textColor, border: `1px solid ${styles.bgColor}44` };
    case 'outline':
      return { ...base, backgroundColor: 'transparent', color: textColor, border: `2px solid ${styles.bgColor}` };
  }
}

export function ToastPreview() {
  const { styles, variant, theme } = usePlaygroundStore();

  return (
    <div style={getToastStyles(styles, variant, theme)} className="animate-fade-in slide-in-from-bottom-2">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><path d="m18 15-6-6-6 6"/></svg>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 2px 0', fontWeight: 600, fontSize: '0.875rem' }}>Update available</h4>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>A new software version is ready.</p>
      </div>
      <span style={{ opacity: 0.5, cursor: 'pointer', flexShrink: 0 }}>&times;</span>
    </div>
  );
}
