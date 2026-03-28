import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function NavbarPreview() {
  const { styles, theme, componentProps } = usePlaygroundStore();
  const props = componentProps['navbar'] || {};
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';

  const isTransparent = props.transparent;
  const isSticky = props.sticky;
  
  let navBg = theme === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  let navFilter = 'blur(8px)';
  let navBorder = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  if (isTransparent) {
    navBg = 'transparent';
    navFilter = 'none';
    navBorder = 'transparent';
  }

  const positioning = isSticky 
    ? { position: 'sticky' as const, top: 0, zIndex: 50, left: 0 } 
    : { position: 'absolute' as const, top: 0, left: 0 };

  return (
    <div className="w-full animate-fade-in" style={{
      ...positioning,
      borderBottom: `1px solid ${navBorder}`,
      backgroundColor: navBg,
      backdropFilter: navFilter
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${Math.max(8, Number(styles.padding) / 2)}px ${styles.padding}px`,
        height: '56px', width: '100%', maxWidth: '1280px', margin: '0 auto'
      }}>
        <div className="flex items-center">
          {props.mobileMenu && (
            <>
              <button className="md:hidden mr-4 p-2 -ml-2" style={{ color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <div className="md:hidden flex items-center gap-2 font-bold mr-6" style={{ color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: styles.bgColor }}></div>
                Brand
              </div>
            </>
          )}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 font-bold" style={{ color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: styles.bgColor }}></div>
              Brand
            </div>
            <div className="flex gap-4 text-sm font-medium" style={{ color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
              <span className="opacity-100">Products</span>
              <span className="opacity-60 hover:opacity-100 cursor-pointer">Pricing</span>
              <span className="opacity-60 hover:opacity-100 cursor-pointer">About</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:space-x-2 md:justify-end">
          <div className="hidden md:flex items-center px-3 py-1.5 text-sm rounded-md border border-input opacity-60 w-full md:w-auto" style={{ width: '160px' }}>
            Search...
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '6px 16px', borderRadius: `${styles.borderRadius}px`, fontSize: '0.875rem', fontWeight: 500,
            backgroundColor: styles.bgColor, color: '#ffffff', border: 'none', height: '36px'
          }}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
