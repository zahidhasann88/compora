import type { Styles, Variant } from '@/store/usePlaygroundStore';

export function buildCSSFromStyles(styles: Styles, variant: Variant, component: string, props: Record<string, any> = {}): Record<string, string> {
  const css: Record<string, string> = {};

  css['padding'] = `${styles.padding}px`;
  css['border-radius'] = `${styles.borderRadius}px`;
  css['font-size'] = `${styles.fontSize}px`;
  css['transition'] = 'all 0.2s ease';

  if (component === 'button') {
    css['padding'] = `${styles.padding}px ${Number(styles.padding) * 2}px`;
    css['font-weight'] = '600';
    css['cursor'] = 'pointer';
    css['border'] = 'none';
    switch (variant) {
      case 'primary':
        css['background-color'] = styles.bgColor;
        css['color'] = styles.textColor;
        break;
      case 'secondary':
        css['background-color'] = `${styles.bgColor}33`;
        css['color'] = styles.bgColor;
        break;
      case 'outline':
        css['background-color'] = 'transparent';
        css['color'] = styles.bgColor;
        css['border'] = `2px solid ${styles.bgColor}`;
        break;
    }
    if (props.disabled || props.loading) {
      css['opacity'] = '0.7';
      css['cursor'] = 'not-allowed';
      if (variant === 'outline') {
        css['background-color'] = 'transparent';
        css['color'] = '#9ca3af';
        css['border-color'] = '#d1d5db';
      } else {
        css['background-color'] = '#f3f4f6';
        css['color'] = '#9ca3af';
        css['border-color'] = '#f3f4f6';
      }
    }
    if (props.fullWidth) {
      css['width'] = '100%';
    }
    if (styles.width && styles.width !== 'auto' && !props.fullWidth) css['width'] = `${styles.width}px`;
    if (styles.height && styles.height !== 'auto') css['height'] = `${styles.height}px`;
    if (styles.letterSpacing && styles.letterSpacing !== 'normal') css['letter-spacing'] = `${styles.letterSpacing}px`;

    // Ensure flex is used if width/height are specified or icon is present
    if (props.loading || (props.icon && props.icon !== 'none') || (styles.width && styles.width !== 'auto') || (styles.height && styles.height !== 'auto')) {
      css['display'] = 'flex';
      css['align-items'] = 'center';
      css['justify-content'] = 'center';
    }
    if (props.loading || (props.icon && props.icon !== 'none')) {
      css['gap'] = `${styles.gap || 8}px`;
      if (props.iconPosition === 'right' && !props.loading) {
        css['flex-direction'] = 'row-reverse';
      }
    }
  } else if (component === 'card') {
    css['max-width'] = '320px';
    css['width'] = '100%';
    switch (variant) {
      case 'primary':
        css['background-color'] = `${styles.bgColor}1a`;
        css['color'] = styles.textColor;
        break;
      case 'secondary':
        css['background-color'] = `${styles.bgColor}0d`;
        css['color'] = styles.textColor;
        break;
      case 'outline':
        css['background-color'] = 'transparent';
        css['color'] = styles.textColor;
        css['border'] = `2px solid ${styles.bgColor}`;
        break;
    }
    const shadowMap: Record<string, string> = {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    };
    if (props.shadow && props.shadow !== 'none' && shadowMap[props.shadow]) {
      css['box-shadow'] = shadowMap[props.shadow];
    }
  } else if (component === 'input') {
    css['outline'] = 'none';
    css['width'] = '100%';
    css['max-width'] = '320px';
    css['font-family'] = 'inherit';
    switch (variant) {
      case 'primary':
        css['background-color'] = `${styles.bgColor}0d`;
        css['color'] = styles.textColor;
        css['border'] = `1px solid ${styles.bgColor}44`;
        break;
      case 'secondary':
        css['background-color'] = `${styles.bgColor}1a`;
        css['color'] = styles.textColor;
        css['border'] = `1px solid ${styles.bgColor}33`;
        break;
      case 'outline':
        css['background-color'] = 'transparent';
        css['color'] = styles.textColor;
        css['border'] = `2px solid ${styles.bgColor}`;
        break;
    }
    if (props.disabled) {
      css['opacity'] = '0.5';
      css['cursor'] = 'not-allowed';
    }
  } else if (component === 'badge') {
    css['padding'] = `${Math.max(4, Number(styles.padding) / 2)}px ${styles.padding}px`;
    css['font-weight'] = '600';
    css['display'] = 'inline-flex';
    css['align-items'] = 'center';
    css['justify-content'] = 'center';
    switch (variant) {
      case 'primary':
        css['background-color'] = styles.bgColor;
        css['color'] = styles.textColor;
        break;
      case 'secondary':
        css['background-color'] = `${styles.bgColor}33`;
        css['color'] = styles.bgColor;
        break;
      case 'outline':
        css['background-color'] = 'transparent';
        css['color'] = styles.bgColor;
        css['border'] = `2px solid ${styles.bgColor}`;
        break;
    }
  } else if (component === 'alert') {
    css['width'] = '100%';
    css['max-width'] = '400px';
    css['display'] = 'flex';
    css['gap'] = '16px';
    css['align-items'] = 'flex-start';
    switch (variant) {
      case 'primary':
        css['background-color'] = `${styles.bgColor}1a`;
        css['color'] = styles.textColor;
        break;
      case 'secondary':
        css['background-color'] = `${styles.bgColor}0d`;
        css['color'] = styles.textColor;
        break;
      case 'outline':
        css['background-color'] = 'transparent';
        css['color'] = styles.textColor;
        css['border'] = `2px solid ${styles.bgColor}`;
        break;
    }
  } else if (component === 'navbar') {
    css['width'] = '100%';
    css['padding'] = `${styles.padding}px`;
    css['display'] = 'flex';
    css['align-items'] = 'center';
    css['justify-content'] = 'space-between';
    if (props.sticky) {
      css['position'] = 'sticky';
      css['top'] = '0';
      css['z-index'] = '50';
    }
    if (props.transparent) {
      css['background-color'] = 'transparent';
      css['border-color'] = 'transparent';
    } else {
      css['background-color'] = `${styles.bgColor}f2`; // ~95% opacity
      css['border-bottom'] = '1px solid #e2e8f0';
    }
    css['color'] = styles.textColor;
  } else {
    // Generic fallback
    switch (variant) {
      case 'primary':
        css['background-color'] = styles.bgColor;
        css['color'] = styles.textColor;
        break;
      case 'secondary':
        css['background-color'] = `${styles.bgColor}33`;
        css['color'] = styles.bgColor;
        break;
      case 'outline':
        css['background-color'] = 'transparent';
        css['color'] = styles.bgColor;
        css['border'] = `2px solid ${styles.bgColor}`;
        break;
    }
  }

  return css;
}

export function cssObjectToString(css: Record<string, string>, indent: number = 2): string {
  const pad = ' '.repeat(indent);
  return Object.entries(css).map(([k, v]) => `${pad}${k}: ${v};`).join('\n');
}

export function cssObjectToInlineStyle(css: Record<string, string>): string {
  return Object.entries(css).map(([k, v]) => `${k}: ${v}`).join('; ');
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getComponentContent(component: string, props: Record<string, any> = {}): { tag: string; selfClosing: boolean; children: string; attrs: string } {
  const disabledAttr = props.disabled ? ' disabled' : '';

  switch (component) {
    case 'button':
      const btnIsDisabled = props.disabled || props.loading;
      const btnAttr = btnIsDisabled ? ' disabled' : '';
      const textNode = props.text || 'Click me';
      let svgNode = '';
      
      const svgMap: Record<string, string> = {
        search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
        trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
        edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
        check: '<polyline points="20 6 9 17 4 12"/>',
        x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
        arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'
      };

      if (props.loading) {
        svgNode = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
      } else if (props.icon && props.icon !== 'none' && svgMap[props.icon]) {
        svgNode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgMap[props.icon]}</svg>`;
      }

      let btnChildren = textNode;
      if (svgNode) {
        // Output with explicit spacing node if the framework doesn't rely entirely on flex-gap, but we enforce gap in CSS anyway.
        if (props.iconPosition === 'right' && !props.loading) {
          btnChildren = `${textNode}\n  ${svgNode}`;
        } else {
          btnChildren = `${svgNode}\n  ${textNode}`;
        }
      }

      return { tag: 'button', selfClosing: false, children: btnChildren, attrs: btnAttr };
    case 'card':
      return { tag: 'div', selfClosing: false, children: '<h3>Card Title</h3>\n  <p>This is a description for the card component.</p>', attrs: '' };
    case 'input':
      return { tag: 'input', selfClosing: true, children: '', attrs: ` type="text" placeholder="${props.placeholder || 'Type something...'}"${disabledAttr}` };
    case 'badge':
      const badgeChildren = props.showDot 
        ? '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background-color:currentColor;margin-right:6px;"></span>Badge'
        : 'Badge';
      return { tag: 'span', selfClosing: false, children: badgeChildren, attrs: '' };
    case 'avatar':
      return { tag: 'div', selfClosing: false, children: 'AB', attrs: '' };
    case 'alert':
      return { tag: 'div', selfClosing: false, children: '<strong>Information Update</strong>\n  <p>Please review the new features we added to the dashboard.</p>', attrs: ' role="alert"' };
    case 'modal':
      // The basic versions don't have complex modal implementations to keep snippets reasonable
      return { tag: 'div', selfClosing: false, children: '<h3>Modal Title</h3>\n  <p>Modal content goes here.</p>', attrs: '' };
    case 'table':
      return { 
        tag: 'table', 
        selfClosing: false, 
        children: `<thead><tr><th>Invoice</th><th>Status</th><th>Amount</th></tr></thead>\n  <tbody><tr><td>INV001</td><td>Paid</td><td>$250.00</td></tr></tbody>`, 
        attrs: '' 
      };
    case 'navbar':
      const hamburger = props.mobileMenu ? '<button style="background:none;border:none;cursor:pointer;margin-right:1rem;">&#9776;</button>' : '';
      return { 
        tag: 'nav', 
        selfClosing: false, 
        children: `${hamburger}<strong>Brand</strong><div style="flex:1"></div><button>Sign In</button>`, 
        attrs: '' 
      };
    default:
      return { tag: 'div', selfClosing: false, children: capitalize(component), attrs: '' };
  }
}
