import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getButtonStyles(styles: Styles, variant: Variant): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px ${Number(styles.padding) * 2}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
  };

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: styles.bgColor, color: styles.textColor };
    case 'secondary':
      return {
        ...base,
        backgroundColor: styles.bgColor + '33',
        color: styles.bgColor,
      };
    case 'outline':
      return {
        ...base,
        backgroundColor: 'transparent',
        color: styles.bgColor,
        border: `2px solid ${styles.bgColor}`,
      };
  }
}

export function ButtonPreview() {
  const { styles, variant, componentProps } = usePlaygroundStore();
  const props = componentProps['button'] || {};

  return (
    <button 
      style={{
        ...getButtonStyles(styles, variant),
        opacity: props.disabled ? 0.5 : 1,
        cursor: props.disabled ? 'not-allowed' : 'pointer'
      }} 
      disabled={props.disabled}
      className="animate-fade-in"
    >
      {props.text || 'Click me'}
    </button>
  );
}
