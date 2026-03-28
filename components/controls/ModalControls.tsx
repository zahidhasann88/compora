import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function ModalControls({ props, updateComponentProp }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">Backdrop Blur</label>
        <select
          value={props.backdrop || 'sm'}
          onChange={(e) => updateComponentProp('backdrop', e.target.value)}
          className="text-xs rounded border border-border bg-surface px-2 py-1 w-24 outline-none focus:border-accent cursor-pointer"
        >
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
        </select>
      </div>
    </div>
  );
}
