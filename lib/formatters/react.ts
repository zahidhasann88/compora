import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { buildCSSFromStyles, getComponentContent, cssObjectToString, capitalize } from './utils';

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
