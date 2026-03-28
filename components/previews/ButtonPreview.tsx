import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

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

  const isLoading = props.loading;
  const isDisabled = props.disabled || isLoading;

  const disabledOverrides: CSSProperties = isDisabled ? {
    backgroundColor: variant === 'outline' ? 'transparent' : 'var(--surface-hover)',
    color: 'var(--muted)',
    border: variant === 'outline' ? '2px solid var(--border-color)' : 'none',
  } : {};

  return (
    <button 
      style={{
        ...getButtonStyles(styles, variant),
        ...disabledOverrides,
        opacity: isDisabled ? 0.7 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        width: props.fullWidth ? '100%' : undefined,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }} 
      disabled={isDisabled}
      className="animate-fade-in"
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && props.withIcon && <ArrowRight className="w-4 h-4" />}
      {props.text || 'Click me'}
    </button>
  );
}
