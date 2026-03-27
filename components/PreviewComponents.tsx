'use client';

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
        backgroundColor: styles.bgColor + '33', // slightly higher opacity for button secondary
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

function getAlertStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
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

export default function PreviewComponents() {
  const { selectedComponent, styles, variant, theme } = usePlaygroundStore();

  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const descOpacity = isWhiteText && theme === 'light' ? 0.6 : 0.8;

  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      {selectedComponent === 'button' && (
        <button style={getButtonStyles(styles, variant)} className="animate-fade-in">
          Click me
        </button>
      )}
      
      {selectedComponent === 'card' && (
        <div style={getCardStyles(styles, variant, theme)} className="animate-fade-in">
          <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Card Title</h3>
          <p style={{ opacity: descOpacity, margin: 0 }}>
            This is a description for the card component.
          </p>
        </div>
      )}
      
      {selectedComponent === 'input' && (
        <input
          type="text"
          placeholder="Type something..."
          style={getInputStyles(styles, variant, theme)}
          className="animate-fade-in"
        />
      )}
      
      {selectedComponent === 'badge' && (
        <span style={getBadgeStyles(styles, variant, theme)} className="animate-fade-in">
          Badge
        </span>
      )}
      
      {selectedComponent === 'avatar' && (
        <div style={getAvatarStyles(styles, variant, theme)} className="animate-fade-in">
          AB
        </div>
      )}
      
      {selectedComponent === 'select' && (
        <div className="relative w-full max-w-[320px] animate-fade-in">
          <select style={getSelectStyles(styles, variant, theme)}>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-50 text-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      )}

      {selectedComponent === 'checkbox' && (
        <label className="flex items-center gap-3 cursor-pointer group animate-fade-in">
          <div className="relative flex items-center justify-center">
            {/* Using inline styles to simulate peer-checked logic visually without full CSS peer setup */}
            <input 
              type="checkbox" 
              className="appearance-none w-6 h-6 border-2 outline-none transition-all cursor-pointer" 
              style={{
                borderColor: styles.bgColor,
                borderRadius: `${styles.borderRadius}px`,
                backgroundColor: 'transparent'
              }}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.backgroundColor = target.checked ? styles.bgColor : 'transparent';
                const svg = target.nextElementSibling as HTMLElement;
                svg.style.opacity = target.checked ? '1' : '0';
              }}
            />
            <svg 
              className="absolute w-4 h-4 text-white pointer-events-none transition-opacity opacity-0" 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span style={{ 
            color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor,
            fontWeight: 500
          }}>
            Accept Terms & Conditions
          </span>
        </label>
      )}

      {selectedComponent === 'alert' && (
        <div style={getAlertStyles(styles, variant, theme)} className="animate-fade-in">
          <div style={{ marginTop: '2px', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Information Update</h4>
            <p style={{ margin: 0, opacity: descOpacity, fontSize: '0.9em' }}>
              Please review the new features we added to the dashboard.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
