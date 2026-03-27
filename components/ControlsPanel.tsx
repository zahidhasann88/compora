'use client';

import { usePlaygroundStore, type Variant } from '@/store/usePlaygroundStore';

const variants: Variant[] = ['primary', 'secondary', 'outline'];

export default function ControlsPanel() {
  const { styles, variant, updateStyle, setVariant, selectedComponent } =
    usePlaygroundStore();

  return (
    <div className="glass-panel p-5 flex flex-col gap-5 overflow-y-auto">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
        Controls
      </h2>

      {/* ── Variant Toggle ── */}
      <div>
        <label className="text-xs text-muted block mb-2">Variant</label>
        <div className="flex gap-1 p-1 bg-background rounded-lg">
          {variants.map((v) => (
            <button
              key={v}
              id={`variant-${v}`}
              onClick={() => setVariant(v)}
              className={`
                flex-1 px-3 py-1.5 rounded-md text-xs font-medium capitalize
                transition-all duration-200 cursor-pointer
                ${
                  variant === v
                    ? 'bg-accent text-white shadow-md'
                    : 'text-muted hover:text-foreground'
                }
              `}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── Colors ── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted block mb-2">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              id="control-bgColor"
              value={styles.bgColor}
              onChange={(e) => updateStyle('bgColor', e.target.value)}
            />
            <span className="text-xs font-mono text-muted">{styles.bgColor}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-muted block mb-2">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              id="control-textColor"
              value={styles.textColor}
              onChange={(e) => updateStyle('textColor', e.target.value)}
            />
            <span className="text-xs font-mono text-muted">{styles.textColor}</span>
          </div>
        </div>
      </div>

      {/* ── Padding ── */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-xs text-muted">Padding</label>
          <span className="text-xs font-mono text-accent">{styles.padding}px</span>
        </div>
        <input
          type="range"
          id="control-padding"
          min="4"
          max="48"
          value={styles.padding}
          onChange={(e) => updateStyle('padding', e.target.value)}
        />
      </div>

      {/* ── Border Radius ── */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-xs text-muted">Border Radius</label>
          <span className="text-xs font-mono text-accent">{styles.borderRadius}px</span>
        </div>
        <input
          type="range"
          id="control-borderRadius"
          min="0"
          max="50"
          value={styles.borderRadius}
          onChange={(e) => updateStyle('borderRadius', e.target.value)}
        />
      </div>

      {/* ── Font Size ── */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-xs text-muted">Font Size</label>
          <span className="text-xs font-mono text-accent">{styles.fontSize}px</span>
        </div>
        <input
          type="range"
          id="control-fontSize"
          min="10"
          max="32"
          value={styles.fontSize}
          onChange={(e) => updateStyle('fontSize', e.target.value)}
        />
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
