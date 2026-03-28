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
    const inputVariant = props.inputVariant || 'outlined';
    const borderW = Number(styles.borderWidth) || 1;
    css['outline'] = 'none';
    css['width'] = styles.width && styles.width !== 'auto' ? `${styles.width}px` : '320px';
    css['font-family'] = 'inherit';
    css['color'] = styles.textColor;
    css['font-weight'] = props.inputFontWeight || '400';
    css['text-align'] = props.textAlign || 'left';
    if (styles.letterSpacing && styles.letterSpacing !== 'normal' && styles.letterSpacing !== '0') {
      css['letter-spacing'] = `${styles.letterSpacing}px`;
    }
    if (styles.height && styles.height !== 'auto') css['height'] = `${styles.height}px`;
    if (props.errorState) {
      css['border-color'] = '#ef4444';
    }
    switch (inputVariant) {
      case 'outlined':
        css['background-color'] = `${styles.bgColor}0d`;
        css['border'] = `${borderW}px solid ${props.errorState ? '#ef4444' : styles.borderColor}`;
        css['border-radius'] = `${styles.borderRadius}px`;
        break;
      case 'filled':
        css['background-color'] = `${styles.bgColor}1a`;
        css['border'] = 'none';
        css['border-bottom'] = `2px solid ${props.errorState ? '#ef4444' : styles.borderColor}`;
        css['border-radius'] = `${styles.borderRadius}px`;
        break;
      case 'underline':
        css['background-color'] = 'transparent';
        css['border'] = 'none';
        css['border-bottom'] = `2px solid ${props.errorState ? '#ef4444' : styles.borderColor}`;
        css['border-radius'] = '0';
        break;
      case 'unstyled':
        css['background-color'] = 'transparent';
        css['border'] = 'none';
        css['border-radius'] = '0';
        break;
    }
    if (props.disabled) {
      css['opacity'] = '0.5';
      css['cursor'] = 'not-allowed';
    }
    // For icon/addon layouts, use wrapper approach
    const hasIcons = (props.leftIcon && props.leftIcon !== 'none') || (props.rightIcon && props.rightIcon !== 'none') || props.loading || props.successState;
    if (hasIcons || props.leftAddon || props.rightAddon) {
      css['display'] = 'flex';
      css['align-items'] = 'center';
    }
  } else if (component === 'select') {
    const selectVariant = props.selectVariant || 'outlined';
    const borderW = Number(styles.borderWidth) || 1;
    css['display'] = 'flex';
    css['align-items'] = 'center';
    css['justify-content'] = 'space-between';
    css['gap'] = '8px';
    css['outline'] = 'none';
    css['cursor'] = props.disabled ? 'not-allowed' : 'pointer';
    css['width'] = styles.width && styles.width !== 'auto' ? `${styles.width}px` : '320px';
    css['font-family'] = 'inherit';
    css['color'] = styles.textColor;
    css['font-weight'] = props.selectFontWeight || '400';
    css['text-align'] = props.textAlign || 'left';
    if (styles.height && styles.height !== 'auto') css['min-height'] = `${styles.height}px`;
    switch (selectVariant) {
      case 'outlined':
        css['background-color'] = `${styles.bgColor}0d`;
        css['border'] = `${borderW}px solid ${props.errorState ? '#ef4444' : styles.borderColor}`;
        css['border-radius'] = `${styles.borderRadius}px`;
        break;
      case 'filled':
        css['background-color'] = `${styles.bgColor}1a`;
        css['border'] = 'none';
        css['border-bottom'] = `2px solid ${props.errorState ? '#ef4444' : styles.borderColor}`;
        css['border-radius'] = `${styles.borderRadius}px`;
        break;
      case 'underline':
        css['background-color'] = 'transparent';
        css['border'] = 'none';
        css['border-bottom'] = `2px solid ${props.errorState ? '#ef4444' : styles.borderColor}`;
        css['border-radius'] = '0';
        break;
      case 'unstyled':
        css['background-color'] = 'transparent';
        css['border'] = 'none';
        css['border-radius'] = '0';
        break;
    }
    if (props.disabled) css['opacity'] = '0.5';
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

export function getComponentContent(component: string, props: Record<string, any> = {}, styles?: Styles): { tag: string; selfClosing: boolean; children: string; attrs: string } {
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
    case 'input': {
      const s = styles || { bgColor: '#6366f1', textColor: '#ffffff', borderColor: '#6366f1', hoverBgColor: '#4f46e5', boxShadowColor: '#000000', padding: '12', borderRadius: '8', fontSize: '16', width: 'auto', height: 'auto', gap: '8', borderWidth: '0', letterSpacing: '0', fontWeight: '600' };
      const inputAttrs: string[] = [];
      inputAttrs.push(` type="${props.inputType || 'text'}"`);
      inputAttrs.push(` placeholder="${props.placeholder || 'Enter text...'}"`);
      if (props.disabled) inputAttrs.push(' disabled');
      if (props.readOnly) inputAttrs.push(' readonly');
      if (props.required) inputAttrs.push(' required');
      if (props.charCount) inputAttrs.push(` maxlength="${props.maxLength || 100}"`);
      if (props.ariaLabel) inputAttrs.push(` aria-label="${props.ariaLabel}"`);
      if (props.autocomplete && props.autocomplete !== 'off') inputAttrs.push(` autocomplete="${props.autocomplete}"`);
      if (props.defaultValue) inputAttrs.push(` value="${props.defaultValue}"`);

      const inputSvgMap: Record<string, string> = {
        search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
        calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
        eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
      };

      const makeSvg = (icon: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inputSvgMap[icon] || ''}</svg>`;

      let children: string[] = [];

      // Label
      if (props.label) {
        const req = props.required ? '<span style="color:#ef4444;margin-left:3px;">*</span>' : '';
        children.push(`<label style="font-size:${Math.max(Number(s.fontSize) - 2, 11)}px;font-weight:500;color:${props.labelColor || '#e4e4e7'};margin-bottom:6px;display:block;">${props.label}${req}</label>`);
      }

      // Wrapper open with input inside
      let inputInner: string[] = [];
      if (props.leftAddon) inputInner.push(`<span style="padding:${s.padding}px;background:rgba(0,0,0,0.1);color:#9ca3af;border-right:1px solid ${s.borderColor}33;">${props.leftAddon}</span>`);
      if (props.leftIcon && props.leftIcon !== 'none' && inputSvgMap[props.leftIcon]) {
        inputInner.push(`<span style="padding-left:${s.padding}px;display:flex;align-items:center;color:#9ca3af;">${makeSvg(props.leftIcon)}</span>`);
      }
      inputInner.push(`<input${inputAttrs.join('')} />`);
      if (props.loading) inputInner.push(`<span style="padding-right:${s.padding}px;display:flex;align-items:center;color:#9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></span>`);
      if (props.successState && !props.loading) inputInner.push(`<span style="padding-right:${s.padding}px;display:flex;align-items:center;color:#22c55e;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>`);
      if (props.rightIcon && props.rightIcon !== 'none' && inputSvgMap[props.rightIcon] && !props.loading && !props.successState) {
        inputInner.push(`<span style="padding-right:${s.padding}px;display:flex;align-items:center;color:#9ca3af;">${makeSvg(props.rightIcon)}</span>`);
      }
      if (props.rightAddon) inputInner.push(`<span style="padding:${s.padding}px;background:rgba(0,0,0,0.1);color:#9ca3af;border-left:1px solid ${s.borderColor}33;">${props.rightAddon}</span>`);

      children.push(inputInner.join('\n  '));

      // Error / helper
      if (props.errorState && props.errorMessage) {
        children.push(`<p style="font-size:12px;color:#ef4444;margin:4px 0 0;">${props.errorMessage}</p>`);
      } else if (props.helperText) {
        children.push(`<p style="font-size:12px;color:#9ca3af;margin:4px 0 0;">${props.helperText}</p>`);
      }
      if (props.charCount) {
        children.push(`<span style="font-size:11px;color:#9ca3af;text-align:right;display:block;">0/${props.maxLength || 100}</span>`);
      }

      return { tag: 'div', selfClosing: false, children: children.join('\n  '), attrs: '' };
    }
    case 'select': {
      const s = styles || { bgColor: '#6366f1', textColor: '#ffffff', borderColor: '#6366f1', padding: '12', borderRadius: '8', fontSize: '16', width: 'auto', height: 'auto' } as Styles;
      const selectOpts = props.options || [
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
        { label: 'Option 3', value: 'option-3' },
      ];
      let parts: string[] = [];

      // Label
      if (props.label) {
        const req = props.required ? '<span style="color:#ef4444;margin-left:3px;">*</span>' : '';
        parts.push(`<label style="font-size:${Math.max(Number(s.fontSize) - 2, 11)}px;font-weight:500;color:${props.labelColor || '#e4e4e7'};margin-bottom:6px;display:block;">${props.label}${req}</label>`);
      }

      // Trigger
      const chevronSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
      parts.push(`<button type="button" onclick="this.nextElementSibling.classList.toggle('hidden')" style="display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;cursor:pointer;">`);
      parts.push(`  <span>${props.placeholder || 'Select an option...'}</span>`);
      parts.push(`  <span style="color:#9ca3af;">${chevronSvg}</span>`);
      parts.push(`</button>`);

      // Dropdown
      parts.push(`<div class="hidden" style="background:${props.dropdownBg || '#1e1e2e'};border:1px solid ${s.borderColor}33;border-radius:${s.borderRadius}px;max-height:${props.dropdownMaxHeight || 300}px;overflow-y:auto;margin-top:4px;padding:4px;box-shadow:0 10px 25px rgba(0,0,0,0.3);">`);
      selectOpts.forEach((opt: any) => {
        parts.push(`  <div style="padding:${props.optionPadding || 8}px;font-size:${props.optionFontSize || 14}px;cursor:pointer;border-radius:4px;" onmouseover="this.style.backgroundColor='${props.optionHoverBg || '#2a2a3e'}'" onmouseout="this.style.backgroundColor='transparent'">${opt.label}</div>`);
      });
      parts.push(`</div>`);

      // Error / helper
      if (props.errorState && props.errorMessage) {
        parts.push(`<p style="font-size:12px;color:#ef4444;margin:4px 0 0;">${props.errorMessage}</p>`);
      } else if (props.helperText) {
        parts.push(`<p style="font-size:12px;color:#9ca3af;margin:4px 0 0;">${props.helperText}</p>`);
      }

      return { tag: 'div', selfClosing: false, children: parts.join('\n  '), attrs: ' style="position:relative;"' };
    }
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
