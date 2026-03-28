import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateModalCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);
  const activeBg = mapBgColor(styles.bgColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `bg-white dark:bg-slate-950 ${textColor} ${padding} ${radius}`;
      break;
    case 'secondary':
      classes = `bg-slate-50 dark:bg-slate-900 ${textColor} ${padding} ${radius}`;
      break;
    case 'outline':
      classes = `bg-white dark:bg-slate-950 border-2 ${mapBorderColor(styles.bgColor)} ${textColor} ${padding} ${radius}`;
      break;
  }

  const blurMap: Record<string, string> = {
    none: '',
    sm: ' backdrop-blur-sm',
    md: ' backdrop-blur-md'
  };
  const blur = blurMap[props.backdrop || 'sm'];

  return `<div className="fixed inset-0 bg-black/40${blur} flex items-center justify-center p-4 z-50">
  <div className="${classes} w-full max-w-md shadow-xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Modal Title</h3>
      <button className="opacity-50 hover:opacity-100 transition-opacity text-xl leading-none">&times;</button>
    </div>
    <p className="opacity-80 mb-6 text-sm">This is the modal body content. You can place forms or information here.</p>
    <div className="flex justify-end gap-3">
      <button className="px-4 py-2 rounded-md font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
      <button className="px-4 py-2 ${activeBg} text-white rounded-md font-medium text-sm hover:opacity-90 transition-opacity">Confirm</button>
    </div>
  </div>
</div>`;
}
