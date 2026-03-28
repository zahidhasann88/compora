import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPaddingXY, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateBadgeCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const radius = mapBorderRadius(styles.borderRadius);
  // Default to a smaller font for badge if not huge
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPaddingXY(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${mapBgColor(styles.bgColor)} ${mapTextColor(styles.textColor)} ${padding} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center transition-colors gap-1.5`;
      break;
    case 'secondary':
      classes = `${mapBgColor(styles.bgColor)}/20 ${mapTextColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center transition-colors gap-1.5`;
      break;
    case 'outline':
      classes = `bg-transparent ${mapTextColor(styles.bgColor)} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center transition-colors gap-1.5`;
      break;
  }

  if (props.showDot) {
    return `<span className="${classes}">\n  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>\n  Badge\n</span>`;
  }

  return `<span className="${classes}">\n  Badge\n</span>`;
}
