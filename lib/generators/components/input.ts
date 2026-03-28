import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateInputCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const disabledStr = props.disabled ? ' opacity-50 cursor-not-allowed' : '';
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/30 outline-none w-full focus:${mapBorderColor(styles.bgColor)} transition-colors${disabledStr}`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/20 outline-none w-full focus:${mapBorderColor(styles.bgColor)} transition-colors${disabledStr}`;
      break;
    case 'outline':
      classes = `bg-transparent ${textColor} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} outline-none w-full transition-colors focus:${mapBorderColor(styles.bgColor)}${disabledStr}`;
      break;
  }

  const placeholder = props.placeholder || 'Type something...';
  const attr = props.disabled ? '\n  disabled' : '';

  return `<input\n  type="text"\n  placeholder="${placeholder}"${attr}\n  className="${classes}"\n/>`;
}
