import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getBadgeStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${Math.max(4, Number(styles.padding) / 2)}px ${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export function BadgePreview() {
  const { styles, variant, theme, componentProps } = usePlaygroundStore();
  const props = componentProps['badge'] || {};
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';

  return (
    <span style={getBadgeStyles(styles, variant, theme)} className="animate-fade-in">
      {props.showDot && (
        <span style={{ 
          width: '6px', height: '6px', borderRadius: '50%', marginRight: '6px',
          backgroundColor: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor 
        }}></span>
      )}
      Badge
    </span>
  );
}
