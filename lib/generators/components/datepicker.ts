import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapBgColor, mapTextColor } from '../tailwind';

export function generateDatepickerCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const activeBg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  return `<div className="w-auto p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 ${radius} shadow-md inline-block">
  <div className="flex flex-col space-y-4">
    <div className="space-y-4">
      <div className="flex justify-center pt-1 relative items-center">
        <button className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 outline-none">
           <svg className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="font-medium text-sm ${textColor}">October 2026</div>
        <button className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 outline-none">
           <svg className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <table className="w-full border-collapse space-y-1">
        <thead>
          <tr className="flex">
            <th className="text-slate-500 rounded-md w-9 font-normal text-[0.8rem]">Su</th>
            <th className="text-slate-500 rounded-md w-9 font-normal text-[0.8rem]">Mo</th>
            <th className="text-slate-500 rounded-md w-9 font-normal text-[0.8rem]">Tu</th>
            <th className="text-slate-500 rounded-md w-9 font-normal text-[0.8rem]">We</th>
            <th className="text-slate-500 rounded-md w-9 font-normal text-[0.8rem]">Th</th>
            <th className="text-slate-500 rounded-md w-9 font-normal text-[0.8rem]">Fr</th>
            <th className="text-slate-500 rounded-md w-9 font-normal text-[0.8rem]">Sa</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1 mt-2">
          <tr className="flex w-full mt-2">
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center opacity-50">27</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center opacity-50">28</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center opacity-50">29</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center opacity-50">30</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">1</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">2</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">3</div></td>
          </tr>
          <tr className="flex w-full">
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">4</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">5</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">6</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">7</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">8</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${radius} cursor-pointer transition-colors ${textColor}">9</div></td>
            <td className="h-9 w-9 text-center text-sm p-0"><div className="w-9 h-9 flex items-center justify-center ${activeBg} text-white ${radius} cursor-pointer shadow-sm">10</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`;
}
