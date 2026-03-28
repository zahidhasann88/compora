'use client';

import { create } from 'zustand';
import type { CodeFormat } from '@/lib/codeFormatGenerator';

export type ComponentType = 'button' | 'card' | 'input' | 'badge' | 'avatar' | 'select' | 'checkbox' | 'alert' | 'modal' | 'tabs' | 'navbar' | 'toast' | 'table' | 'dropdown' | 'command' | 'datepicker';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type Device = 'mobile' | 'tablet' | 'desktop';
export type PreviewBg = 'dots' | 'checkered' | 'surface' | 'white' | 'dark';

export interface Styles {
  bgColor: string;
  textColor: string;
  borderColor: string;
  hoverBgColor: string;
  boxShadowColor: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
  width: string;
  height: string;
  gap: string;
  borderWidth: string;
  letterSpacing: string;
  fontWeight: string;
}

export interface HistoryState {
  selectedComponent: ComponentType;
  styles: Styles;
  variant: Variant;
  componentProps: Record<string, any>;
}

interface PlaygroundState {
  selectedComponent: ComponentType;
  styles: Styles;
  variant: Variant;
  componentProps: Record<string, any>;
  device: Device;
  previewBg: PreviewBg;
  theme: 'light' | 'dark';
  past: HistoryState[];
  future: HistoryState[];

  setComponent: (component: ComponentType) => void;
  updateStyle: (key: keyof Styles, value: string) => void;
  updateComponentProp: (key: string, value: any) => void;
  setVariant: (variant: Variant) => void;
  setDevice: (device: Device) => void;
  setPreviewBg: (bg: PreviewBg) => void;
  codeFormat: CodeFormat;
  setCodeFormat: (format: CodeFormat) => void;
  toggleTheme: () => void;
  loadFromParams: (params: URLSearchParams) => void;
  toQueryString: () => string;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;
  resetStyles: () => void;
}

const defaultStyles: Styles = {
  bgColor: '#6366f1',
  textColor: '#ffffff',
  borderColor: '#6366f1',
  hoverBgColor: '#4f46e5',
  boxShadowColor: '#000000',
  padding: '12',
  borderRadius: '8',
  fontSize: '16',
  width: 'auto',
  height: 'auto',
  gap: '8',
  borderWidth: '0',
  letterSpacing: '0',
  fontWeight: '600',
};

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  selectedComponent: 'button',
  styles: { ...defaultStyles },
  variant: 'primary',
  componentProps: {
    // Defaults for specific components
    button: { disabled: false, text: 'Click me', loading: false, fullWidth: false, withIcon: false, icon: 'none', iconPosition: 'left', buttonType: 'button', onClickAction: 'console', ariaLabel: '', pillShape: false, shadowPreset: 'none', transition: true },
    card: { shadow: 'md' },
    input: {
      inputVariant: 'outlined',
      placeholderColor: '#71717a', focusRingColor: '#6366f1', labelColor: '#e4e4e7',
      label: 'Label', placeholder: 'Enter text...', helperText: '', errorMessage: 'This field is required', defaultValue: '',
      inputType: 'text',
      disabled: false, readOnly: false, required: false, errorState: false, loading: false, successState: false,
      leftIcon: 'none', rightIcon: 'none',
      leftAddon: '', rightAddon: '', clearButton: false, charCount: false, maxLength: 100,
      inputFontWeight: '400', textAlign: 'left',
      ariaLabel: '', ariaDescribedBy: '', tabIndex: 0, autocomplete: 'off',
    },
    select: {
      selectVariant: 'outlined',
      placeholderColor: '#71717a', focusRingColor: '#6366f1', labelColor: '#e4e4e7',
      dropdownBg: '#1e1e2e', optionHoverBg: '#2a2a3e', selectedOptionBg: '#6366f1', selectedOptionText: '#ffffff',
      dropdownMaxHeight: 300, optionPadding: 8, optionFontSize: 14,
      label: 'Label', placeholder: 'Select an option...', helperText: '', errorMessage: 'This field is required',
      options: [
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
        { label: 'Option 3', value: 'option-3' },
        { label: 'Option 4', value: 'option-4' },
        { label: 'Option 5', value: 'option-5' },
      ],
      selectType: 'single',
      maxSelectable: 0, showTags: true, tagColor: '#6366f1', clearable: true,
      searchPlaceholder: 'Search...', noResultsText: 'No options found',
      createLabel: 'Create',
      disabled: false, readOnly: false, required: false, errorState: false, loading: false, openByDefault: false,
      leftIcon: 'none', chevronIcon: 'chevronDown', chevronAnimate: true, clearButton: false,
      selectFontWeight: '400', textAlign: 'left',
      ariaLabel: '', ariaDescribedBy: '', tabIndex: 0,
    },
    badge: { showDot: false },
    modal: { backdrop: 'sm' },
    table: { striped: true, hoverable: true }
  },
  device: 'desktop',
  previewBg: 'dots',
  theme: 'dark',
  past: [],
  future: [],
  setPreviewBg: (bg) => set({ previewBg: bg }),
  codeFormat: 'jsx-tailwind',

  setCodeFormat: (format) => set({ codeFormat: format }),

  resetStyles: () => {
    get().saveHistory();
    set({ styles: { ...defaultStyles }, variant: 'primary', componentProps: {
      button: { disabled: false, text: 'Click me', loading: false, fullWidth: false, withIcon: false, icon: 'none', iconPosition: 'left', buttonType: 'button', onClickAction: 'console', ariaLabel: '', pillShape: false, shadowPreset: 'none', transition: true },
      card: { shadow: 'md' },
      input: {
        inputVariant: 'outlined',
        placeholderColor: '#71717a', focusRingColor: '#6366f1', labelColor: '#e4e4e7',
        label: 'Label', placeholder: 'Enter text...', helperText: '', errorMessage: 'This field is required', defaultValue: '',
        inputType: 'text',
        disabled: false, readOnly: false, required: false, errorState: false, loading: false, successState: false,
        leftIcon: 'none', rightIcon: 'none',
        leftAddon: '', rightAddon: '', clearButton: false, charCount: false, maxLength: 100,
        inputFontWeight: '400', textAlign: 'left',
        ariaLabel: '', ariaDescribedBy: '', tabIndex: 0, autocomplete: 'off',
      },
      select: {
        selectVariant: 'outlined',
        placeholderColor: '#71717a', focusRingColor: '#6366f1', labelColor: '#e4e4e7',
        dropdownBg: '#1e1e2e', optionHoverBg: '#2a2a3e', selectedOptionBg: '#6366f1', selectedOptionText: '#ffffff',
        dropdownMaxHeight: 300, optionPadding: 8, optionFontSize: 14,
        label: 'Label', placeholder: 'Select an option...', helperText: '', errorMessage: 'This field is required',
        options: [
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
          { label: 'Option 3', value: 'option-3' },
          { label: 'Option 4', value: 'option-4' },
          { label: 'Option 5', value: 'option-5' },
        ],
        selectType: 'single',
        maxSelectable: 0, showTags: true, tagColor: '#6366f1', clearable: true,
        searchPlaceholder: 'Search...', noResultsText: 'No options found',
        createLabel: 'Create',
        disabled: false, readOnly: false, required: false, errorState: false, loading: false, openByDefault: false,
        leftIcon: 'none', chevronIcon: 'chevronDown', chevronAnimate: true, clearButton: false,
        selectFontWeight: '400', textAlign: 'left',
        ariaLabel: '', ariaDescribedBy: '', tabIndex: 0,
      },
      badge: { showDot: false },
      modal: { backdrop: 'sm' },
      table: { striped: true, hoverable: true }
    } });
  },

  saveHistory: () => {
    const { selectedComponent, styles, variant, componentProps, past } = get();
    // Only save if last state is different (shallow check avoiding duplicates)
    set({
      past: [...past, { selectedComponent, styles: { ...styles }, variant, componentProps: { ...componentProps } }],
      future: [], // clear future on new actions
    });
  },

  undo: () => {
    const { past, future, selectedComponent, styles, variant, componentProps } = get();
    if (past.length === 0) return;
    
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    set({
      past: newPast,
      future: [{ selectedComponent, styles: { ...styles }, variant, componentProps: { ...componentProps } }, ...future],
      selectedComponent: previous.selectedComponent,
      styles: previous.styles,
      variant: previous.variant,
      componentProps: previous.componentProps,
    });
  },

  redo: () => {
    const { past, future, selectedComponent, styles, variant, componentProps } = get();
    if (future.length === 0) return;
    
    const next = future[0];
    const newFuture = future.slice(1);
    
    set({
      past: [...past, { selectedComponent, styles: { ...styles }, variant, componentProps: { ...componentProps } }],
      future: newFuture,
      selectedComponent: next.selectedComponent,
      styles: next.styles,
      variant: next.variant,
      componentProps: next.componentProps,
    });
  },

  setComponent: (component) => {
    get().saveHistory();
    set({ selectedComponent: component });
  },

  updateStyle: (key, value) => {
    get().saveHistory();
    set((state) => ({
      styles: { ...state.styles, [key]: value },
    }));
  },

  updateComponentProp: (key, value) => {
    get().saveHistory();
    const { selectedComponent } = get();
    set((state) => ({
      componentProps: {
        ...state.componentProps,
        [selectedComponent]: {
          ...(state.componentProps[selectedComponent] || {}),
          [key]: value
        }
      }
    }));
  },

  setVariant: (variant) => {
    get().saveHistory();
    set({ variant });
  },

  setDevice: (device) => set({ device }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),

  loadFromParams: (params) => {
    const component = params.get('component') as ComponentType | null;
    const variant = params.get('variant') as Variant | null;
    const bgColor = params.get('bg');
    const textColor = params.get('text');
    const padding = params.get('p');
    const borderRadius = params.get('r');
    const fontSize = params.get('fs');
    const bgPattern = params.get('pbg') as PreviewBg | null;

    set((state) => ({
      selectedComponent: component || state.selectedComponent,
      variant: variant || state.variant,
      styles: {
        ...state.styles,
        bgColor: bgColor ? `#${bgColor}` : state.styles.bgColor,
        textColor: textColor ? `#${textColor}` : state.styles.textColor,
        padding: padding || state.styles.padding,
        borderRadius: borderRadius || state.styles.borderRadius,
        fontSize: fontSize || state.styles.fontSize,
      },
      previewBg: bgPattern || state.previewBg,
    }));
  },

  toQueryString: () => {
    const { selectedComponent, variant, styles, previewBg, componentProps } = get();
    const params = new URLSearchParams({
      component: selectedComponent,
      variant,
      bg: styles.bgColor.replace('#', ''),
      text: styles.textColor.replace('#', ''),
      p: styles.padding,
      r: styles.borderRadius,
      fs: styles.fontSize,
    });
    
    // Serialize specifically the active component's props to save space
    if (componentProps[selectedComponent]) {
      const activeProps = componentProps[selectedComponent];
      Object.keys(activeProps).forEach(key => {
        params.set(`p_${key}`, activeProps[key].toString());
      });
    }

    return params.toString();
  },

  saveToLocalStorage: () => {
    const { selectedComponent, styles, variant, componentProps } = get();
    localStorage.setItem(
      'playground-state',
      JSON.stringify({ selectedComponent, styles, variant, componentProps })
    );
  },

  loadFromLocalStorage: () => {
    try {
      const saved = localStorage.getItem('playground-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        set({
          selectedComponent: parsed.selectedComponent,
          styles: parsed.styles,
          variant: parsed.variant,
          componentProps: parsed.componentProps || get().componentProps,
        });
      }
    } catch {
      // ignore parse errors
    }
  },
}));
