import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPadding, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateInputCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const inputVariant = props.inputVariant || 'outlined';
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);

  // Font weight
  const weights: Record<string, string> = {
    '300': 'font-light', '400': 'font-normal', '500': 'font-medium', '600': 'font-semibold', '700': 'font-bold'
  };
  const fontWeight = weights[props.inputFontWeight || '400'] || 'font-normal';

  // Text align
  const alignMap: Record<string, string> = { left: 'text-left', center: 'text-center', right: 'text-right' };
  const textAlign = alignMap[props.textAlign || 'left'] || '';

  // Letter spacing
  let tracking = '';
  if (styles.letterSpacing && styles.letterSpacing !== 'normal' && styles.letterSpacing !== '0') {
    tracking = `tracking-[${styles.letterSpacing}px]`;
  }

  // Width / Height
  let widthClass = 'w-full max-w-xs';
  if (styles.width && styles.width !== 'auto') {
    widthClass = `w-[${styles.width}px]`;
  }
  let heightClass = '';
  if (styles.height && styles.height !== 'auto') {
    heightClass = `h-[${styles.height}px]`;
  }

  // Disabled
  const disabledClasses = props.disabled ? ' opacity-50 cursor-not-allowed' : '';

  // Wrapper classes by variant
  let wrapperClasses: string[] = ['flex', 'items-center', widthClass, 'transition-all', 'duration-200'];
  const borderW = Number(styles.borderWidth) || 1;
  const borderSize = borderW === 1 ? 'border' : `border-[${borderW}px]`;

  switch (inputVariant) {
    case 'outlined':
      wrapperClasses.push(
        `${mapBgColor(styles.bgColor)}/5`, radius,
        borderSize, mapBorderColor(styles.borderColor),
        `focus-within:ring-2 focus-within:ring-[${props.focusRingColor || '#6366f1'}]/20`,
        `focus-within:${mapBorderColor(props.focusRingColor || '#6366f1')}`,
      );
      break;
    case 'filled':
      wrapperClasses.push(
        `${mapBgColor(styles.bgColor)}/10`, radius,
        'border-b-2', mapBorderColor(styles.borderColor),
        `focus-within:${mapBorderColor(props.focusRingColor || '#6366f1')}`,
      );
      break;
    case 'underline':
      wrapperClasses.push(
        'bg-transparent', 'rounded-none',
        'border-b-2', mapBorderColor(styles.borderColor),
        `focus-within:${mapBorderColor(props.focusRingColor || '#6366f1')}`,
      );
      break;
    case 'unstyled':
      wrapperClasses.push('bg-transparent', 'border-none', 'rounded-none');
      break;
  }

  if (props.errorState) {
    wrapperClasses.push('border-red-500', 'focus-within:ring-red-500/20');
  }

  // Input classes
  let inputClasses = [
    'flex-1', 'bg-transparent', 'outline-none', fontSize, padding,
    mapTextColor(styles.textColor), fontWeight, textAlign, tracking, heightClass,
    `placeholder:${mapTextColor(props.placeholderColor || '#71717a')}`,
  ].filter(Boolean);

  if (props.disabled) inputClasses.push('cursor-not-allowed');
  if (props.readOnly) inputClasses.push('cursor-default');

  // Build imports
  const imports: string[] = [];
  const hasLeftIcon = props.leftIcon && props.leftIcon !== 'none';
  const hasRightIcon = props.rightIcon && props.rightIcon !== 'none';

  if (props.loading) imports.push('Loader2');
  if (props.successState && !props.loading) imports.push('Check');
  if (props.clearButton) imports.push('X');
  if (hasLeftIcon) imports.push(capitalize(props.leftIcon));
  if (hasRightIcon) imports.push(capitalize(props.rightIcon));
  if (props.inputType === 'password') { imports.push('Eye'); imports.push('EyeOff'); }

  const uniqueImports = Array.from(new Set(imports));
  const importStr = uniqueImports.length > 0 ? `import { ${uniqueImports.join(', ')} } from 'lucide-react';\n\n` : '';

  // Attributes
  const attrs: string[] = [];
  attrs.push(`type="${props.inputType || 'text'}"`);
  attrs.push(`placeholder="${props.placeholder || 'Enter text...'}"`);
  attrs.push(`className="${inputClasses.join(' ').replace(/\s+/g, ' ')}"`);
  if (props.disabled) attrs.push('disabled');
  if (props.readOnly) attrs.push('readOnly');
  if (props.required) attrs.push('required');
  if (props.charCount) attrs.push(`maxLength={${props.maxLength || 100}}`);
  if (props.ariaLabel) attrs.push(`aria-label="${props.ariaLabel}"`);
  if (props.ariaDescribedBy) attrs.push(`aria-describedby="${props.ariaDescribedBy}"`);
  if (props.autocomplete && props.autocomplete !== 'off') attrs.push(`autoComplete="${props.autocomplete}"`);
  if (props.defaultValue) attrs.push(`defaultValue="${props.defaultValue}"`);

  const attrStr = attrs.map(a => `\n      ${a}`).join('');

  // Build output
  let lines: string[] = [];

  // Label
  if (props.label) {
    const labelColor = props.labelColor ? ` style={{ color: '${props.labelColor}' }}` : '';
    const required = props.required ? `\n    <span className="text-red-500 ml-1">*</span>` : '';
    lines.push(`  <label className="text-sm font-medium mb-1.5 block"${labelColor}>\n    ${props.label}${required}\n  </label>`);
  }

  // Wrapper open
  lines.push(`  <div className="${wrapperClasses.join(' ').replace(/\s+/g, ' ')}${disabledClasses}">`);

  // Left addon
  if (props.leftAddon) {
    lines.push(`    <span className="px-3 flex items-center text-muted bg-muted/10 border-r ${mapBorderColor(styles.borderColor)}/30 ${radius.replace('rounded', 'rounded-l')} self-stretch">${props.leftAddon}</span>`);
  }

  // Left icon
  if (hasLeftIcon) {
    lines.push(`    <${capitalize(props.leftIcon)} className="w-4 h-4 ml-3 text-muted shrink-0" />`);
  }

  // Input
  lines.push(`    <input${attrStr}\n    />`);

  // Loading
  if (props.loading) {
    lines.push(`    <Loader2 className="w-4 h-4 mr-3 animate-spin text-muted shrink-0" />`);
  }

  // Success
  if (props.successState && !props.loading) {
    lines.push(`    <Check className="w-4 h-4 mr-3 text-green-500 shrink-0" />`);
  }

  // Clear
  if (props.clearButton && !props.loading && !props.successState) {
    lines.push(`    <button onClick={() => setValue('')} className="mr-3 text-muted hover:text-foreground">\n      <X className="w-3.5 h-3.5" />\n    </button>`);
  }

  // Password toggle
  if (props.inputType === 'password') {
    lines.push(`    <button onClick={() => setShow(!show)} className="mr-3 text-muted hover:text-foreground">\n      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}\n    </button>`);
  }

  // Right icon
  if (hasRightIcon && !props.loading && !props.successState && !(props.clearButton) && props.inputType !== 'password') {
    lines.push(`    <${capitalize(props.rightIcon)} className="w-4 h-4 mr-3 text-muted shrink-0" />`);
  }

  // Right addon
  if (props.rightAddon) {
    lines.push(`    <span className="px-3 flex items-center text-muted bg-muted/10 border-l ${mapBorderColor(styles.borderColor)}/30 ${radius.replace('rounded', 'rounded-r')} self-stretch">${props.rightAddon}</span>`);
  }

  // Wrapper close
  lines.push(`  </div>`);

  // Error / Helper
  if (props.errorState && props.errorMessage) {
    lines.push(`  <p className="text-xs text-red-500 mt-1">${props.errorMessage}</p>`);
  } else if (props.helperText) {
    lines.push(`  <p className="text-xs text-muted mt-1">${props.helperText}</p>`);
  }

  // Char count
  if (props.charCount) {
    lines.push(`  <span className="text-xs text-muted text-right block mt-0.5">{value.length}/${props.maxLength || 100}</span>`);
  }

  return `${importStr}<div className="flex flex-col">\n${lines.join('\n')}\n</div>`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
