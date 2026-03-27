'use client';

import { create } from 'zustand';

export type ComponentType = 'button' | 'card' | 'input' | 'badge' | 'avatar' | 'select' | 'checkbox' | 'alert' | 'modal' | 'tabs' | 'navbar' | 'toast' | 'table' | 'dropdown' | 'command' | 'datepicker';
export type Variant = 'primary' | 'secondary' | 'outline';
export type Device = 'mobile' | 'tablet' | 'desktop';

export interface Styles {
  bgColor: string;
  textColor: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
}

export interface HistoryState {
  selectedComponent: ComponentType;
  styles: Styles;
  variant: Variant;
}

interface PlaygroundState {
  selectedComponent: ComponentType;
  styles: Styles;
  variant: Variant;
  device: Device;
  theme: 'light' | 'dark';
  past: HistoryState[];
  future: HistoryState[];

  setComponent: (component: ComponentType) => void;
  updateStyle: (key: keyof Styles, value: string) => void;
  setVariant: (variant: Variant) => void;
  setDevice: (device: Device) => void;
  toggleTheme: () => void;
  loadFromParams: (params: URLSearchParams) => void;
  toQueryString: () => string;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;
}

const defaultStyles: Styles = {
  bgColor: '#6366f1',
  textColor: '#ffffff',
  padding: '12',
  borderRadius: '8',
  fontSize: '16',
};

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  selectedComponent: 'button',
  styles: { ...defaultStyles },
  variant: 'primary',
  device: 'desktop',
  theme: 'dark',
  past: [],
  future: [],

  saveHistory: () => {
    const { selectedComponent, styles, variant, past } = get();
    // Only save if last state is different (shallow check avoiding duplicates)
    set({
      past: [...past, { selectedComponent, styles: { ...styles }, variant }],
      future: [], // clear future on new actions
    });
  },

  undo: () => {
    const { past, future, selectedComponent, styles, variant } = get();
    if (past.length === 0) return;
    
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    set({
      past: newPast,
      future: [{ selectedComponent, styles: { ...styles }, variant }, ...future],
      selectedComponent: previous.selectedComponent,
      styles: previous.styles,
      variant: previous.variant,
    });
  },

  redo: () => {
    const { past, future, selectedComponent, styles, variant } = get();
    if (future.length === 0) return;
    
    const next = future[0];
    const newFuture = future.slice(1);
    
    set({
      past: [...past, { selectedComponent, styles: { ...styles }, variant }],
      future: newFuture,
      selectedComponent: next.selectedComponent,
      styles: next.styles,
      variant: next.variant,
    });
  },

  setComponent: (component) => {
    get().saveHistory();
    set({ selectedComponent: component });
  },

  updateStyle: (key, value) => set((state) => ({
    styles: { ...state.styles, [key]: value },
  })),

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

    set((state) => ({
      selectedComponent: component || state.selectedComponent,
      variant: variant || state.variant,
      styles: {
        bgColor: bgColor ? `#${bgColor}` : state.styles.bgColor,
        textColor: textColor ? `#${textColor}` : state.styles.textColor,
        padding: padding || state.styles.padding,
        borderRadius: borderRadius || state.styles.borderRadius,
        fontSize: fontSize || state.styles.fontSize,
      },
    }));
  },

  toQueryString: () => {
    const { selectedComponent, variant, styles } = get();
    const params = new URLSearchParams({
      component: selectedComponent,
      variant,
      bg: styles.bgColor.replace('#', ''),
      text: styles.textColor.replace('#', ''),
      p: styles.padding,
      r: styles.borderRadius,
      fs: styles.fontSize,
    });
    return params.toString();
  },

  saveToLocalStorage: () => {
    const { selectedComponent, styles, variant } = get();
    localStorage.setItem(
      'playground-state',
      JSON.stringify({ selectedComponent, styles, variant })
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
        });
      }
    } catch {
      // ignore parse errors
    }
  },
}));
