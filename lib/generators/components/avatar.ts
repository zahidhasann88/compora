import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateAvatarCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${mapBgColor(styles.bgColor)} ${mapTextColor(styles.textColor)} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center w-12 h-12 uppercase shrink-0 transition-colors`;
      break;
    case 'secondary':
      classes = `${mapBgColor(styles.bgColor)}/20 ${mapTextColor(styles.bgColor)} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center w-12 h-12 uppercase shrink-0 transition-colors`;
      break;
    case 'outline':
      classes = `bg-transparent ${mapTextColor(styles.bgColor)} border-2 ${mapBorderColor(styles.bgColor)} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center w-12 h-12 uppercase shrink-0 transition-colors`;
      break;
  }

  return `<div className="${classes}">\n  AB\n</div>`;
}
