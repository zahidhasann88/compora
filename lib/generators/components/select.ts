import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateSelectCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/30 outline-none w-full appearance-none focus:${mapBorderColor(styles.bgColor)} transition-colors`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/20 outline-none w-full appearance-none focus:${mapBorderColor(styles.bgColor)} transition-colors`;
      break;
    case 'outline':
      classes = `bg-transparent ${textColor} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} outline-none appearance-none w-full transition-colors focus:${mapBorderColor(styles.bgColor)}`;
      break;
  }

  // Adding a custom dropdown arrow with a background image would be too long, using an icon wrapper in JSX is common
  return `<div className="relative w-full">
  <select className="${classes}">
    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Option 1</option>
    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Option 2</option>
    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Option 3</option>
  </select>
  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-50">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </div>
</div>`;
}
