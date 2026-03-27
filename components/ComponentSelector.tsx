'use client';

import { usePlaygroundStore, type ComponentType } from '@/store/usePlaygroundStore';
import { RectangleHorizontal, CreditCard, TextCursorInput, Tag, User, List, CheckSquare, AlertCircle, AppWindow, Layout, Navigation, MessageSquare, Table, MoreHorizontal, Command, CalendarDays, FolderOpen } from 'lucide-react';

const componentGroups: { category: string; items: { id: ComponentType; label: string; icon: React.ReactNode }[] }[] = [
  {
    category: 'Basic Inputs',
    items: [
      { id: 'button', label: 'Button', icon: <RectangleHorizontal size={16} /> },
      { id: 'input', label: 'Input', icon: <TextCursorInput size={16} /> },
      { id: 'select', label: 'Select', icon: <List size={16} /> },
      { id: 'checkbox', label: 'Checkbox', icon: <CheckSquare size={16} /> },
    ]
  },
  {
    category: 'Data Display',
    items: [
      { id: 'card', label: 'Card', icon: <CreditCard size={16} /> },
      { id: 'badge', label: 'Badge', icon: <Tag size={16} /> },
      { id: 'avatar', label: 'Avatar', icon: <User size={16} /> },
      { id: 'table', label: 'Table', icon: <Table size={16} /> },
    ]
  },
  {
    category: 'Feedback',
    items: [
      { id: 'alert', label: 'Alert', icon: <AlertCircle size={16} /> },
      { id: 'modal', label: 'Modal', icon: <AppWindow size={16} /> },
      { id: 'toast', label: 'Toast', icon: <MessageSquare size={16} /> },
    ]
  },
  {
    category: 'Navigation & Actions',
    items: [
      { id: 'tabs', label: 'Tabs', icon: <Layout size={16} /> },
      { id: 'navbar', label: 'Navbar', icon: <Navigation size={16} /> },
      { id: 'dropdown', label: 'Dropdown', icon: <MoreHorizontal size={16} /> },
      { id: 'command', label: 'Command Palette', icon: <Command size={16} /> },
      { id: 'datepicker', label: 'Date Picker', icon: <CalendarDays size={16} /> },
    ]
  }
];

export default function ComponentSelector() {
  const { selectedComponent, setComponent } = usePlaygroundStore();

  return (
    <div className="py-4 flex flex-col gap-6">
      <div className="px-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Explorer</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {componentGroups.map((group) => (
          <div key={group.category} className="flex flex-col gap-1">
            <div className="px-5 flex items-center gap-2 mb-1">
              <FolderOpen size={14} className="text-muted/70" />
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted/80">
                {group.category}
              </h3>
            </div>
            
            <div className="flex flex-col">
              {group.items.map((comp) => {
                const isActive = selectedComponent === comp.id;
                return (
                  <button
                    key={comp.id}
                    id={`selector-${comp.id}`}
                    onClick={() => setComponent(comp.id)}
                    className={`
                      flex items-center w-full px-5 py-1.5 text-sm font-medium
                      transition-colors cursor-pointer text-left focus:outline-none flex gap-3
                      ${
                        isActive
                          ? 'bg-accent/10 text-accent border-r-2 border-accent'
                          : 'bg-transparent text-foreground/80 hover:bg-surface-hover hover:text-foreground border-r-2 border-transparent'
                      }
                    `}
                  >
                    <span className={isActive ? 'text-accent' : 'text-muted'}>{comp.icon}</span>
                    {comp.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
