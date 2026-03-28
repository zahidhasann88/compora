import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function BadgeControls({ props, updateComponentProp }: Props) {
  return (
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
  );
}
