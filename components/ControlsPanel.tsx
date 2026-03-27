'use client';

import { usePlaygroundStore, type Variant } from '@/store/usePlaygroundStore';

const variants: Variant[] = ['primary', 'secondary', 'outline'];

export default function ControlsPanel() {
  const { styles, variant, updateStyle, setVariant, selectedComponent } =
    usePlaygroundStore();

  return (
    <div className="py-5 px-5 flex flex-col gap-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Properties
        </h2>
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

      {/* ── Component-specific info ── */}
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-xs text-muted">
          Editing: <span className="text-accent capitalize font-medium">{selectedComponent}</span>
        </p>
      </div>
    </div>
  );
}
