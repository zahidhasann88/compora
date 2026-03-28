import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateToastCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const padding = mapPadding(styles.padding);
  const bg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${bg} text-white`;
      break;
    case 'secondary':
      classes = `bg-white dark:bg-slate-900 border ${mapBorderColor(styles.bgColor)} ${textColor}`;
      break;
    case 'outline':
      classes = `bg-transparent border-2 ${mapBorderColor(styles.bgColor)} ${textColor}`;
      break;
  }

  return `<div className="fixed bottom-4 right-4 ${classes} ${padding} ${radius} shadow-lg flex items-center gap-3 min-w-[300px] animate-in slide-in-from-bottom-5 z-50">
  <svg className="w-5 h-5 opacity-80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <div className="flex-1">
    <h3 className="font-semibold text-sm">Update available</h3>
    <p className="text-sm opacity-90">A new software version is ready.</p>
  </div>
  <button className="opacity-70 hover:opacity-100 transition-opacity shrink-0">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>`;
}
