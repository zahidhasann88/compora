import { usePlaygroundStore, type Styles } from '@/store/usePlaygroundStore';
import { CSSProperties, useState } from 'react';
import { Loader2, Search, Mail, Lock, User, Phone, Calendar, Eye, EyeOff, Check, X } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  search: Search, mail: Mail, lock: Lock, user: User,
  phone: Phone, calendar: Calendar, eye: Eye, eyeOff: EyeOff,
};

function getInputStyles(styles: Styles, props: Record<string, any>): CSSProperties {
  const inputVariant = props.inputVariant || 'outlined';
  const pad = Number(styles.padding) || 12;
  const radius = Number(styles.borderRadius) || 8;
  const borderW = Number(styles.borderWidth) || 1;
  const width = styles.width === 'auto' ? '100%' : `${styles.width}px`;
  const height = styles.height === 'auto' ? 'auto' : `${styles.height}px`;

  const base: CSSProperties = {
    fontSize: `${styles.fontSize}px`,
    fontWeight: props.inputFontWeight || '400',
    letterSpacing: styles.letterSpacing === 'normal' ? 'normal' : `${styles.letterSpacing}px`,
    textAlign: (props.textAlign || 'left') as any,
    outline: 'none',
    width,
    height,
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    flex: 1,
    minWidth: 0,
    background: 'transparent',
    border: 'none',
    color: styles.textColor,
    padding: `${pad}px`,
  };

  return base;
}

function getWrapperStyles(styles: Styles, props: Record<string, any>, isFocused: boolean): CSSProperties {
  const inputVariant = props.inputVariant || 'outlined';
  const radius = Number(styles.borderRadius) || 8;
  const borderW = Number(styles.borderWidth) || 1;
  const focusColor = props.focusRingColor || '#6366f1';
  const borderColor = props.errorState ? '#ef4444' : isFocused ? focusColor : styles.borderColor;
  const width = styles.width === 'auto' ? '320px' : `${styles.width}px`;

  const base: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width,
    maxWidth: '100%',
    transition: 'all 0.2s ease',
    position: 'relative',
  };

  switch (inputVariant) {
    case 'outlined':
      return {
        ...base,
        backgroundColor: styles.bgColor + '0d',
        borderRadius: `${radius}px`,
        border: `${borderW}px solid ${borderColor}`,
        boxShadow: isFocused ? `0 0 0 3px ${focusColor}25` : 'none',
      };
    case 'filled':
      return {
        ...base,
        backgroundColor: styles.bgColor + '1a',
        borderRadius: `${radius}px`,
        border: `${borderW}px solid transparent`,
        borderBottomColor: borderColor,
      };
    case 'underline':
      return {
        ...base,
        backgroundColor: 'transparent',
        borderRadius: 0,
        border: 'none',
        borderBottom: `${Math.max(borderW, 2)}px solid ${borderColor}`,
      };
    case 'unstyled':
      return {
        ...base,
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 0,
      };
    default:
      return base;
  }
}

export function InputPreview() {
  const { styles, componentProps } = usePlaygroundStore();
  const props = componentProps['input'] || {};
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(props.defaultValue || '');
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = props.disabled;
  const isReadOnly = props.readOnly;

  const hasLeftIcon = props.leftIcon && props.leftIcon !== 'none';
  const hasRightIcon = props.rightIcon && props.rightIcon !== 'none';
  const hasLeftAddon = props.leftAddon && props.leftAddon.length > 0;
  const hasRightAddon = props.rightAddon && props.rightAddon.length > 0;

  const LeftIcon = hasLeftIcon ? iconMap[props.leftIcon] : null;
  const RightIcon = hasRightIcon ? iconMap[props.rightIcon] : null;

  const inputType = props.inputType === 'password' && showPassword ? 'text' : (props.inputType || 'text');

  const addonStyle: CSSProperties = {
    padding: `${Number(styles.padding) || 12}px`,
    fontSize: `${styles.fontSize}px`,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--surface-hover)',
    color: 'var(--muted)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    borderColor: 'inherit',
  };

  return (
    <div className="animate-fade-in flex flex-col gap-1.5" style={{ width: styles.width === 'auto' ? '320px' : `${styles.width}px`, maxWidth: '100%' }}>
      {/* Label */}
      {props.label && (
        <label
          style={{
            fontSize: `${Math.max(Number(styles.fontSize) - 2, 11)}px`,
            fontWeight: 500,
            color: props.labelColor || '#e4e4e7',
          }}
        >
          {props.label}
          {props.required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        style={{
          ...getWrapperStyles(styles, props, isFocused),
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? 'not-allowed' : 'text',
        }}
      >
        {/* Left Addon */}
        {hasLeftAddon && (
          <div style={{
            ...addonStyle,
            borderRight: `1px solid ${styles.borderColor}33`,
            borderRadius: `${Number(styles.borderRadius) || 8}px 0 0 ${Number(styles.borderRadius) || 8}px`,
          }}>
            {props.leftAddon}
          </div>
        )}

        {/* Left Icon */}
        {LeftIcon && (
          <span style={{ display: 'flex', alignItems: 'center', paddingLeft: `${Number(styles.padding) || 12}px`, color: 'var(--muted)', flexShrink: 0 }}>
            <LeftIcon className="w-4 h-4" />
          </span>
        )}

        {/* Input */}
        <input
          type={inputType}
          placeholder={props.placeholder || 'Enter text...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={props.required}
          maxLength={props.charCount ? (props.maxLength || 100) : undefined}
          aria-label={props.ariaLabel || undefined}
          aria-describedby={props.ariaDescribedBy || undefined}
          tabIndex={props.tabIndex ?? 0}
          autoComplete={props.autocomplete || 'off'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            ...getInputStyles(styles, props),
            paddingLeft: LeftIcon ? '8px' : undefined,
            paddingRight: (RightIcon || props.loading || props.successState || props.clearButton || (props.inputType === 'password')) ? '8px' : undefined,
            cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'text',
          }}
          className="placeholder:text-muted/50"
        />

        {/* Loading Spinner */}
        {props.loading && (
          <span style={{ display: 'flex', alignItems: 'center', paddingRight: `${Number(styles.padding) || 12}px`, flexShrink: 0 }}>
            <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--muted)' }} />
          </span>
        )}

        {/* Success Check */}
        {props.successState && !props.loading && (
          <span style={{ display: 'flex', alignItems: 'center', paddingRight: `${Number(styles.padding) || 12}px`, flexShrink: 0, color: '#22c55e' }}>
            <Check className="w-4 h-4" />
          </span>
        )}

        {/* Clear Button */}
        {props.clearButton && inputValue.length > 0 && !props.loading && !props.successState && (
          <button
            onClick={() => setInputValue('')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              paddingRight: `${Number(styles.padding) || 12}px`,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--muted)', flexShrink: 0,
            }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Password Toggle */}
        {props.inputType === 'password' && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              paddingRight: `${Number(styles.padding) || 12}px`,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--muted)', flexShrink: 0,
            }}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {/* Right Icon */}
        {RightIcon && !props.loading && !props.successState && !(props.clearButton && inputValue.length > 0) && props.inputType !== 'password' && (
          <span style={{ display: 'flex', alignItems: 'center', paddingRight: `${Number(styles.padding) || 12}px`, color: 'var(--muted)', flexShrink: 0 }}>
            <RightIcon className="w-4 h-4" />
          </span>
        )}

        {/* Right Addon */}
        {hasRightAddon && (
          <div style={{
            ...addonStyle,
            borderLeft: `1px solid ${styles.borderColor}33`,
            borderRadius: `0 ${Number(styles.borderRadius) || 8}px ${Number(styles.borderRadius) || 8}px 0`,
          }}>
            {props.rightAddon}
          </div>
        )}
      </div>

      {/* Bottom row: helper/error text + character count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: props.helperText || props.errorState || props.charCount ? '16px' : '0' }}>
        <div style={{ flex: 1 }}>
          {/* Error Message */}
          {props.errorState && props.errorMessage && (
            <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>
              {props.errorMessage}
            </p>
          )}

          {/* Helper Text */}
          {!props.errorState && props.helperText && (
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
              {props.helperText}
            </p>
          )}
        </div>

        {/* Character Count */}
        {props.charCount && (
          <span style={{ fontSize: '11px', color: 'var(--muted)', flexShrink: 0, marginLeft: '8px' }}>
            {inputValue.length}/{props.maxLength || 100}
          </span>
        )}
      </div>
    </div>
  );
}
