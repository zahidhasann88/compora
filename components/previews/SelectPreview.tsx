import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getSelectStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    outline: 'none',
    width: '100%',
    maxWidth: '320px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    appearance: 'none',
    cursor: 'pointer',
  };
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: styles.bgColor + '0d', color: textColor, border: `1px solid ${styles.bgColor}44` };
    case 'secondary':
      return { ...base, backgroundColor: styles.bgColor + '1a', color: textColor, border: `1px solid ${styles.bgColor}33` };
    case 'outline':
      return { ...base, backgroundColor: 'transparent', color: textColor, border: `2px solid ${styles.bgColor}` };
  }
}

export function SelectPreview() {
  const { styles, variant, theme } = usePlaygroundStore();

  return (
    <div className="relative w-full max-w-[320px] animate-fade-in">
      <select style={getSelectStyles(styles, variant, theme)}>
        <option style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Option 1</option>
        <option style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Option 2</option>
        <option style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Option 3</option>
      </select>
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-50 text-foreground">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
}
