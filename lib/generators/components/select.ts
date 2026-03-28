import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateSelectCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const selectVariant = props.selectVariant || 'outlined';
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  const options: { label: string; value: string }[] = props.options || [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ];

  const weights: Record<string, string> = {
    '300': 'font-light', '400': 'font-normal', '500': 'font-medium', '600': 'font-semibold', '700': 'font-bold'
  };
  const fontWeight = weights[props.selectFontWeight || '400'] || 'font-normal';

  let widthClass = 'w-full max-w-xs';
  if (styles.width && styles.width !== 'auto') widthClass = `w-[${styles.width}px]`;
  let heightClass = '';
  if (styles.height && styles.height !== 'auto') heightClass = `min-h-[${styles.height}px]`;

  const borderW = Number(styles.borderWidth) || 1;
  const borderSize = borderW === 1 ? 'border' : `border-[${borderW}px]`;

  // Trigger classes
  let triggerClasses = ['flex', 'items-center', 'justify-between', 'gap-2', widthClass, padding, radius, fontSize, fontWeight, heightClass, 'cursor-pointer', 'transition-all', 'duration-200', 'outline-none'].filter(Boolean);

  switch (selectVariant) {
    case 'outlined':
      triggerClasses.push(`${mapBgColor(styles.bgColor)}/5`, borderSize, mapBorderColor(styles.borderColor), `focus:ring-2 focus:ring-[${props.focusRingColor || '#6366f1'}]/20`);
      break;
    case 'filled':
      triggerClasses.push(`${mapBgColor(styles.bgColor)}/10`, 'border-b-2', mapBorderColor(styles.borderColor));
      break;
    case 'underline':
      triggerClasses.push('bg-transparent', 'rounded-none', 'border-b-2', mapBorderColor(styles.borderColor));
      break;
    case 'unstyled':
      triggerClasses.push('bg-transparent', 'border-none', 'rounded-none');
      break;
  }

  if (props.errorState) triggerClasses.push('border-red-500');
  if (props.disabled) triggerClasses.push('opacity-50', 'cursor-not-allowed');

  // Dropdown classes
  const ddClasses = [
    `bg-[${props.dropdownBg || '#1e1e2e'}]`, 'border', `${mapBorderColor(styles.borderColor)}/20`,
    radius, 'shadow-xl', 'mt-1', `max-h-[${props.dropdownMaxHeight || 300}px]`, 'overflow-y-auto', 'p-1'
  ].join(' ');

  // Option classes
  const optClasses = [
    'flex', 'items-center', 'justify-between', `p-[${props.optionPadding || 8}px]`,
    `text-[${props.optionFontSize || 14}px]`, `rounded-[${Math.max(Number(styles.borderRadius) - 4, 4)}px]`,
    'cursor-pointer', 'transition-colors',
    `hover:bg-[${props.optionHoverBg || '#2a2a3e'}]`,
    mapTextColor(styles.textColor),
  ].join(' ');

  // Build imports
  const imports: string[] = [];
  imports.push('ChevronDown');
  if (props.loading) imports.push('Loader2');
  if (props.clearButton) imports.push('X');
  if (props.leftIcon && props.leftIcon !== 'none') imports.push(capitalize(props.leftIcon));
  const isSearchable = props.selectType === 'searchable' || props.selectType === 'creatable';
  if (isSearchable) imports.push('Search');

  const uniqueImports = Array.from(new Set(imports));
  const importStr = `import { ${uniqueImports.join(', ')} } from 'lucide-react';\nimport { useState${isSearchable ? ', useMemo' : ''} } from 'react';\n\n`;

  // State hooks
  let stateLines = `const [isOpen, setIsOpen] = useState(${props.openByDefault ? 'true' : 'false'});\n  const [selected, setSelected] = useState${props.selectType === 'multi' ? '<string[]>([])' : "('')"};`;
  if (isSearchable) stateLines += `\n  const [search, setSearch] = useState('');`;

  // Options data
  const optionsData = `const options = [\n    ${options.map(o => `{ label: '${o.label}', value: '${o.value}' }`).join(',\n    ')}\n  ];`;

  // Label
  let labelJsx = '';
  if (props.label) {
    const req = props.required ? `\n      <span className="text-red-500 ml-1">*</span>` : '';
    labelJsx = `\n    <label className="text-sm font-medium mb-1.5 block" style={{ color: '${props.labelColor || '#e4e4e7'}' }}>\n      ${props.label}${req}\n    </label>`;
  }

  // Left icon
  const leftIconJsx = (props.leftIcon && props.leftIcon !== 'none')
    ? `\n        <${capitalize(props.leftIcon)} className="w-4 h-4 text-muted shrink-0" />`
    : '';

  // Right side (loading, clear, chevron)
  let rightJsx = '\n        <div className="flex items-center gap-1 shrink-0">';
  if (props.loading) rightJsx += '\n          <Loader2 className="w-4 h-4 animate-spin text-muted" />';
  if (props.clearButton) rightJsx += `\n          {selected${props.selectType === 'multi' ? '.length > 0' : ''} && <X className="w-3.5 h-3.5 text-muted cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelected(${props.selectType === 'multi' ? '[]' : "''"}); }} />}`;
  rightJsx += `\n          <ChevronDown className="w-4 h-4 text-muted transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />`;
  rightJsx += '\n        </div>';

  // Trigger content
  const placeholder = props.placeholder || 'Select an option...';

  // Error / helper
  let bottomJsx = '';
  if (props.errorState && props.errorMessage) {
    bottomJsx = `\n    <p className="text-xs text-red-500 mt-1">${props.errorMessage}</p>`;
  } else if (props.helperText) {
    bottomJsx = `\n    <p className="text-xs text-muted mt-1">${props.helperText}</p>`;
  }

  const triggerStr = triggerClasses.join(' ').replace(/\s+/g, ' ');

  const code = `${importStr}export default function CustomSelect() {
  ${stateLines}
  ${optionsData}

  return (
    <div className="relative flex flex-col">${labelJsx}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="${triggerStr}"${props.disabled ? '\n        disabled' : ''}${props.ariaLabel ? `\n        aria-label="${props.ariaLabel}"` : ''}
      >${leftIconJsx}
        <span className="flex-1 text-left truncate ${mapTextColor(styles.textColor)}">
          {selected${props.selectType === 'multi' ? '.length > 0 ? `${selected.length} selected`' : ` || '`}${props.selectType !== 'multi' ? placeholder + "'" : ` : '${placeholder}'`}}
        </span>${rightJsx}
      </button>

      {isOpen && (
        <div className="${ddClasses}">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setSelected(${props.selectType === 'multi' ? '(prev) => prev.includes(opt.value) ? prev.filter(v => v !== opt.value) : [...prev, opt.value]' : 'opt.value'}); ${props.selectType !== 'multi' ? 'setIsOpen(false);' : ''} }}
              className="${optClasses}"
            >
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}${bottomJsx}
    </div>
  );
}`;

  return code;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
