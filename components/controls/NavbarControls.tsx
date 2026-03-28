import React from 'react';

type Props = {
  props: Record<string, any>;
  updateComponentProp: (key: string, value: any) => void;
};

export function NavbarControls({ props, updateComponentProp }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">Sticky</label>
        <input 
          type="checkbox" 
          checked={props.sticky || false} 
          onChange={(e) => updateComponentProp('sticky', e.target.checked)}
          className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">Transparent</label>
        <input 
          type="checkbox" 
          checked={props.transparent || false} 
          onChange={(e) => updateComponentProp('transparent', e.target.checked)}
          className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-foreground/80">Mobile Menu</label>
        <input 
          type="checkbox" 
          checked={props.mobileMenu || false} 
          onChange={(e) => updateComponentProp('mobileMenu', e.target.checked)}
          className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent accent-accent rounded-sm cursor-pointer"
        />
      </div>
    </div>
  );
}
