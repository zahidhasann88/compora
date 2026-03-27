'use client';

import { usePlaygroundStore, type ComponentType } from '@/store/usePlaygroundStore';
import { RectangleHorizontal, CreditCard, TextCursorInput, Tag, User, List, CheckSquare, AlertCircle } from 'lucide-react';

const components: { id: ComponentType; label: string; icon: React.ReactNode }[] = [
  { id: 'button', label: 'Button', icon: <RectangleHorizontal size={20} /> },
  { id: 'card', label: 'Card', icon: <CreditCard size={20} /> },
  { id: 'input', label: 'Input', icon: <TextCursorInput size={20} /> },
  { id: 'badge', label: 'Badge', icon: <Tag size={20} /> },
  { id: 'avatar', label: 'Avatar', icon: <User size={20} /> },
  { id: 'select', label: 'Select', icon: <List size={20} /> },
  { id: 'checkbox', label: 'Checkbox', icon: <CheckSquare size={20} /> },
  { id: 'alert', label: 'Alert', icon: <AlertCircle size={20} /> },
];

export default function ComponentSelector() {
  const { selectedComponent, setComponent } = usePlaygroundStore();

  return (
    <div className="glass-panel p-4 flex flex-col gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
        Components
      </h2>
      {components.map((comp) => {
        const isActive = selectedComponent === comp.id;
        return (
          <button
            key={comp.id}
            id={`selector-${comp.id}`}
            onClick={() => setComponent(comp.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
              transition-all duration-200 cursor-pointer border
              ${
                isActive
                  ? 'bg-accent/15 text-accent border-accent/30 shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                  : 'bg-transparent text-foreground/70 border-transparent hover:bg-surface-hover hover:text-foreground'
              }
            `}
          >
            <span className={isActive ? 'text-accent' : 'text-muted'}>{comp.icon}</span>
            {comp.label}
          </button>
        );
      })}
    </div>
  );
}
