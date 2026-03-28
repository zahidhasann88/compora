import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapFontSize, mapPaddingXY, mapBgColor, mapTextColor, mapBorderColor } from '../tailwind';

export function generateButtonCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const isPill = props.pillShape;
  const radius = isPill ? 'rounded-full' : mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  let padding = mapPaddingXY(styles.padding);
  
  // Link variation doesn't use padding
  if (variant === 'link') padding = 'p-0';

  let classes: string[] = [padding, radius, fontSize];
  
  // Font Weight
  if (styles.fontWeight !== '600') {
    const weights: Record<string, string> = {
      '300': 'font-light', '400': 'font-normal', '500': 'font-medium', '600': 'font-semibold', '700': 'font-bold'
    };
    classes.push(weights[styles.fontWeight] || `font-[${styles.fontWeight}]`);
  } else {
    classes.push('font-semibold');
  }

  // Letter Spacing
  if (styles.letterSpacing !== 'normal' && styles.letterSpacing !== '0') {
    classes.push(`tracking-[${styles.letterSpacing}px]`);
  }

  // Transition
  if (props.transition !== false) {
    classes.push('transition-all', 'duration-200', 'ease-in-out');
  }

  // Width/Height
  if (props.fullWidth) {
    classes.push('w-full');
  } else if (styles.width && styles.width !== 'auto') {
    classes.push(`w-[${styles.width}px]`);
  }
  if (styles.height && styles.height !== 'auto') {
    classes.push(`h-[${styles.height}px]`);
  }
  
  // Flex
  if ((props.icon && props.icon !== 'none') || props.loading) {
    classes.push('flex', 'items-center', 'justify-center', `gap-[${styles.gap || 8}px]`);
    if (props.iconPosition === 'right' && !props.loading) {
      classes.push('flex-row-reverse');
    }
  } else {
    // If user explicit width/height but no icon, it's nice to center text
    if ((styles.width && styles.width !== 'auto') || (styles.height && styles.height !== 'auto')) {
      classes.push('flex', 'items-center', 'justify-center');
    }
  }

  // Shadow
  if (props.shadowPreset && props.shadowPreset !== 'none') {
    classes.push(`shadow-${props.shadowPreset}`);
    if (styles.boxShadowColor && styles.boxShadowColor !== '#000000') {
      classes.push(`shadow-[${styles.boxShadowColor}]`);
    }
  }
  
  // Custom Hover
  let hoverClass = '';
  if (styles.hoverBgColor && variant !== 'link' && variant !== 'ghost') {
    hoverClass = `hover:bg-[${styles.hoverBgColor}]`;
  }

  switch (variant) {
    case 'primary':
      classes.push(mapBgColor(styles.bgColor), mapTextColor(styles.textColor), hoverClass || 'hover:opacity-90');
      break;
    case 'secondary':
      classes.push(`${mapBgColor(styles.bgColor)}/20`, mapTextColor(styles.bgColor), hoverClass || 'hover:opacity-80');
      break;
    case 'outline':
      classes.push('bg-transparent', mapTextColor(styles.bgColor), `border-[${styles.borderWidth || 2}px]`, mapBorderColor(styles.borderColor), hoverClass || `hover:${mapBgColor(styles.bgColor).replace('bg-', 'bg-')}/10`);
      break;
    case 'ghost':
      classes.push('bg-transparent', mapTextColor(styles.bgColor), `hover:bg-[${styles.hoverBgColor || styles.bgColor}]/10`);
      break;
    case 'destructive':
      classes.push('bg-red-500', 'text-white', hoverClass || 'hover:bg-red-600');
      break;
    case 'link':
      classes.push('bg-transparent', mapTextColor(styles.bgColor), 'underline-offset-4', 'hover:underline');
      break;
  }

  if (props.disabled || props.loading) {
    classes.push('opacity-50', 'cursor-not-allowed');
  }

  // assemble attributes
  const typeAttr = props.buttonType && props.buttonType !== 'button' ? `\n  type="${props.buttonType}"` : '';
  const ariaAttr = props.ariaLabel ? `\n  aria-label="${props.ariaLabel}"` : '';
  const disabledAttr = (props.disabled || props.loading) ? '\n  disabled' : '';
  
  let onClickAttr = '';
  if (props.onClickAction && props.onClickAction !== 'none') {
    if (props.onClickAction === 'console') onClickAttr = `\n  onClick={() => console.log('clicked')}`;
    else if (props.onClickAction === 'toast') onClickAttr = `\n  onClick={() => alert('toast')}`;
    else if (props.onClickAction === 'increment') onClickAttr = `\n  onClick={() => setCounter(c => c + 1)}`;
    else if (props.onClickAction === 'copy') onClickAttr = `\n  onClick={() => navigator.clipboard.writeText('copied!')}`;
  }

  const text = props.text || 'Click me';

  let iconTag = '';
  if (props.icon && props.icon !== 'none') {
    const iconName = props.icon.charAt(0).toUpperCase() + props.icon.slice(1);
    iconTag = `\n    <${iconName} className="w-4 h-4" />`;
  }

  let childrenStr = `\n    ${text}`;
  if (props.loading) {
    childrenStr = `\n    <Loader2 className="w-4 h-4 animate-spin" />\n    ${text}`;
  } else if (iconTag) {
    if (props.iconPosition === 'right') {
      childrenStr = `\n    ${text}${iconTag}`;
    } else {
      childrenStr = `${iconTag}\n    ${text}`;
    }
  }

  const importsToPull = [];
  if (props.loading) importsToPull.push('Loader2');
  if (props.icon && props.icon !== 'none' && !props.loading) {
    importsToPull.push(props.icon.charAt(0).toUpperCase() + props.icon.slice(1));
  }
  
  const uniqueImports = Array.from(new Set(importsToPull));
  const importStr = uniqueImports.length > 0 ? `import { ${uniqueImports.join(', ')} } from 'lucide-react';\n\n` : '';

  const classString = classes.filter(Boolean).join(' ').replace(/\s+/g, ' ');

  return `${importStr}<button\n  className="${classString}"${typeAttr}${ariaAttr}${disabledAttr}${onClickAttr}\n>${childrenStr}\n</button>`;
}
