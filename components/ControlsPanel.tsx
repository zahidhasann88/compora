'use client';

import { usePlaygroundStore, type Variant } from '@/store/usePlaygroundStore';
import { RotateCcw } from 'lucide-react';

const variants: Variant[] = ['primary', 'secondary', 'outline'];

export default function ControlsPanel() {
  const { styles, variant, updateStyle, setVariant, selectedComponent, resetStyles, componentProps, updateComponentProp } =
    usePlaygroundStore();

  const props = componentProps[selectedComponent] || {};

  return (
    <div className="py-5 px-5 flex flex-col gap-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Properties
        </h2>
        <button
          onClick={resetStyles}
          title="Reset to defaults"
          className="p-1.5 text-muted hover:text-foreground hover:bg-surface-hover rounded-md transition-all duration-200"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* ── Variant Toggle ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted">Variant</label>
        <div className="flex gap-1 p-1 bg-surface-hover border border-border rounded-lg">
          {variants.map((v) => (
            <button
              key={v}
              id={`variant-${v}`}
              onClick={() => setVariant(v)}
              className={`
                flex-1 px-3 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider
                transition-all duration-200 cursor-pointer
                ${
                  variant === v
                    ? 'bg-surface border border-border/50 shadow-sm text-foreground'
                    : 'text-muted hover:text-foreground hover:bg-surface/50 border border-transparent'
                }
              `}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Colors ── */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-medium text-muted">Colors</label>
        
        <div className="flex items-center justify-between">
          <label className="text-xs text-foreground/80">Background</label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-muted uppercase">{styles.bgColor}</span>
            <input
              type="color"
              id="control-bgColor"
              value={styles.bgColor}
              onChange={(e) => updateStyle('bgColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-xs text-foreground/80">Text Color</label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-muted uppercase">{styles.textColor}</span>
            <input
              type="color"
              id="control-textColor"
              value={styles.textColor}
              onChange={(e) => updateStyle('textColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Spacing & Layout ── */}
      <div className="flex flex-col gap-4">
        <label className="text-xs font-medium text-muted">Spacing & Layout</label>
        
        {/* Padding */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label className="text-xs text-foreground/80">Padding</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              id="control-padding"
              min="4"
              max="48"
              value={styles.padding}
              onChange={(e) => updateStyle('padding', e.target.value)}
              className="flex-1"
            />
            <div className="flex items-center w-14 bg-surface-hover border border-border rounded px-1.5 py-1">
              <input
                type="number"
                value={styles.padding}
                onChange={(e) => updateStyle('padding', e.target.value)}
                className="w-full bg-transparent text-[11px] font-mono text-foreground focus:outline-none text-right"
              />
            </div>
          </div>
        </div>

        {/* Border Radius */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label className="text-xs text-foreground/80">Border Radius</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              id="control-borderRadius"
              min="0"
              max="50"
              value={styles.borderRadius}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              className="flex-1"
            />
            <div className="flex items-center w-14 bg-surface-hover border border-border rounded px-1.5 py-1">
              <input
                type="number"
                value={styles.borderRadius}
                onChange={(e) => updateStyle('borderRadius', e.target.value)}
                className="w-full bg-transparent text-[11px] font-mono text-foreground focus:outline-none text-right"
              />
            </div>
          </div>
        </div>

        {/* Font Size */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label className="text-xs text-foreground/80">Font Size</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              id="control-fontSize"
              min="10"
              max="32"
              value={styles.fontSize}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              className="flex-1"
            />
            <div className="flex items-center w-14 bg-surface-hover border border-border rounded px-1.5 py-1">
              <input
                type="number"
                value={styles.fontSize}
                onChange={(e) => updateStyle('fontSize', e.target.value)}
                className="w-full bg-transparent text-[11px] font-mono text-foreground focus:outline-none text-right"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Component Properties ── */}
      <div className="flex flex-col gap-4">
        <label className="text-xs font-medium text-muted capitalize">{selectedComponent} Config</label>
        
        {/* Component: Button */}
        {selectedComponent === 'button' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Disabled</label>
              <input 
                type="checkbox" 
                checked={props.disabled || false} 
                onChange={(e) => updateComponentProp('disabled', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Text</label>
              <input 
                type="text" 
                value={props.text || ''} 
                onChange={(e) => updateComponentProp('text', e.target.value)}
                className="text-xs rounded border border-border bg-surface px-2 py-1 w-24 text-right focus:border-accent focus:outline-none placeholder:text-muted/50"
              />
            </div>
          </div>
        )}

        {/* Component: Card */}
        {selectedComponent === 'card' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Shadow</label>
              <select
                value={props.shadow || 'md'}
                onChange={(e) => updateComponentProp('shadow', e.target.value)}
                className="text-xs rounded border border-border bg-surface px-2 py-1 w-24 outline-none focus:border-accent cursor-pointer"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">X-Large</option>
              </select>
            </div>
          </div>
        )}

        {/* Component: Input */}
        {selectedComponent === 'input' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Disabled</label>
              <input 
                type="checkbox" 
                checked={props.disabled || false} 
                onChange={(e) => updateComponentProp('disabled', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Placeholder</label>
              <input 
                type="text" 
                value={props.placeholder || ''} 
                onChange={(e) => updateComponentProp('placeholder', e.target.value)}
                className="text-xs rounded border border-border bg-surface px-2 py-1 w-32 text-right focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Component: Badge */}
        {selectedComponent === 'badge' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Show Dot</label>
              <input 
                type="checkbox" 
                checked={props.showDot || false} 
                onChange={(e) => updateComponentProp('showDot', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Component: Modal */}
        {selectedComponent === 'modal' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Backdrop Blur</label>
              <select
                value={props.backdrop || 'sm'}
                onChange={(e) => updateComponentProp('backdrop', e.target.value)}
                className="text-xs rounded border border-border bg-surface px-2 py-1 w-24 outline-none focus:border-accent cursor-pointer"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
              </select>
            </div>
          </div>
        )}

        {/* Component: Navbar */}
        {selectedComponent === 'navbar' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Sticky</label>
              <input 
                type="checkbox" 
                checked={props.sticky || false} 
                onChange={(e) => updateComponentProp('sticky', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Transparent</label>
              <input 
                type="checkbox" 
                checked={props.transparent || false} 
                onChange={(e) => updateComponentProp('transparent', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Mobile Menu</label>
              <input 
                type="checkbox" 
                checked={props.mobileMenu || false} 
                onChange={(e) => updateComponentProp('mobileMenu', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Component: Table */}
        {selectedComponent === 'table' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Striped Rows</label>
              <input 
                type="checkbox" 
                checked={props.striped ?? true} 
                onChange={(e) => updateComponentProp('striped', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-foreground/80">Hover effect</label>
              <input 
                type="checkbox" 
                checked={props.hoverable ?? true} 
                onChange={(e) => updateComponentProp('hoverable', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Fallback for components without custom controls yet */}
        {['button', 'card', 'input', 'badge', 'modal', 'table'].indexOf(selectedComponent) === -1 && (
          <p className="text-[11px] text-muted/70 italic">
            More controls available soon.
          </p>
        )}
      </div>

      {/* ── Component-specific info ── */}
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-xs text-muted">
          Editing: <span className="text-accent capitalize font-medium">{selectedComponent}</span>
        </p>
      </div>
    </div>
  );
}
