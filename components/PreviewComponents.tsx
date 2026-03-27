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

function getModalStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  };
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: theme === 'dark' ? '#020617' : '#ffffff', color: textColor };
    case 'secondary':
      return { ...base, backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc', color: textColor };
    case 'outline':
      return { ...base, backgroundColor: theme === 'dark' ? '#020617' : '#ffffff', color: textColor, border: `2px solid ${styles.bgColor}` };
  }
}

function getToastStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  const base: CSSProperties = {
    padding: `${styles.padding}px`,
    borderRadius: `${styles.borderRadius}px`,
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: '24px',
    right: '24px',
  };
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText && theme === 'light' ? '#0f172a' : styles.textColor;

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: styles.bgColor, color: styles.textColor };
    case 'secondary':
      return { ...base, backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: textColor, border: `1px solid ${styles.bgColor}44` };
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
            <option style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Option 1</option>
            <option style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Option 2</option>
            <option style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Option 3</option>
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

      {selectedComponent === 'modal' && (
        <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
          <div style={getModalStyles(styles, variant, theme)}>
            <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontWeight: 600, fontSize: '1.125rem' }}>Modal Title</h3>
              <span style={{ opacity: 0.5, cursor: 'pointer', fontSize: '1.25rem' }}>&times;</span>
            </div>
            <p style={{ opacity: descOpacity, fontSize: '0.875rem', marginBottom: '24px' }}>
              This is the modal body content. You can place forms or information here.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                style={{ 
                  padding: '8px 16px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500,
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }}
              >
                Cancel
              </button>
              <button 
                style={{ 
                  padding: '8px 16px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500,
                  backgroundColor: styles.bgColor, color: '#ffffff'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedComponent === 'tabs' && (
        <div className="w-full max-w-[400px] animate-fade-in">
          <div style={{
            display: 'flex', padding: '4px', gap: '4px',
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderRadius: `${styles.borderRadius}px`
          }}>
            <div style={{
              flex: 1, padding: '6px 12px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 500,
              backgroundColor: styles.bgColor, color: '#ffffff',
              borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>Account</div>
            <div style={{
              flex: 1, padding: '6px 12px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 500,
              color: theme === 'dark' ? '#94a3b8' : '#475569',
              borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`
            }}>Password</div>
            <div style={{
              flex: 1, padding: '6px 12px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 500,
              color: theme === 'dark' ? '#94a3b8' : '#475569',
              borderRadius: `${Math.max(2, Number(styles.borderRadius) - 2)}px`
            }}>Settings</div>
          </div>
          <div style={{ padding: '16px', color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
            <h3 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Account Info</h3>
            <p style={{ margin: 0, opacity: descOpacity, fontSize: '0.875rem' }}>Make changes to your account here.</p>
          </div>
        </div>
      )}

      {selectedComponent === 'navbar' && (
        <div className="absolute top-0 left-0 w-full animate-fade-in border-b border-border/40" style={{
          backgroundColor: theme === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: `${Math.max(8, Number(styles.padding) / 2)}px ${styles.padding}px`,
            height: '56px', width: '100%', maxWidth: '1280px', margin: '0 auto'
          }}>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-bold" style={{ color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: styles.bgColor }}></div>
                Brand
              </div>
              <div className="hidden md:flex gap-4 text-sm font-medium" style={{ color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
                <span className="opacity-100">Products</span>
                <span className="opacity-60 hover:opacity-100 cursor-pointer">Pricing</span>
                <span className="opacity-60 hover:opacity-100 cursor-pointer">About</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center px-3 py-1.5 text-sm rounded-md border border-input opacity-60" style={{ width: '160px' }}>
                Search...
              </div>
              <button style={{
                padding: '6px 16px', borderRadius: `${styles.borderRadius}px`, fontSize: '0.875rem', fontWeight: 500,
                backgroundColor: styles.bgColor, color: '#ffffff'
              }}>Sign In</button>
            </div>
          </div>
        </div>
      )}

      {selectedComponent === 'toast' && (
        <div style={getToastStyles(styles, variant, theme)} className="animate-fade-in slide-in-from-bottom-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><path d="m18 15-6-6-6 6"/></svg>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 2px 0', fontWeight: 600, fontSize: '0.875rem' }}>Update available</h4>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>A new software version is ready.</p>
          </div>
          <span style={{ opacity: 0.5, cursor: 'pointer', flexShrink: 0 }}>&times;</span>
        </div>
      )}
    </div>
  );
}
