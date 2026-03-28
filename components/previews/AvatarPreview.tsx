import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getAvatarStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    textTransform: 'uppercase',
  };
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: styles.bgColor, color: styles.textColor };
    case 'secondary':
      return { ...base, backgroundColor: styles.bgColor + '33', color: textColor };
    case 'outline':
      return { ...base, backgroundColor: 'transparent', color: textColor, border: `2px solid ${styles.bgColor}` };
  }
}

export function AvatarPreview() {
  const { styles, variant, theme } = usePlaygroundStore();

  return (
    <div style={getAvatarStyles(styles, variant, theme)} className="animate-fade-in">
      AB
    </div>
  );
}
