import React from 'react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { ChevronUp, ChevronDown, Plus, Trash2 } from 'lucide-react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

const selectVariants = ['outlined', 'filled', 'underline', 'unstyled'] as const;

const iconOptions = [
  { value: 'none', label: 'None' },
  { value: 'search', label: 'Search' },
  { value: 'filter', label: 'Filter' },
  { value: 'tag', label: 'Tag' },
  { value: 'user', label: 'User' },
  { value: 'globe', label: 'Globe' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'flag', label: 'Flag' },
];

const chevronOptions = [
  { value: 'chevronDown', label: 'ChevronDown' },
  { value: 'chevronsUpDown', label: 'ChevronsUpDown' },
  { value: 'arrowDown', label: 'ArrowDown' },
];

export function SelectControls({ props, updateComponentProp }: Props) {
  const { styles, updateStyle } = usePlaygroundStore();
  const options = props.options || [];

  const addOption = () => {
    const newOpt = { label: `Option ${options.length + 1}`, value: `option-${options.length + 1}` };
    updateComponentProp('options', [...options, newOpt]);
  };

  const removeOption = (idx: number) => {
    updateComponentProp('options', options.filter((_: any, i: number) => i !== idx));
  };

  const updateOption = (idx: number, field: string, val: string) => {
    const updated = options.map((o: any, i: number) => i === idx ? { ...o, [field]: val } : o);
    updateComponentProp('options', updated);
  };

  const moveOption = (idx: number, dir: -1 | 1) => {
    const to = idx + dir;
    if (to < 0 || to >= options.length) return;
    const arr = [...options];
    [arr[idx], arr[to]] = [arr[to], arr[idx]];
    updateComponentProp('options', arr);
  };

  return (
    <div className="flex flex-col gap-4">

      {/* ── Variant ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Variant</label>
        <div className="grid grid-cols-4 gap-1 p-1 bg-surface-hover border border-border rounded-lg">
          {selectVariants.map((v) => (
            <button
              key={v}
              onClick={() => updateComponentProp('selectVariant', v)}
              className={`px-1.5 py-1.5 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer text-center
                ${props.selectVariant === v
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
            { label: 'Dropdown Bg', key: 'dropdownBg', isStyle: false },
            { label: 'Option Hover', key: 'optionHoverBg', isStyle: false },
            { label: 'Selected Bg', key: 'selectedOptionBg', isStyle: false },
            { label: 'Selected Text', key: 'selectedOptionText', isStyle: false },
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
            { label: 'DD Height', key: 'dropdownMaxHeight', min: 100, max: 600, isStyle: false },
            { label: 'Opt Padding', key: 'optionPadding', min: 4, max: 24, isStyle: false },
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-foreground/80 truncate">{item.label}</label>
                <div className="flex items-center w-10 bg-surface border border-border rounded px-1 min-h-[22px]">
                  <input
                    type="text"
                    value={item.isStyle ? (styles as any)[item.key] || '' : props[item.key] || ''}
                    onChange={(e) => item.isStyle ? updateStyle(item.key as any, e.target.value) : updateComponentProp(item.key, e.target.value)}
                    className="w-full bg-transparent text-[10px] font-mono text-foreground focus:outline-none text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={item.min}
                max={item.max}
                value={item.isStyle
                  ? ((styles as any)[item.key] === 'auto' ? 0 : parseFloat((styles as any)[item.key] || '0'))
                  : parseFloat(props[item.key] || '0')
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (item.isStyle && (item.key === 'width' || item.key === 'height') && val === '0') {
                    updateStyle(item.key as any, 'auto');
                  } else if (item.isStyle) {
                    updateStyle(item.key as any, val);
                  } else {
                    updateComponentProp(item.key, parseInt(val));
                  }
                }}
                className="w-full cursor-pointer mt-1 mb-1"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Select Config ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Select Config</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Label', key: 'label', placeholder: 'Label' },
            { label: 'Placeholder', key: 'placeholder', placeholder: 'Select...' },
            { label: 'Helper Text', key: 'helperText', placeholder: 'Hint...' },
            { label: 'Error Msg', key: 'errorMessage', placeholder: 'Error...' },
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
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Options Manager ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Options ({options.length})</label>
          <button
            onClick={addOption}
            className="flex items-center gap-1 text-[10px] text-accent hover:text-accent/80 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto pr-1">
          {options.map((opt: any, idx: number) => (
            <div key={idx} className="flex items-center gap-1.5 p-1.5 bg-surface-hover/30 border border-border/50 rounded">
              <div className="flex flex-col gap-0.5 shrink-0">
                <button onClick={() => moveOption(idx, -1)} className="text-muted hover:text-foreground cursor-pointer" disabled={idx === 0}>
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button onClick={() => moveOption(idx, 1)} className="text-muted hover:text-foreground cursor-pointer" disabled={idx === options.length - 1}>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <input
                type="text"
                value={opt.label}
                onChange={(e) => updateOption(idx, 'label', e.target.value)}
                className="flex-1 text-[10px] rounded border border-border bg-surface px-1.5 py-1 focus:border-accent focus:outline-none text-foreground min-w-0"
                placeholder="Label"
              />
              <input
                type="text"
                value={opt.value}
                onChange={(e) => updateOption(idx, 'value', e.target.value)}
                className="flex-1 text-[10px] rounded border border-border bg-surface px-1.5 py-1 focus:border-accent focus:outline-none text-foreground min-w-0"
                placeholder="Value"
              />
              <button onClick={() => removeOption(idx)} className="text-muted hover:text-red-400 shrink-0 cursor-pointer">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Select Type ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Select Type</label>
        <div className="grid grid-cols-4 gap-1 p-1 bg-surface-hover border border-border rounded-lg">
          {['single', 'multi', 'searchable', 'creatable'].map((t) => (
            <button
              key={t}
              onClick={() => updateComponentProp('selectType', t)}
              className={`px-1 py-1.5 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer text-center
                ${props.selectType === t
                  ? 'bg-surface border border-border/50 shadow-sm text-foreground'
                  : 'text-muted hover:text-foreground hover:bg-surface/50 border border-transparent'
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Multi-select sub-controls */}
        {props.selectType === 'multi' && (
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-2.5 bg-surface-hover/30 border border-border/50 rounded-lg mt-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-foreground/80">Show Tags</label>
              <input type="checkbox" checked={props.showTags ?? true} onChange={(e) => updateComponentProp('showTags', e.target.checked)}
                className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-foreground/80">Clearable</label>
              <input type="checkbox" checked={props.clearable ?? true} onChange={(e) => updateComponentProp('clearable', e.target.checked)}
                className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between col-span-2">
              <label className="text-[10px] text-foreground/80">Max Select</label>
              <input type="number" value={props.maxSelectable || 0} onChange={(e) => updateComponentProp('maxSelectable', parseInt(e.target.value) || 0)}
                placeholder="0=unlimited"
                className="w-16 text-[11px] rounded border border-border bg-surface px-2 py-1 focus:border-accent focus:outline-none text-foreground text-right"
              />
            </div>
            <div className="flex items-center justify-between col-span-2">
              <label className="text-[10px] text-foreground/80">Tag Color</label>
              <input type="color" value={props.tagColor || '#6366f1'} onChange={(e) => updateComponentProp('tagColor', e.target.value)}
                className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
              />
            </div>
          </div>
        )}

        {/* Searchable sub-controls */}
        {(props.selectType === 'searchable' || props.selectType === 'creatable') && (
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-foreground/80">Search Hint</label>
              <input type="text" value={props.searchPlaceholder || ''} onChange={(e) => updateComponentProp('searchPlaceholder', e.target.value)}
                placeholder="Search..."
                className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-foreground/80">No Results</label>
              <input type="text" value={props.noResultsText || ''} onChange={(e) => updateComponentProp('noResultsText', e.target.value)}
                placeholder="No options..."
                className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
              />
            </div>
          </div>
        )}

        {/* Creatable sub-controls */}
        {props.selectType === 'creatable' && (
          <div className="flex flex-col gap-1 mt-1">
            <label className="text-[10px] text-foreground/80">Create Label</label>
            <input type="text" value={props.createLabel || ''} onChange={(e) => updateComponentProp('createLabel', e.target.value)}
              placeholder="Create"
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
            />
          </div>
        )}
      </div>

      <hr className="border-border/50" />

      {/* ── State ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">State</label>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-2.5 bg-surface-hover/30 border border-border/50 rounded-lg">
          {[
            { label: 'Disabled', key: 'disabled' },
            { label: 'Read Only', key: 'readOnly' },
            { label: 'Required', key: 'required' },
            { label: 'Error', key: 'errorState' },
            { label: 'Loading', key: 'loading' },
            { label: 'Open Default', key: 'openByDefault' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <label className="text-[10px] text-foreground/80">{item.label}</label>
              <input type="checkbox" checked={props[item.key] || false} onChange={(e) => updateComponentProp(item.key, e.target.checked)}
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
            <select value={props.leftIcon || 'none'} onChange={(e) => updateComponentProp('leftIcon', e.target.value)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
            >
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Chevron</label>
            <select value={props.chevronIcon || 'chevronDown'} onChange={(e) => updateComponentProp('chevronIcon', e.target.value)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
            >
              {chevronOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-2.5 bg-surface-hover/30 border border-border/50 rounded-lg mt-1">
          <div className="flex items-center justify-between">
            <label className="text-[10px] text-foreground/80">Animate</label>
            <input type="checkbox" checked={props.chevronAnimate ?? true} onChange={(e) => updateComponentProp('chevronAnimate', e.target.checked)}
              className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[10px] text-foreground/80">Clear Btn</label>
            <input type="checkbox" checked={props.clearButton || false} onChange={(e) => updateComponentProp('clearButton', e.target.checked)}
              className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
            />
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* ── Font ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-medium text-muted uppercase tracking-wider">Font</label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] text-foreground/80">Font Weight</label>
            <select value={props.selectFontWeight || '400'} onChange={(e) => updateComponentProp('selectFontWeight', e.target.value)}
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
                <button key={align} onClick={() => updateComponentProp('textAlign', align)}
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
          {/* Option Font Size */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-foreground/80">Opt Font Size</label>
              <div className="flex items-center w-10 bg-surface border border-border rounded px-1 min-h-[22px]">
                <input type="text" value={props.optionFontSize || 14}
                  onChange={(e) => updateComponentProp('optionFontSize', parseInt(e.target.value) || 14)}
                  className="w-full bg-transparent text-[10px] font-mono text-foreground focus:outline-none text-right"
                />
              </div>
            </div>
            <input type="range" min={10} max={24} value={props.optionFontSize || 14}
              onChange={(e) => updateComponentProp('optionFontSize', parseInt(e.target.value))}
              className="w-full cursor-pointer mt-1 mb-1"
            />
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
            <input type="text" value={props.ariaLabel || ''} onChange={(e) => updateComponentProp('ariaLabel', e.target.value)}
              placeholder="optional..."
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">describedby</label>
            <input type="text" value={props.ariaDescribedBy || ''} onChange={(e) => updateComponentProp('ariaDescribedBy', e.target.value)}
              placeholder="optional..."
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-foreground/80">Tab Index</label>
            <input type="number" value={props.tabIndex ?? 0} onChange={(e) => updateComponentProp('tabIndex', parseInt(e.target.value) || 0)}
              className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
