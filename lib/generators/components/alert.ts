import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateAlertCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/10 ${textColor} ${padding} ${radius} ${fontSize} flex gap-4 w-full`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} flex gap-4 w-full`;
      break;
    case 'outline':
      classes = `bg-transparent border-2 ${mapBorderColor(styles.bgColor)} ${textColor} ${padding} ${radius} ${fontSize} flex gap-4 w-full`;
      break;
  }

  const descClass = isWhiteText ? 'text-slate-600 dark:text-slate-400' : 'opacity-80';

  return `<div className="${classes}" role="alert">
  <div className="shrink-0 mt-0.5">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  </div>
  <div className="flex-1">
    <h4 className="font-semibold mb-1">
      Information Update
    </h4>
    <p className="${descClass}">
      Please review the new features we added to the dashboard.
    </p>
  </div>
</div>`;
}
