import { usePlaygroundStore, type Styles } from '@/store/usePlaygroundStore';
import { CSSProperties, useState, useRef, useEffect, useMemo } from 'react';
import { Loader2, Search, Filter, Tag, User, Globe, Calendar, Flag, ChevronDown, ChevronsUpDown, ArrowDown, X, Check } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string; style?: CSSProperties }>> = {
  search: Search, filter: Filter, tag: Tag, user: User,
  globe: Globe, calendar: Calendar, flag: Flag,
};

const chevronMap: Record<string, React.FC<{ className?: string; style?: CSSProperties }>> = {
  chevronDown: ChevronDown,
  chevronsUpDown: ChevronsUpDown,
  arrowDown: ArrowDown,
};

function getTriggerStyles(styles: Styles, props: Record<string, any>, isFocused: boolean): CSSProperties {
  const variant = props.selectVariant || 'outlined';
  const radius = Number(styles.borderRadius) || 8;
  const borderW = Number(styles.borderWidth) || 1;
  const focusColor = props.focusRingColor || '#6366f1';
  const width = styles.width === 'auto' ? '320px' : `${styles.width}px`;

  const base: CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width, maxWidth: '100%',
    padding: `${styles.padding}px`,
    fontSize: `${styles.fontSize}px`,
    fontWeight: props.selectFontWeight || '400',
    textAlign: (props.textAlign || 'left') as any,
    color: styles.textColor,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    outline: 'none',
    minHeight: styles.height !== 'auto' ? `${styles.height}px` : undefined,
    gap: '8px',
  };

  // For underline/filled, ensure the base border color is visible on dark backgrounds
  const baseBorderColor = styles.borderColor || '#6366f1';
  const borderColor = props.errorState ? '#ef4444' : isFocused ? focusColor : baseBorderColor;
  // Use a lightened version for underline/filled so it's always visible
  const underlineBorderColor = props.errorState ? '#ef4444' : isFocused ? focusColor : (baseBorderColor + 'aa');

  switch (variant) {
    case 'outlined':
      return { ...base, backgroundColor: (styles.bgColor || '#6366f1') + '0d', borderRadius: `${radius}px`, border: `${Math.max(borderW, 1)}px solid ${borderColor}`, boxShadow: isFocused ? `0 0 0 3px ${focusColor}25` : 'none' };
    case 'filled':
      return { ...base, backgroundColor: (styles.bgColor || '#6366f1') + '1a', borderRadius: `${radius}px`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: `${Math.max(borderW, 2)}px solid ${underlineBorderColor}` };
    case 'underline':
      return { ...base, backgroundColor: 'transparent', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: `${Math.max(borderW, 2)}px solid ${underlineBorderColor}` };
    case 'unstyled':
      return { ...base, backgroundColor: 'transparent', border: 'none', borderRadius: 0 };
    default:
      return base;
  }
}

export function SelectPreview() {
  const { styles, componentProps } = usePlaygroundStore();
  const props = componentProps['select'] || {};
  const [isOpen, setIsOpen] = useState(props.openByDefault || false);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const options: { label: string; value: string }[] = props.options || [];
  const isMulti = props.selectType === 'multi';
  const isSearchable = props.selectType === 'searchable' || props.selectType === 'creatable';
  const isCreatable = props.selectType === 'creatable';
  const isDisabled = props.disabled;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setIsOpen(props.openByDefault || false); }, [props.openByDefault]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((o: any) => o.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [options, searchQuery]);

  const handleSelect = (value: string) => {
    if (isDisabled || props.readOnly) return;
    if (isMulti) {
      if (selected.includes(value)) {
        setSelected(selected.filter(v => v !== value));
      } else {
        if (props.maxSelectable > 0 && selected.length >= props.maxSelectable) return;
        setSelected([...selected, value]);
      }
    } else {
      setSelected([value]);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const handleCreate = () => {
    if (!searchQuery.trim()) return;
    handleSelect(searchQuery.trim());
    setSearchQuery('');
  };

  const removeTag = (value: string) => {
    setSelected(selected.filter(v => v !== value));
  };

  const getDisplayText = () => {
    if (selected.length === 0) return null;
    if (isMulti && props.showTags !== false) return null; // tags rendered separately
    if (isMulti) return `${selected.length} selected`;
    const opt = options.find((o: any) => o.value === selected[0]);
    return opt ? opt.label : selected[0];
  };

  const displayText = getDisplayText();
  const showTags = isMulti && props.showTags !== false && selected.length > 0;

  const ChevronIcon = chevronMap[props.chevronIcon || 'chevronDown'] || ChevronDown;
  const LeftIcon = (props.leftIcon && props.leftIcon !== 'none') ? iconMap[props.leftIcon] : null;

  const radius = Number(styles.borderRadius) || 8;
  const containerWidth = styles.width === 'auto' ? '320px' : `${styles.width}px`;

  return (
    <div className="animate-fade-in flex flex-col gap-1.5" style={{ width: containerWidth, maxWidth: '100%' }} ref={containerRef}>
      {/* Label */}
      {props.label && (
        <label style={{ fontSize: `${Math.max(Number(styles.fontSize) - 2, 11)}px`, fontWeight: 500, color: props.labelColor || '#e4e4e7' }}>
          {props.label}
          {props.required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => { if (!isDisabled && !props.readOnly) setIsOpen(!isOpen); }}
        style={{ ...getTriggerStyles(styles, props, isOpen), opacity: isDisabled ? 0.5 : 1, flexWrap: showTags ? 'wrap' : 'nowrap' }}
        aria-label={props.ariaLabel || undefined}
        aria-describedby={props.ariaDescribedBy || undefined}
        tabIndex={props.tabIndex ?? 0}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0, flexWrap: showTags ? 'wrap' : 'nowrap' }}>
          {LeftIcon && <span style={{ display: 'flex', color: 'var(--muted)', flexShrink: 0 }}><LeftIcon className="w-4 h-4" /></span>}

          {/* Tags */}
          {showTags && selected.map(val => {
            const opt = options.find((o: any) => o.value === val);
            return (
              <span key={val} style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '2px 8px', borderRadius: '9999px', fontSize: '11px',
                backgroundColor: (props.tagColor || '#6366f1') + '33', color: props.tagColor || '#6366f1',
              }}>
                {opt ? opt.label : val}
                <X className="w-3 h-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeTag(val); }} />
              </span>
            );
          })}

          {/* Display text or placeholder */}
          {!showTags && (
            <span style={{
              flex: 1, textAlign: (props.textAlign || 'left') as any, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              color: displayText ? styles.textColor : (props.placeholderColor || '#71717a'),
            }}>
              {displayText || props.placeholder || 'Select an option...'}
            </span>
          )}
          {showTags && selected.length === 0 && (
            <span style={{ color: props.placeholderColor || '#71717a' }}>{props.placeholder || 'Select an option...'}</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          {props.loading && <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--muted)' }} />}
          {props.clearButton && selected.length > 0 && !props.loading && (
            <span onClick={(e) => { e.stopPropagation(); setSelected([]); setSearchQuery(''); }} style={{ display: 'flex', cursor: 'pointer', color: 'var(--muted)' }}>
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronIcon className="w-4 h-4" style={{
            color: 'var(--muted)', transition: props.chevronAnimate !== false ? 'transform 0.2s ease' : 'none',
            transform: isOpen && props.chevronAnimate !== false ? 'rotate(180deg)' : 'rotate(0deg)',
          }} />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div style={{
          backgroundColor: props.dropdownBg || '#1e1e2e',
          border: `1px solid ${styles.borderColor || '#6366f1'}33`,
          borderRadius: `${radius}px`,
          maxHeight: `${props.dropdownMaxHeight || 300}px`,
          overflowY: 'auto',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          marginTop: '4px',
          zIndex: 50,
        }}>
          {/* Search Input */}
          {isSearchable && (
            <div style={{ padding: '8px', borderBottom: `1px solid ${styles.borderColor || '#6366f1'}22` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: `${Math.max(radius - 2, 4)}px`, border: '1px solid rgba(255,255,255,0.1)' }}>
                <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={props.searchPlaceholder || 'Search...'}
                  style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: styles.textColor, fontSize: '13px', fontFamily: 'inherit' }}
                  className="placeholder:text-muted/50"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Options */}
          <div style={{ padding: '4px' }}>
            {filteredOptions.length === 0 && (
              <div style={{ padding: `${props.optionPadding || 8}px`, fontSize: `${props.optionFontSize || 14}px`, color: 'var(--muted)', textAlign: 'center' }}>
                {props.noResultsText || 'No options found'}
              </div>
            )}
            {filteredOptions.map((opt: any) => {
              const isSelected = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', textAlign: (props.textAlign || 'left') as any,
                    padding: `${props.optionPadding || 8}px`,
                    fontSize: `${props.optionFontSize || 14}px`,
                    borderRadius: `${Math.max(radius - 4, 4)}px`,
                    backgroundColor: isSelected ? (props.selectedOptionBg || '#6366f1') : 'transparent',
                    color: isSelected ? (props.selectedOptionText || '#ffffff') : styles.textColor,
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = props.optionHoverBg || '#2a2a3e'; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4" style={{ flexShrink: 0 }} />}
                </button>
              );
            })}

            {/* Creatable option */}
            {isCreatable && searchQuery.trim() && !filteredOptions.some((o: any) => o.label.toLowerCase() === searchQuery.toLowerCase()) && (
              <button
                type="button"
                onClick={handleCreate}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  width: '100%', textAlign: 'left',
                  padding: `${props.optionPadding || 8}px`,
                  fontSize: `${props.optionFontSize || 14}px`,
                  borderRadius: `${Math.max(radius - 4, 4)}px`,
                  backgroundColor: 'transparent', color: props.focusRingColor || '#6366f1',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = props.optionHoverBg || '#2a2a3e'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span style={{ fontWeight: 500 }}>{props.createLabel || 'Create'}</span>
                <span>{`"${searchQuery}"`}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom: helper/error */}
      {(props.helperText || (props.errorState && props.errorMessage)) && (
        <div>
          {props.errorState && props.errorMessage && (
            <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>{props.errorMessage}</p>
          )}
          {!props.errorState && props.helperText && (
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>{props.helperText}</p>
          )}
        </div>
      )}
    </div>
  );
}
