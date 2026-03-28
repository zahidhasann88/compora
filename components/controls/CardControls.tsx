import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function CardControls({ props, updateComponentProp }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">Shadow</label>
        <select
          value={props.shadow || 'md'}
          onChange={(e) => updateComponentProp('shadow', e.target.value)}
          className="text-xs rounded border border-border bg-surface px-2 py-1 w-24 outline-none focus:border-accent cursor-pointer"
        >
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">X-Large</option>
        </select>
      </div>
    </div>
  );
}
