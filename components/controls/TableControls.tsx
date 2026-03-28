import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function TableControls({ props, updateComponentProp }: Props) {
  return (
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
  );
}
