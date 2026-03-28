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
