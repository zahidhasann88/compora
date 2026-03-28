import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function InputControls({ props, updateComponentProp }: Props) {
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
        <label className="text-xs text-foreground/80">Placeholder</label>
        <input 
          type="text" 
          value={props.placeholder || ''} 
          onChange={(e) => updateComponentProp('placeholder', e.target.value)}
          className="text-xs rounded border border-border bg-surface px-2 py-1 w-32 text-right focus:border-accent focus:outline-none"
        />
      </div>
    </div>
  );
}
