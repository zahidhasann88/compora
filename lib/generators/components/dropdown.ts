import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapBgColor, mapTextColor } from '../tailwind';

export function generateDropdownCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const activeBg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  return `<div className="relative inline-block text-left">
  <button className="inline-flex items-center justify-center ${radius} font-medium transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 h-9 px-4 py-2 ${textColor}">
    Options
    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
  </button>
  <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 ${radius} shadow-lg outline-none z-50">
    <div className="px-1 py-1">
      <button className="group flex w-full items-center ${radius} px-2 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
        Edit
      </button>
      <button className="group flex w-full items-center ${radius} px-2 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
        Duplicate
      </button>
    </div>
    <div className="px-1 py-1">
      <button className="group flex w-full items-center ${radius} px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50">
        Delete
      </button>
    </div>
  </div>
</div>`;
}
