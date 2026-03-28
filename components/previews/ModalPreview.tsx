import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

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

export function ModalPreview() {
  const { styles, variant, theme, componentProps } = usePlaygroundStore();
  const props = componentProps['modal'] || {};
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const descOpacity = isWhiteText && theme === 'light' ? 0.6 : 0.8;

  const blurMap: Record<string, string> = {
    none: 'none',
    sm: 'blur(4px)',
    md: 'blur(8px)'
  };
  const backdropColor = theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';

  return (
    <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div style={{
        position: 'absolute', inset: 0, 
        backgroundColor: backdropColor,
        backdropFilter: blurMap[props.backdrop || 'sm']
      }}></div>
      
      <div style={{...getModalStyles(styles, variant, theme), position: 'relative', zIndex: 10}}>
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
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: theme === 'dark' ? '#fff' : '#000', border: 'none'
            }}
          >
            Cancel
          </button>
          <button 
            style={{ 
              padding: '8px 16px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500,
              backgroundColor: styles.bgColor, color: '#ffffff', border: 'none'
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
