import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapTextColor, mapBorderColor } from '../tailwind';

export function generateTableCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);
  const borderColor = mapBorderColor(styles.bgColor);

  const hoverClass = props.hoverable ? ' transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50' : '';
  const bodyHoverClass = props.hoverable ? ' transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50' : '';
  const stripeClass = (props.striped ?? true) ? ' bg-slate-50/50 dark:bg-slate-800/20' : '';

  return `<div className="w-full overflow-auto ${radius} border ${borderColor} dark:border-slate-800">
  <table className="w-full caption-bottom text-sm">
    <thead className="[&_tr]:border-b bg-slate-50/50 dark:bg-slate-900/50">
      <tr className="border-b${hoverClass}">
        <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Invoice</th>
        <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Status</th>
        <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Method</th>
        <th className="h-12 px-4 text-right align-middle font-medium text-slate-500 dark:text-slate-400">Amount</th>
      </tr>
    </thead>
    <tbody className="[&_tr:last-child]:border-0">
      <tr className="border-b${bodyHoverClass}">
        <td className="p-4 align-middle font-medium ${textColor}">INV001</td>
        <td className="p-4 align-middle ${textColor}">Paid</td>
        <td className="p-4 align-middle ${textColor}">Credit Card</td>
        <td className="p-4 align-middle text-right ${textColor}">$250.00</td>
      </tr>
      <tr className="border-b${stripeClass}${bodyHoverClass}">
        <td className="p-4 align-middle font-medium ${textColor}">INV002</td>
        <td className="p-4 align-middle ${textColor}">Pending</td>
        <td className="p-4 align-middle ${textColor}">PayPal</td>
        <td className="p-4 align-middle text-right ${textColor}">$150.00</td>
      </tr>
    </tbody>
  </table>
</div>`;
}
