'use client';

import { usePlaygroundStore, type Variant } from '@/store/usePlaygroundStore';
import { RotateCcw } from 'lucide-react';

import { ButtonControls } from './controls/ButtonControls';
import { CardControls } from './controls/CardControls';
import { InputControls } from './controls/InputControls';
import { BadgeControls } from './controls/BadgeControls';
import { ModalControls } from './controls/ModalControls';
import { NavbarControls } from './controls/NavbarControls';
import { TableControls } from './controls/TableControls';

const variants: Variant[] = ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'];

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
        <div className="grid grid-cols-3 gap-1 p-1 bg-surface-hover border border-border rounded-lg">
          {variants.map((v) => (
            <button
              key={v}
              id={`variant-${v}`}
              onClick={() => setVariant(v)}
              className={`
                flex-1 px-2 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider
                transition-all duration-200 cursor-pointer text-center
                ${variant === v
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
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-muted">Colors</label>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {[
            { label: 'Background', key: 'bgColor' as keyof typeof styles },
            { label: 'Text', key: 'textColor' as keyof typeof styles },
            { label: 'Border', key: 'borderColor' as keyof typeof styles },
            { label: 'Hover Bg', key: 'hoverBgColor' as keyof typeof styles },
            { label: 'Shadow', key: 'boxShadowColor' as keyof typeof styles },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between bg-surface-hover/30 border border-border/50 rounded px-2 py-1.5">
              <label className="text-[10px] text-foreground/80 truncate pr-2">{item.label}</label>
              <input
                type="color"
                id={`control-${item.key}`}
                value={styles[item.key] || '#000000'}
                onChange={(e) => updateStyle(item.key, e.target.value)}
                className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Spacing & Layout ── */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-medium text-muted">Layout & Spacing</label>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          {[
            { label: 'Padding', key: 'padding', type: 'range', min: 4, max: 48 },
            { label: 'Radius', key: 'borderRadius', type: 'range', min: 0, max: 50 },
            { label: 'Font Size', key: 'fontSize', type: 'range', min: 10, max: 32 },
            { label: 'Gap', key: 'gap', type: 'range', min: 0, max: 32 },
            { label: 'Border W.', key: 'borderWidth', type: 'range', min: 0, max: 8 },
            { label: 'Letter Spc.', key: 'letterSpacing', type: 'range', min: -2, max: 10, step: 0.5 },
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-foreground/80 truncate">{item.label}</label>
                <div className="flex items-center w-10 bg-surface border border-border rounded px-1 min-h-[22px]">
                  <input
                    type="text"
                    value={styles[item.key as keyof typeof styles] || ''}
                    onChange={(e) => updateStyle(item.key as keyof typeof styles, e.target.value)}
                    className="w-full bg-transparent text-[10px] font-mono text-foreground focus:outline-none text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={item.min}
                max={item.max}
                step={item.step || 1}
                value={(item.key === 'letterSpacing' && styles.letterSpacing === 'normal') ? 0 : parseFloat(styles[item.key as keyof typeof styles] || '0')}
                onChange={(e) => updateStyle(item.key as keyof typeof styles, (item.key === 'letterSpacing' && e.target.value === '0') ? 'normal' : e.target.value)}
                className="w-full cursor-pointer mt-2 mb-1"
              />
            </div>
          ))}

          {/* Width & Height */}
          {[
            { label: 'Width', key: 'width', max: 400 },
            { label: 'Height', key: 'height', max: 200 },
          ].map((item) => (
            <div key={item.key} className={`flex flex-col gap-1 ${item.key === 'width' && props.fullWidth ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-foreground/80 truncate">{item.label}</label>
                <div className="flex items-center w-10 bg-surface border border-border rounded px-1 min-h-[22px]">
                  <input
                    type="text"
                    value={styles[item.key as keyof typeof styles] || ''}
                    onChange={(e) => updateStyle(item.key as keyof typeof styles, e.target.value)}
                    className="w-full bg-transparent text-[10px] font-mono text-foreground focus:outline-none text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={item.max}
                value={styles[item.key as keyof typeof styles] === 'auto' ? 0 : parseInt(styles[item.key as keyof typeof styles] || '0') || 0}
                onChange={(e) => updateStyle(item.key as keyof typeof styles, e.target.value === '0' ? 'auto' : e.target.value)}
                className="w-full cursor-pointer mt-2 mb-1"
              />
            </div>
          ))}
        </div>

        {/* Font Weight */}
        <div className="flex items-center justify-between mt-1">
          <label className="text-xs text-foreground/80">Font Weight</label>
          <select
            value={styles.fontWeight}
            onChange={(e) => updateStyle('fontWeight', e.target.value)}
            className="text-[11px] rounded border border-border bg-surface px-2 py-1 focus:border-accent focus:outline-none text-foreground cursor-pointer"
          >
            <option value="300">Light</option>
            <option value="400">Normal</option>
            <option value="500">Medium</option>
            <option value="600">Semibold</option>
            <option value="700">Bold</option>
          </select>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Component Properties ── */}
      <div className="flex flex-col gap-4">
        <label className="text-xs font-medium text-muted capitalize">{selectedComponent} Config</label>

        {selectedComponent === 'button' && <ButtonControls props={props} updateComponentProp={updateComponentProp} />}
        {selectedComponent === 'card' && <CardControls props={props} updateComponentProp={updateComponentProp} />}
        {selectedComponent === 'input' && <InputControls props={props} updateComponentProp={updateComponentProp} />}
        {selectedComponent === 'badge' && <BadgeControls props={props} updateComponentProp={updateComponentProp} />}
        {selectedComponent === 'modal' && <ModalControls props={props} updateComponentProp={updateComponentProp} />}
        {selectedComponent === 'navbar' && <NavbarControls props={props} updateComponentProp={updateComponentProp} />}
        {selectedComponent === 'table' && <TableControls props={props} updateComponentProp={updateComponentProp} />}

        {/* Fallback for components without custom controls yet */}
        {['button', 'card', 'input', 'badge', 'modal', 'navbar', 'table'].indexOf(selectedComponent) === -1 && (
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
