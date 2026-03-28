import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapBgColor, mapTextColor } from '../tailwind';

export function generateTabsCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const activeBg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  return `<div className="w-full max-w-md">
  <div className="flex p-1 gap-1 bg-slate-100 dark:bg-slate-800/50 ${radius}">
    <button className="flex-1 py-1.5 px-3 ${activeBg} text-white shadow-sm ${radius} font-medium text-sm transition-all">Account</button>
    <button className="flex-1 py-1.5 px-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all rounded-md">Password</button>
    <button className="flex-1 py-1.5 px-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all rounded-md">Settings</button>
  </div>
  <div className="p-4 mt-2 ${textColor}">
    <h3 className="font-semibold mb-1">Account Info</h3>
    <p className="text-sm opacity-80">Make changes to your account here.</p>
  </div>
</div>`;
}
