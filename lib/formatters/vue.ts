import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { buildCSSFromStyles, getComponentContent, cssObjectToString, capitalize } from './utils';

export function generateVueSFC(component: string, styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const css = buildCSSFromStyles(styles, variant, component, props);
  const { tag, selfClosing, children, attrs } = getComponentContent(component, props, styles);
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
