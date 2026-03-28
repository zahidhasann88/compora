import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties, useState } from 'react';
import { Loader2, ArrowRight, ArrowLeft, Search, Plus, Trash, Download, Edit, Check, X } from 'lucide-react';

function getButtonStyles(styles: Styles, variant: Variant, props: Record<string, any>): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px ${Number(styles.padding) * 2}px`,
    borderRadius: props.pillShape ? '9999px' : `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    fontWeight: styles.fontWeight || 600,
    letterSpacing: styles.letterSpacing === 'normal' ? 'normal' : `${styles.letterSpacing}px`,
    borderWidth: `${styles.borderWidth}px`,
    borderColor: styles.borderColor,
    borderStyle: 'solid',
    cursor: 'pointer',
    transition: props.transition !== false ? 'all 0.2s ease' : 'none',
    width: props.fullWidth ? '100%' : styles.width === 'auto' ? 'auto' : `${styles.width}px`,
    height: styles.height === 'auto' ? 'auto' : `${styles.height}px`,
    gap: `${styles.gap}px`,
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
      };
    case 'ghost':
      return {
        ...base,
        backgroundColor: 'transparent',
        color: styles.bgColor,
        borderWidth: '0px',
      };
    case 'destructive':
      return {
        ...base,
        backgroundColor: '#ef4444',
        color: '#ffffff',
        borderColor: '#ef4444',
      };
    case 'link':
      return {
        ...base,
        backgroundColor: 'transparent',
        color: styles.bgColor,
        borderWidth: '0px',
        padding: '0',
        textDecoration: 'underline',
      };
    default:
      return base;
  }
}

export function ButtonPreview() {
  const { styles, variant, componentProps } = usePlaygroundStore();
  const props = componentProps['button'] || {};
  const [isHovered, setIsHovered] = useState(false);

  const isLoading = props.loading;
  const isDisabled = props.disabled || isLoading;

  const disabledOverrides: CSSProperties = isDisabled ? {
    backgroundColor: (variant === 'outline' || variant === 'ghost' || variant === 'link') ? 'transparent' : 'var(--surface-hover)',
    color: 'var(--muted)',
    borderColor: (variant === 'outline') ? 'var(--border-color)' : 'transparent',
    cursor: 'not-allowed',
    opacity: 0.7,
  } : {};

  const getShadow = () => {
    switch (props.shadowPreset) {
      case 'sm': return `0 1px 2px 0 ${styles.boxShadowColor}1a`;
      case 'md': return `0 4px 6px -1px ${styles.boxShadowColor}1a`;
      case 'lg': return `0 10px 15px -3px ${styles.boxShadowColor}1a`;
      case 'xl': return `0 20px 25px -5px ${styles.boxShadowColor}1a`;
      default: return 'none';
    }
  };

  const IconComponent = () => {
    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;

    switch (props.icon) {
      case 'search': return <Search className="w-4 h-4" />;
      case 'plus': return <Plus className="w-4 h-4" />;
      case 'trash': return <Trash className="w-4 h-4" />;
      case 'download': return <Download className="w-4 h-4" />;
      case 'edit': return <Edit className="w-4 h-4" />;
      case 'check': return <Check className="w-4 h-4" />;
      case 'x': return <X className="w-4 h-4" />;
      case 'arrowRight': return <ArrowRight className="w-4 h-4" />;
      case 'arrowLeft': return <ArrowLeft className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleAction = () => {
    switch (props.onClickAction) {
      case 'console':
        console.log('Button clicked!');
        break;
      case 'toast':
        alert('Toast: Button clicked!');
        break;
      case 'increment':
        console.log('Counter incremented (mock)');
        break;
      case 'copy':
        navigator.clipboard.writeText('Copied from playground');
        break;
    }
  };

  let hoverStyle: CSSProperties = {};
  if (isHovered && !isDisabled && variant !== 'link') {
    hoverStyle = { backgroundColor: styles.hoverBgColor };
  }

  return (
    <button
      type={props.buttonType || 'button'}
      aria-label={props.ariaLabel || undefined}
      onClick={handleAction}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...getButtonStyles(styles, variant, props),
        boxShadow: getShadow(),
        ...disabledOverrides,
        ...hoverStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: props.iconPosition === 'right' ? 'row-reverse' : 'row',
        gap: `${styles.gap || 8}px`,
      }}
      disabled={isDisabled}
      className="animate-fade-in"
    >
      {(props.icon && props.icon !== 'none') || isLoading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          <IconComponent />
        </span>
      ) : null}
      <span>{props.text || 'Click me'}</span>
    </button>
  );
}
