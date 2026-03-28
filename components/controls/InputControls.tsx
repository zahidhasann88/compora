import React from 'react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

const inputVariants = ['outlined', 'filled', 'underline', 'unstyled'] as const;

const iconOptions = [
  { value: 'none', label: 'None' },
  { value: 'search', label: 'Search' },
  { value: 'mail', label: 'Mail' },
  { value: 'lock', label: 'Lock' },
  { value: 'user', label: 'User' },
  { value: 'phone', label: 'Phone' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'eye', label: 'Eye' },
];

export function InputControls({ props, updateComponentProp }: Props) {
  const { styles, updateStyle } = usePlaygroundStore();

  return (
    <div className="flex flex-col gap-4">

      {/* ── Variant ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Variant</label>
        <div className="grid grid-cols-4 gap-1 p-1 bg-surface-hover border border-border rounded-lg">
          {inputVariants.map((v) => (
            <button
              key={v}
              onClick={() => updateComponentProp('inputVariant', v)}
              className={`px-1.5 py-1.5 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer text-center
                ${props.inputVariant === v
                  ? 'bg-surface border border-border/50 shadow-sm text-foreground'
                  : 'text-muted hover:text-foreground hover:bg-surface/50 border border-transparent'
                }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Colors ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Colors</label>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {[
            { label: 'Background', key: 'bgColor', isStyle: true },
            { label: 'Text', key: 'textColor', isStyle: true },
            { label: 'Border', key: 'borderColor', isStyle: true },
            { label: 'Placeholder', key: 'placeholderColor', isStyle: false },
            { label: 'Focus Ring', key: 'focusRingColor', isStyle: false },
            { label: 'Label', key: 'labelColor', isStyle: false },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between bg-surface-hover/30 border border-border/50 rounded px-2 py-1.5">
              <label className="text-[10px] text-foreground/80 truncate pr-2">{item.label}</label>
              <input
                type="color"
                value={item.isStyle ? (styles as any)[item.key] || '#000000' : props[item.key] || '#000000'}
                onChange={(e) => item.isStyle ? updateStyle(item.key as any, e.target.value) : updateComponentProp(item.key, e.target.value)}
                className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Spacing & Layout ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Spacing & Layout</label>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          {[
            { label: 'Padding', key: 'padding', min: 4, max: 32, isStyle: true },
            { label: 'Radius', key: 'borderRadius', min: 0, max: 9999, isStyle: true },
            { label: 'Font Size', key: 'fontSize', min: 10, max: 32, isStyle: true },
            { label: 'Border W.', key: 'borderWidth', min: 0, max: 8, isStyle: true },
            { label: 'Width', key: 'width', min: 100, max: 600, isStyle: true },
            { label: 'Height', key: 'height', min: 28, max: 80, isStyle: true },
            { label: 'Letter Spc.', key: 'letterSpacing', min: -2, max: 10, step: 0.5, isStyle: true },
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-foreground/80 truncate">{item.label}</label>
                <div className="flex items-center w-10 bg-surface border border-border rounded px-1 min-h-[22px]">
                  <input
                    type="text"
                    value={(styles as any)[item.key] || ''}
                    onChange={(e) => updateStyle(item.key as any, e.target.value)}
                    className="w-full bg-transparent text-[10px] font-mono text-foreground focus:outline-none text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={item.min}
                max={item.max}
                step={(item as any).step || 1}
                value={item.key === 'letterSpacing' && styles.letterSpacing === 'normal' ? 0 : parseFloat((styles as any)[item.key] === 'auto' ? '0' : (styles as any)[item.key] || '0')}
                onChange={(e) => {
                  if (item.key === 'letterSpacing' && e.target.value === '0') {
                    updateStyle(item.key as any, 'normal');
                  } else if ((item.key === 'width' || item.key === 'height') && e.target.value === '0') {
                    updateStyle(item.key as any, 'auto');
                  } else {
                    updateStyle(item.key as any, e.target.value);
                  }
                }}
                className="w-full cursor-pointer mt-1 mb-1"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Input Config ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Input Config</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Label', key: 'label', placeholder: 'Label' },
            { label: 'Placeholder', key: 'placeholder', placeholder: 'Enter text...' },
            { label: 'Helper Text', key: 'helperText', placeholder: 'Hint text...' },
            { label: 'Error Msg', key: 'errorMessage', placeholder: 'Error...' },
            { label: 'Default Val', key: 'defaultValue', placeholder: 'Value...' },
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <label className="text-[10px] text-foreground/80">{item.label}</label>
              <input
                type="text"
                value={props[item.key] || ''}
                onChange={(e) => updateComponentProp(item.key, e.target.value)}
                placeholder={item.placeholder}
                className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Input Type</label>
            <select
              value={props.inputType || 'text'}
              onChange={(e) => updateComponentProp('inputType', e.target.value)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
            >
              {['text', 'password', 'email', 'number', 'search', 'tel', 'url', 'date'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── State Toggles ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">State</label>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-2.5 bg-surface-hover/30 border border-border/50 rounded-lg">
          {[
            { label: 'Disabled', key: 'disabled' },
            { label: 'Read Only', key: 'readOnly' },
            { label: 'Required', key: 'required' },
            { label: 'Error', key: 'errorState' },
            { label: 'Loading', key: 'loading' },
            { label: 'Success', key: 'successState' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <label className="text-[10px] text-foreground/80">{item.label}</label>
              <input
                type="checkbox"
                checked={props[item.key] || false}
                onChange={(e) => updateComponentProp(item.key, e.target.checked)}
                className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Icons & Addons ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Icons & Addons</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Left Icon</label>
            <select
              value={props.leftIcon || 'none'}
              onChange={(e) => updateComponentProp('leftIcon', e.target.value)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
            >
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Right Icon</label>
            <select
              value={props.rightIcon || 'none'}
              onChange={(e) => updateComponentProp('rightIcon', e.target.value)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
            >
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Left Addon</label>
            <input
              type="text"
              value={props.leftAddon || ''}
              onChange={(e) => updateComponentProp('leftAddon', e.target.value)}
              placeholder="https://"
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Right Addon</label>
            <input
              type="text"
              value={props.rightAddon || ''}
              onChange={(e) => updateComponentProp('rightAddon', e.target.value)}
              placeholder=".com"
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-2.5 bg-surface-hover/30 border border-border/50 rounded-lg mt-1">
          <div className="flex items-center justify-between">
            <label className="text-[10px] text-foreground/80">Clear Btn</label>
            <input
              type="checkbox"
              checked={props.clearButton || false}
              onChange={(e) => updateComponentProp('clearButton', e.target.checked)}
              className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[10px] text-foreground/80">Char Count</label>
            <input
              type="checkbox"
              checked={props.charCount || false}
              onChange={(e) => updateComponentProp('charCount', e.target.checked)}
              className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
            />
          </div>
          {props.charCount && (
            <div className="flex items-center justify-between col-span-2">
              <label className="text-[10px] text-foreground/80">Max Length</label>
              <input
                type="number"
                value={props.maxLength || 100}
                onChange={(e) => updateComponentProp('maxLength', parseInt(e.target.value) || 100)}
                className="w-14 text-[11px] rounded border border-border bg-surface px-2 py-1 focus:border-accent focus:outline-none text-foreground text-right"
              />
            </div>
          )}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Font ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Font</label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] text-foreground/80">Font Weight</label>
            <select
              value={props.inputFontWeight || '400'}
              onChange={(e) => updateComponentProp('inputFontWeight', e.target.value)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
            >
              <option value="300">Light</option>
              <option value="400">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semibold</option>
              <option value="700">Bold</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Text Align</label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-surface-hover border border-border rounded-lg">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => updateComponentProp('textAlign', align)}
                  className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer text-center capitalize ${props.textAlign === align
                    ? 'bg-surface border border-border/50 text-foreground shadow-sm'
                    : 'text-muted hover:text-foreground hover:bg-surface/50 border border-transparent'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Accessibility ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Accessibility</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">aria-label</label>
            <input
              type="text"
              value={props.ariaLabel || ''}
              onChange={(e) => updateComponentProp('ariaLabel', e.target.value)}
              placeholder="optional..."
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">describedby</label>
            <input
              type="text"
              value={props.ariaDescribedBy || ''}
              onChange={(e) => updateComponentProp('ariaDescribedBy', e.target.value)}
              placeholder="optional..."
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Tab Index</label>
            <input
              type="number"
              value={props.tabIndex ?? 0}
              onChange={(e) => updateComponentProp('tabIndex', parseInt(e.target.value) || 0)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Autocomplete</label>
            <select
              value={props.autocomplete || 'off'}
              onChange={(e) => updateComponentProp('autocomplete', e.target.value)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
            >
              {['off', 'on', 'email', 'username', 'password', 'name'].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
