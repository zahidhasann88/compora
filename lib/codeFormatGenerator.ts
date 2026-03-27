import type { Styles, Variant } from '@/store/usePlaygroundStore';

export type CodeFormat = 'jsx-tailwind' | 'html-css' | 'react-cssmodules' | 'vue' | 'angular' | 'svelte';

export interface CodeFormatInfo {
  id: CodeFormat;
  label: string;
  language: string;
}

export const CODE_FORMATS: CodeFormatInfo[] = [
  { id: 'jsx-tailwind', label: 'JSX + Tailwind', language: 'jsx' },
  { id: 'html-css', label: 'HTML + CSS', language: 'html' },
  { id: 'react-cssmodules', label: 'CSS Modules', language: 'jsx' },
  { id: 'vue', label: 'Vue', language: 'vue' },
  { id: 'angular', label: 'Angular', language: 'typescript' },
  { id: 'svelte', label: 'Svelte', language: 'svelte' },
];

// ── Helper: convert Tailwind className JSX to inline style CSS ──

function buildCSSFromStyles(styles: Styles, variant: Variant, component: string, props: Record<string, any> = {}): Record<string, string> {
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
    if (props.disabled) {
      css['opacity'] = '0.5';
      css['cursor'] = 'not-allowed';
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

function cssObjectToString(css: Record<string, string>, indent: number = 2): string {
  const pad = ' '.repeat(indent);
  return Object.entries(css).map(([k, v]) => `${pad}${k}: ${v};`).join('\n');
}

function cssObjectToInlineStyle(css: Record<string, string>): string {
  return Object.entries(css).map(([k, v]) => `${k}: ${v}`).join('; ');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Content generators per component ──

function getComponentContent(component: string, props: Record<string, any> = {}): { tag: string; selfClosing: boolean; children: string; attrs: string } {
  const disabledAttr = props.disabled ? ' disabled' : '';

  switch (component) {
    case 'button':
      return { tag: 'button', selfClosing: false, children: props.text || 'Click me', attrs: disabledAttr };
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

// ── HTML + CSS format ──

export function generateHTMLCSS(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props);
  const className = `${component}-${variant}`;

  const cssBlock = `.${className} {\n${cssObjectToString(css)}\n}\n\n.${className}:hover {\n  opacity: 0.9;\n}`;

  let htmlBlock: string;
  if (selfClosing) {
    htmlBlock = `<${tag}${attrs} class="${className}" />`;
  } else {
    htmlBlock = `<${tag}${attrs} class="${className}">\n  ${children}\n</${tag}>`;
  }

  return `<!-- HTML -->\n${htmlBlock}\n\n<style>\n${cssBlock}\n</style>`;
}

// ── React + CSS Modules format ──

export function generateReactCSSModules(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props);
  const componentName = capitalize(component);

  // Convert HTML attrs to JSX attrs
  const jsxAttrs = attrs.replace(/class=/g, 'className=');

  const cssBlock = `.${component} {\n${cssObjectToString(css)}\n}\n\n.${component}:hover {\n  opacity: 0.9;\n}`;

  let jsxBlock: string;
  if (selfClosing) {
    jsxBlock = `<${tag}${jsxAttrs} className={styles.${component}} />`;
  } else {
    jsxBlock = `<${tag}${jsxAttrs} className={styles.${component}}>\n      ${children}\n    </${tag}>`;
  }

  return `// ${componentName}.module.css\n${cssBlock}\n\n// ${componentName}.tsx\nimport styles from './${componentName}.module.css';\n\nexport default function ${componentName}() {\n  return (\n    ${jsxBlock}\n  );\n}`;
}

// ── Vue SFC format ──

export function generateVueSFC(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props);
  const componentName = capitalize(component);
  const className = `${component}-${variant}`;

  let template: string;
  if (selfClosing) {
    template = `<${tag}${attrs} class="${className}" />`;
  } else {
    template = `<${tag}${attrs} class="${className}">\n      ${children}\n    </${tag}>`;
  }

  const cssBlock = `.${className} {\n${cssObjectToString(css)}\n}\n\n.${className}:hover {\n  opacity: 0.9;\n}`;

  return `<template>\n  <div>\n    ${template}\n  </div>\n</template>\n\n<script setup lang="ts">\n// ${componentName} component\n</script>\n\n<style scoped>\n${cssBlock}\n</style>`;
}

// ── Angular format ──

export function generateAngular(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props);
  const componentName = capitalize(component);
  const selector = `app-${component}`;
  const className = `${component}-${variant}`;

  let template: string;
  if (selfClosing) {
    template = `<${tag}${attrs} class="${className}" />`;
  } else {
    template = `<${tag}${attrs} class="${className}">\n  ${children}\n</${tag}>`;
  }

  const cssBlock = `.${className} {\n${cssObjectToString(css)}\n}\n\n.${className}:hover {\n  opacity: 0.9;\n}`;

  return `// ${component}.component.ts\nimport { Component } from '@angular/core';\n\n@Component({\n  selector: '${selector}',\n  standalone: true,\n  template: \`\n    ${template}\n  \`,\n  styles: [\`\n${cssBlock}\n  \`]\n})\nexport class ${componentName}Component {}`;
}

// ── Svelte format ──

export function generateSvelte(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props);
  const className = `${component}-${variant}`;

  let template: string;
  if (selfClosing) {
    template = `<${tag}${attrs} class="${className}" />`;
  } else {
    template = `<${tag}${attrs} class="${className}">\n  ${children}\n</${tag}>`;
  }

  const cssBlock = `.${className} {\n${cssObjectToString(css)}\n}\n\n.${className}:hover {\n  opacity: 0.9;\n}`;

  return `${template}\n\n<style>\n${cssBlock}\n</style>`;
}
