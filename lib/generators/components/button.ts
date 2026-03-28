import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPaddingXY, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateButtonCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPaddingXY(styles.padding);
  
  const disabledStr = props.disabled ? ' opacity-50 cursor-not-allowed' : '';

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${mapBgColor(styles.bgColor)} ${mapTextColor(styles.textColor)} ${padding} ${radius} ${fontSize} font-semibold transition-colors hover:opacity-90${disabledStr}`;
      break;
    case 'secondary':
      classes = `${mapBgColor(styles.bgColor)}/20 ${mapTextColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold transition-colors hover:opacity-80${disabledStr}`;
      break;
    case 'outline':
      classes = `bg-transparent ${mapTextColor(styles.bgColor)} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold transition-colors hover:${mapBgColor(styles.bgColor).replace('bg-', 'bg-')}/10${disabledStr}`;
      break;
  }

  const text = props.text || 'Click me';
  const attr = props.disabled ? '\n  disabled' : '';

  return `<button\n  className="${classes}"${attr}\n>\n  ${text}\n</button>`;
}
