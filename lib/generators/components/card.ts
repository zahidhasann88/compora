import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateCardCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const shadowMap: Record<string, string> = {
    none: '',
    sm: ' shadow-sm',
    md: ' shadow-md',
    lg: ' shadow-lg',
    xl: ' shadow-xl'
  };
  const shadow = shadowMap[props.shadow || 'md'];
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize}${shadow}`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize}${shadow}`;
      break;
    case 'outline':
      classes = `bg-transparent ${textColor} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize}${shadow}`;
      break;
  }

  const descClass = isWhiteText ? 'text-slate-600 dark:text-slate-400' : 'opacity-80';

  return `<div className="${classes}">
  <h3 className="mb-2 font-semibold">
    Card Title
  </h3>
  <p className="${descClass}">
    This is a description for the card component.
  </p>
</div>`;
}
