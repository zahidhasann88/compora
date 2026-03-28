import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getCardStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    maxWidth: '320px',
    width: '100%',
    transition: 'all 0.2s ease',
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

export function CardPreview() {
  const { styles, variant, theme, componentProps } = usePlaygroundStore();
  const props = componentProps['card'] || {};
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const descOpacity = isWhiteText && theme === 'light' ? 0.6 : 0.8;

  const shadowMap: Record<string, string> = {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  };
  const shadowStyle = shadowMap[props.shadow || 'md'];

  return (
    <div style={{...getCardStyles(styles, variant, theme), boxShadow: shadowStyle}} className="animate-fade-in">
      <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Card Title</h3>
      <p style={{ opacity: descOpacity, margin: 0 }}>
        This is a description for the card component.
      </p>
    </div>
  );
}
