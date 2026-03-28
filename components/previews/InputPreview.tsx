import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getInputStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    outline: 'none',
    width: '100%',
    maxWidth: '320px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
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

export function InputPreview() {
  const { styles, variant, theme, componentProps } = usePlaygroundStore();
  const props = componentProps['input'] || {};

  return (
    <input
      type="text"
      placeholder={props.placeholder || 'Type something...'}
      disabled={props.disabled}
      style={{
        ...getInputStyles(styles, variant, theme),
        opacity: props.disabled ? 0.5 : 1,
        cursor: props.disabled ? 'not-allowed' : 'text'
      }}
      className="animate-fade-in"
    />
  );
}
