import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function ButtonControls({ props, updateComponentProp }: Props) {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Switch Toggles */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-2.5 bg-surface-hover/30 border border-border/50 rounded-lg">
        {[
          { label: 'Disabled', key: 'disabled' },
          { label: 'Loading', key: 'loading' },
          { label: 'Full Width', key: 'fullWidth' },
          { label: 'Pill Shape', key: 'pillShape' },
          { label: 'Transition', key: 'transition', default: true },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <label className="text-[10px] text-foreground/80">{item.label}</label>
            <input 
              type="checkbox" 
              checked={props[item.key] ?? item.default ?? false} 
              onChange={(e) => updateComponentProp(item.key, e.target.checked)}
              className="w-3.5 h-3.5 rounded border-border bg-surface text-accent focus:ring-accent accent-accent cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-foreground/80">Text</label>
          <input 
            type="text" 
            value={props.text || ''} 
            onChange={(e) => updateComponentProp('text', e.target.value)}
            className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-foreground/80">aria-label</label>
          <input 
            type="text" 
            value={props.ariaLabel || ''} 
            onChange={(e) => updateComponentProp('ariaLabel', e.target.value)}
            placeholder="optional..."
            className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none placeholder:text-muted/50 text-foreground"
          />
        </div>
      </div>

      {/* Selects Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-foreground/80">Button Type</label>
          <select
            value={props.buttonType || 'button'}
            onChange={(e) => updateComponentProp('buttonType', e.target.value)}
            className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
          >
            <option value="button">Button</option>
            <option value="submit">Submit</option>
            <option value="reset">Reset</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-foreground/80">onClick Action</label>
          <select
            value={props.onClickAction || 'console'}
            onChange={(e) => updateComponentProp('onClickAction', e.target.value)}
            className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
          >
            <option value="none">None</option>
            <option value="console">Log to console</option>
            <option value="toast">Show toast</option>
            <option value="increment">Increment</option>
            <option value="copy">Copy</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-foreground/80">Icon</label>
          <select
            value={props.icon || 'none'}
            onChange={(e) => updateComponentProp('icon', e.target.value)}
            className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
          >
            <option value="none">None</option>
            <option value="search">Search</option>
            <option value="plus">Plus</option>
            <option value="trash">Trash</option>
            <option value="download">Download</option>
            <option value="edit">Edit</option>
            <option value="check">Check</option>
            <option value="x">X</option>
            <option value="arrowRight">ArrowRight</option>
            <option value="arrowLeft">ArrowLeft</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-foreground/80">Shadow</label>
          <select
            value={props.shadowPreset || 'none'}
            onChange={(e) => updateComponentProp('shadowPreset', e.target.value)}
            className="text-[11px] rounded border border-border bg-surface px-2 py-1.5 focus:border-accent focus:outline-none text-foreground cursor-pointer"
          >
            <option value="none">None</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">X-Large</option>
          </select>
        </div>

        {props.icon && props.icon !== 'none' && (
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-[10px] text-foreground/80">Icon Position</label>
            <div className="flex gap-1 p-0.5 bg-surface-hover border border-border rounded-md">
              <button
                onClick={() => updateComponentProp('iconPosition', 'left')}
                className={`flex-1 px-2 py-1 text-[10px] font-medium rounded ${props.iconPosition === 'left' ? 'bg-surface border border-border/50 text-foreground shadow-sm' : 'text-muted hover:text-foreground border border-transparent'}`}
              >
                Left
              </button>
              <button
                onClick={() => updateComponentProp('iconPosition', 'right')}
                className={`flex-1 px-2 py-1 text-[10px] font-medium rounded ${props.iconPosition === 'right' ? 'bg-surface border border-border/50 text-foreground shadow-sm' : 'text-muted hover:text-foreground border border-transparent'}`}
              >
                Right
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
