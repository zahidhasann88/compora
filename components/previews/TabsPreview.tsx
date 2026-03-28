import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function TabsPreview() {
  const { styles, theme } = usePlaygroundStore();
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const descOpacity = isWhiteText && theme === 'light' ? 0.6 : 0.8;

  return (
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
  );
}
