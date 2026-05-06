import React, { useState, useMemo } from 'react';
import { usePlaygroundStore, type ComponentType } from '@/store/usePlaygroundStore';
import {
  SquareTerminal,
  LayoutTemplate,
  MessageSquare,
  MousePointerClick,
  ChevronDown,
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
  X,
  Clock,
  Sparkles,
} from 'lucide-react';

type CompMeta = {
  id: ComponentType;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type Category = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  components: readonly CompMeta[];
};

const categories: readonly Category[] = [
  {
    id: 'inputs',
    label: 'Basic Inputs',
    icon: SquareTerminal,
    components: [
      { id: 'button', label: 'Button', icon: RectangleHorizontal },
      { id: 'input', label: 'Input', icon: TextCursorInput },
      { id: 'select', label: 'Select', icon: List },
      { id: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    ],
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
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: MessageSquare,
    components: [
      { id: 'alert', label: 'Alert', icon: AlertCircle },
      { id: 'modal', label: 'Modal', icon: AppWindow },
      { id: 'toast', label: 'Toast', icon: MessageSquare },
    ],
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
    ],
  },
] as const;

const componentLookup: Record<string, CompMeta> = {};
categories.forEach((cat) => cat.components.forEach((c) => (componentLookup[c.id] = c)));

const totalComponents = categories.reduce((sum, c) => sum + c.components.length, 0);

export default function ComponentSelector() {
  const { selectedComponent, setComponent, recentComponents } = usePlaygroundStore();

  const [searchQuery, setSearchQuery] = useState('');

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // Open all categories by default — feels more inviting than collapsed
    return categories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {});
  });

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    const lowerQuery = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        components: cat.components.filter((comp) => comp.label.toLowerCase().includes(lowerQuery)),
      }))
      .filter((cat) => cat.components.length > 0);
  }, [searchQuery]);

  const recentItems = useMemo(
    () =>
      recentComponents
        .filter((id) => id !== selectedComponent)
        .map((id) => componentLookup[id])
        .filter(Boolean)
        .slice(0, 4),
    [recentComponents, selectedComponent]
  );

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const renderComponentButton = (comp: CompMeta) => {
    const isActive = selectedComponent === comp.id;
    const CompIcon = comp.icon;
    return (
      <button
        key={comp.id}
        id={`selector-${comp.id}`}
        onClick={() => setComponent(comp.id)}
        className={`
          group relative flex items-center w-full pl-5 pr-3 py-2 text-[13px] font-medium
          transition-all duration-150 cursor-pointer text-left focus:outline-none gap-2.5
          ${
            isActive
              ? 'bg-gradient-to-r from-accent/15 via-accent/8 to-transparent text-foreground'
              : 'text-foreground/70 hover:text-foreground hover:bg-surface-hover/60'
          }
        `}
      >
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-200 ${
            isActive ? 'h-6 bg-accent' : 'h-0 bg-transparent group-hover:h-3 group-hover:bg-border'
          }`}
        />
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
            isActive
              ? 'bg-accent/15 text-accent'
              : 'bg-surface-hover/40 text-muted group-hover:bg-surface-hover group-hover:text-foreground/90'
          }`}
        >
          <CompIcon size={14} />
        </span>
        <span className="flex-1 truncate">{comp.label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-surface/30">
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-3 flex flex-col gap-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/90">
            Components
          </h2>
          <span className="count-chip">{totalComponents}</span>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors pointer-events-none"
          />
          <input
            id="component-search"
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-hover/40 text-foreground text-[13px] rounded-lg pl-9 pr-12 py-2 border border-border/70 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 focus:bg-surface transition-all placeholder:text-muted/60"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              title="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-foreground rounded-md hover:bg-surface-hover bg-transparent border-none cursor-pointer"
            >
              <X size={12} />
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="kbd absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              title="Press / to focus search"
            >
              /
            </span>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <nav className="flex-1 w-full overflow-y-auto pb-2">
        {/* Recent */}
        {!searchQuery && recentItems.length > 0 && (
          <div className="mb-4">
            <div className="px-5 mb-1.5 flex items-center gap-2 text-muted">
              <Clock size={12} />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.14em]">Recent</h3>
            </div>
            <div className="space-y-0.5">{recentItems.map(renderComponentButton)}</div>
          </div>
        )}

        {/* Categories */}
        {filteredCategories.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-hover/60 mb-3">
              <Search size={16} className="text-muted" />
            </div>
            <p className="text-[13px] text-foreground/80 font-medium">No matches</p>
            <p className="text-[11px] text-muted mt-0.5">
              Nothing for &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isOpen = searchQuery ? true : openCategories[category.id];
            const CatIcon = category.icon;

            return (
              <div key={category.id} className="mb-3">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-5 mb-1 flex items-center justify-between text-muted hover:text-foreground transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <CatIcon size={13} className="opacity-80" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.14em]">
                      {category.label}
                    </h3>
                    <span className="count-chip">{category.components.length}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 opacity-60 group-hover:opacity-100 ${
                      isOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="space-y-0.5 expand-down">
                    {category.components.map(renderComponentButton)}
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>

      {/* ── Footer hint ── */}
      <div className="flex-shrink-0 px-5 py-3 border-t border-border/60 bg-surface/40">
        <div className="flex items-center justify-between text-[10px] text-muted">
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-accent/80" />
            <span className="font-medium">Compora</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="kbd">/</span>
            <span>search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
