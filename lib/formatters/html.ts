import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { buildCSSFromStyles, getComponentContent, cssObjectToString } from './utils';

export function generateHTMLCSS(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props, styles);
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
