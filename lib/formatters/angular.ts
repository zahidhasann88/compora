import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { buildCSSFromStyles, getComponentContent, cssObjectToString, capitalize } from './utils';

export function generateAngular(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props, styles);
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
