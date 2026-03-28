import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function CheckboxPreview() {
  const { styles, theme } = usePlaygroundStore();
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';

  return (
    <label className="flex items-center gap-3 cursor-pointer group animate-fade-in">
      <div className="relative flex items-center justify-center">
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
  );
}
