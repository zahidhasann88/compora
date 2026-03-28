import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapBgColor, mapTextColor } from '../tailwind';

export function generateCommandCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const activeBg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  return `<div className="flex w-full max-w-md flex-col overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-800 ${radius} shadow-md opacity-100 scale-100">
  <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-3">
    <svg className="mr-2 h-4 w-4 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    <input className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Type a command or search..." />
  </div>
  <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
    <div className="overflow-hidden p-1 text-slate-700 dark:text-slate-300">
      <div className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">Suggestions</div>
      <div className="relative flex cursor-default select-none items-center ${radius} px-2 py-1.5 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-800">
        Calendar
      </div>
      <div className="relative flex cursor-default select-none items-center ${radius} px-2 py-1.5 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-800">
        Search Emoji
      </div>
      <div className="relative flex cursor-default select-none items-center ${radius} px-2 py-1.5 text-sm outline-none bg-slate-100 dark:bg-slate-800">
        Calculator
      </div>
    </div>
  </div>
</div>`;
}
