import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function ButtonControls({ props, updateComponentProp }: Props) {
  return (
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
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">Loading</label>
        <input 
          type="checkbox" 
          checked={props.loading || false} 
          onChange={(e) => updateComponentProp('loading', e.target.checked)}
          className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">Full Width</label>
        <input 
          type="checkbox" 
          checked={props.fullWidth || false} 
          onChange={(e) => updateComponentProp('fullWidth', e.target.checked)}
          className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">With Icon</label>
        <input 
          type="checkbox" 
          checked={props.withIcon || false} 
          onChange={(e) => updateComponentProp('withIcon', e.target.checked)}
          className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
        />
      </div>
    </div>
  );
}
