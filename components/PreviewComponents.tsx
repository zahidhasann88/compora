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

export default function PreviewComponents() {
  const { selectedComponent, styles, variant, theme } = usePlaygroundStore();

  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const descOpacity = isWhiteText && theme === 'light' ? 0.6 : 0.8;

  return (
    <div className="flex items-center justify-center min-h-[200px]">
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
    </div>
  );
}
