import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { buildCSSFromStyles, getComponentContent, cssObjectToString } from './utils';

export function generateSvelte(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props, styles);
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
