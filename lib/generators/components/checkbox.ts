import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateCheckboxCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);
  const activeBg = mapBgColor(styles.bgColor);
  const activeBorder = mapBorderColor(styles.bgColor);

  return `<label className="flex items-center gap-3 cursor-pointer group">
  <div className="relative flex items-center justify-center">
    <input 
      type="checkbox" 
      className="peer appearance-none w-6 h-6 border-2 \${activeBorder} \${radius} checked:\${activeBg} bg-transparent transition-all outline-none" 
    />
    <svg 
      className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
  <span className="\${textColor} font-medium select-none">
    Accept Terms & Conditions
  </span>
</label>`;
}
