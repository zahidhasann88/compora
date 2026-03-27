import React, { useState } from 'react';
import { usePlaygroundStore, type ComponentType } from '@/store/usePlaygroundStore';
import { 
  SquareTerminal, 
  LayoutTemplate, 
  MessageSquare, 
  MousePointerClick,
  ChevronDown,
  ChevronRight,
  RectangleHorizontal,
  TextCursorInput,
  List,
  CheckSquare,
  CreditCard,
  Tag,
  User,
  Table,
  AlertCircle,
  AppWindow,
  Layout,
  Navigation,
  MoreHorizontal,
  Command,
  CalendarDays,
  Search,
  X
} from 'lucide-react';

const categories = [
  {
    id: 'inputs',
    label: 'Basic Inputs',
    icon: SquareTerminal,
    components: [
      { id: 'button', label: 'Button', icon: RectangleHorizontal },
      { id: 'input', label: 'Input', icon: TextCursorInput },
      { id: 'select', label: 'Select', icon: List },
      { id: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    ] as const,
  },
  {
    id: 'display',
    label: 'Data Display',
    icon: LayoutTemplate,
    components: [
      { id: 'card', label: 'Card', icon: CreditCard },
      { id: 'badge', label: 'Badge', icon: Tag },
      { id: 'avatar', label: 'Avatar', icon: User },
      { id: 'table', label: 'Table', icon: Table },
    ] as const,
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: MessageSquare,
    components: [
      { id: 'alert', label: 'Alert', icon: AlertCircle },
      { id: 'modal', label: 'Modal', icon: AppWindow },
      { id: 'toast', label: 'Toast', icon: MessageSquare },
    ] as const,
  },
  {
    id: 'navigation',
    label: 'Navigation & Actions',
    icon: MousePointerClick,
    components: [
      { id: 'tabs', label: 'Tabs', icon: Layout },
      { id: 'navbar', label: 'Navbar', icon: Navigation },
      { id: 'dropdown', label: 'Dropdown', icon: MoreHorizontal },
      { id: 'command', label: 'Command Palette', icon: Command },
      { id: 'datepicker', label: 'Date Picker', icon: CalendarDays },
    ] as const,
  },
];

export default function ComponentSelector() {
  const { selectedComponent, setComponent } = usePlaygroundStore();
  
  const [searchQuery, setSearchQuery] = useState('');

  // Start with only the category containing the active component expanded
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const activeCategory = categories.find(cat => 
      cat.components.some(comp => comp.id === selectedComponent)
    );
    return activeCategory ? { [activeCategory.id]: true } : {};
  });

  const filteredCategories = React.useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const lowerQuery = searchQuery.toLowerCase();
    return categories.map(cat => ({
      ...cat,
      components: cat.components.filter(comp => comp.label.toLowerCase().includes(lowerQuery))
    })).filter(cat => cat.components.length > 0);
  }, [searchQuery]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="py-5 flex flex-col h-full w-full bg-surface/30">
      <div className="px-5 mb-4 flex flex-col gap-3 flex-shrink-0">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Explorer
        </h2>
        
        {/* Search Input */}
        <div className="relative group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-hover/50 text-foreground text-sm rounded-lg pl-9 pr-8 py-2 border border-border outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 focus:bg-surface transition-all placeholder:text-muted/60"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-foreground bg-transparent border-none cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 w-full space-y-1 overflow-y-auto">
        {filteredCategories.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted/70 text-sm">
            No components found for "{searchQuery}"
          </div>
        ) : (
          filteredCategories.map((category) => {
            // When searching, force open all categories
            const isOpen = searchQuery ? true : openCategories[category.id];
          
          return (
            <div key={category.id} className="mb-4">
              {/* Category Header */}
              <button 
                onClick={() => toggleCategory(category.id)}
                className="w-full px-5 mb-1.5 flex items-center justify-between text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <category.icon size={14} />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest">{category.label}</h3>
                </div>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              
              {/* Category Items */}
              {isOpen && (
                <div className="space-y-0.5">
                  {category.components.map((comp) => {
                    const isActive = selectedComponent === comp.id;
                    const CompIcon = comp.icon;
                    return (
                      <button
                        key={comp.id}
                        id={`selector-${comp.id}`}
                        onClick={() => setComponent(comp.id as ComponentType)}
                        className={`
                          flex items-center w-full px-5 py-1.5 text-[13px] font-medium
                          transition-colors cursor-pointer text-left focus:outline-none flex gap-3
                          ${
                            isActive
                              ? 'bg-accent/10 border-l-2 border-accent text-accent'
                              : 'border-l-2 border-transparent text-muted hover:text-foreground hover:bg-surface-hover'
                          }
                        `}
                      >
                        <span className="w-2" /> {/* indent */}
                        <span className={isActive ? 'text-accent' : 'text-muted/70'}><CompIcon size={14} /></span>
                        {comp.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }))}
      </nav>
    </div>
  );
}
