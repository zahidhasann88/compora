import type { Styles, Variant } from '@/store/usePlaygroundStore';

// ── Map raw pixel/hex values to closest Tailwind utility classes ──

function mapBgColor(hex: string): string {
  const map: Record<string, string> = {
    '#6366f1': 'bg-indigo-500',
    '#3b82f6': 'bg-blue-500',
    '#8b5cf6': 'bg-violet-500',
    '#ec4899': 'bg-pink-500',
    '#ef4444': 'bg-red-500',
    '#f97316': 'bg-orange-500',
    '#eab308': 'bg-yellow-500',
    '#22c55e': 'bg-green-500',
    '#14b8a6': 'bg-teal-500',
    '#06b6d4': 'bg-cyan-500',
    '#000000': 'bg-black',
    '#ffffff': 'bg-white',
    'transparent': 'bg-transparent',
  };
  return map[hex.toLowerCase()] || `bg-[${hex}]`;
}

function mapTextColor(hex: string): string {
  const map: Record<string, string> = {
    '#ffffff': 'text-white',
    '#000000': 'text-black',
    '#6366f1': 'text-indigo-500',
    '#3b82f6': 'text-blue-500',
    '#8b5cf6': 'text-violet-500',
    '#ec4899': 'text-pink-500',
    '#ef4444': 'text-red-500',
    '#f97316': 'text-orange-500',
    '#eab308': 'text-yellow-500',
    '#22c55e': 'text-green-500',
    '#14b8a6': 'text-teal-500',
    '#06b6d4': 'text-cyan-500',
  };
  return map[hex.toLowerCase()] || `text-[${hex}]`;
}

function mapPadding(px: string): string {
  const val = Number(px);
  const map: Record<number, string> = {
    4: 'p-1', 8: 'p-2', 10: 'p-2.5', 12: 'p-3', 14: 'p-3.5',
    16: 'p-4', 20: 'p-5', 24: 'p-6', 28: 'p-7', 32: 'p-8',
    36: 'p-9', 40: 'p-10', 44: 'p-11', 48: 'p-12',
  };
  return map[val] || `p-[${val}px]`;
}

function mapPaddingXY(value: string): string {
  const val = Number(value);
  const pyMap: Record<number, string> = {
    4: 'py-1', 8: 'py-2', 10: 'py-2.5', 12: 'py-3', 14: 'py-3.5',
    16: 'py-4', 20: 'py-5', 24: 'py-6', 28: 'py-7', 32: 'py-8',
    36: 'py-9', 40: 'py-10', 44: 'py-11', 48: 'py-12',
  };
  const pxVal = val * 2;
  const pxMap: Record<number, string> = {
    8: 'px-2', 16: 'px-4', 20: 'px-5', 24: 'px-6', 28: 'px-7',
    32: 'px-8', 40: 'px-10', 48: 'px-12', 56: 'px-14', 64: 'px-16',
    72: 'px-18', 80: 'px-20', 88: 'px-22', 96: 'px-24',
  };
  const py = pyMap[val] || `py-[${val}px]`;
  const pxClass = pxMap[pxVal] || `px-[${pxVal}px]`;
  return `${pxClass} ${py}`;
}

function mapBorderRadius(value: string): string {
  const val = Number(value);
  if (val === 0) return 'rounded-none';
  if (val <= 2) return 'rounded-sm';
  if (val <= 4) return 'rounded';
  if (val <= 6) return 'rounded-md';
  if (val <= 8) return 'rounded-lg';
  if (val <= 12) return 'rounded-xl';
  if (val <= 16) return 'rounded-2xl';
  if (val <= 24) return 'rounded-3xl';
  if (val >= 50) return 'rounded-full';
  return `rounded-[${val}px]`;
}

function mapFontSize(px: string): string {
  const val = Number(px);
  const map: Record<number, string> = {
    10: 'text-[10px]', 12: 'text-xs', 14: 'text-sm', 16: 'text-base',
    18: 'text-lg', 20: 'text-xl', 24: 'text-2xl', 28: 'text-[28px]',
    30: 'text-3xl', 32: 'text-[32px]',
  };
  return map[val] || `text-[${val}px]`;
}

function mapBorderColor(hex: string): string {
  const map: Record<string, string> = {
    '#6366f1': 'border-indigo-500',
    '#3b82f6': 'border-blue-500',
    '#8b5cf6': 'border-violet-500',
    '#ec4899': 'border-pink-500',
    '#ef4444': 'border-red-500',
    '#f97316': 'border-orange-500',
    '#eab308': 'border-yellow-500',
    '#22c55e': 'border-green-500',
    '#14b8a6': 'border-teal-500',
    '#06b6d4': 'border-cyan-500',
  };
  return map[hex.toLowerCase()] || `border-[${hex}]`;
}

// ── Code generators ──

export function generateButtonCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPaddingXY(styles.padding);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${mapBgColor(styles.bgColor)} ${mapTextColor(styles.textColor)} ${padding} ${radius} ${fontSize} font-semibold transition-colors hover:opacity-90`;
      break;
    case 'secondary':
      classes = `${mapBgColor(styles.bgColor)}/20 ${mapTextColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold transition-colors hover:opacity-80`;
      break;
    case 'outline':
      classes = `bg-transparent ${mapTextColor(styles.bgColor)} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold transition-colors hover:${mapBgColor(styles.bgColor).replace('bg-', 'bg-')}/10`;
      break;
  }

  return `<button\n  className="${classes}"\n>\n  Click me\n</button>`;
}

export function generateCardCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize}`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize}`;
      break;
    case 'outline':
      classes = `bg-transparent ${textColor} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize}`;
      break;
  }

  const descClass = isWhiteText ? 'text-slate-600 dark:text-slate-400' : 'opacity-80';

  return `<div className="${classes}">
  <h3 className="mb-2 font-semibold">
    Card Title
  </h3>
  <p className="${descClass}">
    This is a description for the card component.
  </p>
</div>`;
}

export function generateInputCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/30 outline-none w-full focus:${mapBorderColor(styles.bgColor)} transition-colors`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/20 outline-none w-full focus:${mapBorderColor(styles.bgColor)} transition-colors`;
      break;
    case 'outline':
      classes = `bg-transparent ${textColor} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} outline-none w-full transition-colors focus:${mapBorderColor(styles.bgColor)}`;
      break;
  }

  return `<input\n  type="text"\n  placeholder="Type something..."\n  className="${classes}"\n/>`;
}

export function generateBadgeCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  // Default to a smaller font for badge if not huge
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPaddingXY(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${mapBgColor(styles.bgColor)} ${mapTextColor(styles.textColor)} ${padding} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center transition-colors`;
      break;
    case 'secondary':
      classes = `${mapBgColor(styles.bgColor)}/20 ${mapTextColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center transition-colors`;
      break;
    case 'outline':
      classes = `bg-transparent ${mapTextColor(styles.bgColor)} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center transition-colors`;
      break;
  }

  return `<span className="${classes}">\n  Badge\n</span>`;
}

export function generateAvatarCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${mapBgColor(styles.bgColor)} ${mapTextColor(styles.textColor)} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center w-12 h-12 uppercase shrink-0 transition-colors`;
      break;
    case 'secondary':
      classes = `${mapBgColor(styles.bgColor)}/20 ${mapTextColor(styles.bgColor)} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center w-12 h-12 uppercase shrink-0 transition-colors`;
      break;
    case 'outline':
      classes = `bg-transparent ${mapTextColor(styles.bgColor)} border-2 ${mapBorderColor(styles.bgColor)} ${radius} ${fontSize} font-semibold inline-flex items-center justify-center w-12 h-12 uppercase shrink-0 transition-colors`;
      break;
  }

  return `<div className="${classes}">\n  AB\n</div>`;
}

export function generateSelectCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/30 outline-none w-full appearance-none focus:${mapBorderColor(styles.bgColor)} transition-colors`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} border ${mapBorderColor(styles.bgColor)}/20 outline-none w-full appearance-none focus:${mapBorderColor(styles.bgColor)} transition-colors`;
      break;
    case 'outline':
      classes = `bg-transparent ${textColor} border-2 ${mapBorderColor(styles.bgColor)} ${padding} ${radius} ${fontSize} outline-none appearance-none w-full transition-colors focus:${mapBorderColor(styles.bgColor)}`;
      break;
  }

  // Adding a custom dropdown arrow with a background image would be too long, using an icon wrapper in JSX is common
  return `<div className="relative w-full">
  <select className="${classes}">
    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Option 1</option>
    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Option 2</option>
    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Option 3</option>
  </select>
  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-50">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </div>
</div>`;
}

export function generateCheckboxCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);
  const activeBg = mapBgColor(styles.bgColor);
  const activeBorder = mapBorderColor(styles.bgColor);

  return `<label className="flex items-center gap-3 cursor-pointer group">
  <div className="relative flex items-center justify-center">
    <input 
      type="checkbox" 
      className="peer appearance-none w-6 h-6 border-2 ${activeBorder} ${radius} checked:${activeBg} bg-transparent transition-all outline-none" 
    />
    <svg 
      className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
  <span className="${textColor} font-medium select-none">
    Accept Terms & Conditions
  </span>
</label>`;
}

export function generateAlertCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const fontSize = mapFontSize(styles.fontSize);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `dark:${mapBgColor(styles.bgColor)}/10 ${mapBgColor(styles.bgColor)}/10 ${textColor} ${padding} ${radius} ${fontSize} flex gap-4 w-full`;
      break;
    case 'secondary':
      classes = `dark:${mapBgColor(styles.bgColor)}/5 ${mapBgColor(styles.bgColor)}/5 ${textColor} ${padding} ${radius} ${fontSize} flex gap-4 w-full`;
      break;
    case 'outline':
      classes = `bg-transparent border-2 ${mapBorderColor(styles.bgColor)} ${textColor} ${padding} ${radius} ${fontSize} flex gap-4 w-full`;
      break;
  }

  const descClass = isWhiteText ? 'text-slate-600 dark:text-slate-400' : 'opacity-80';

  return `<div className="${classes}" role="alert">
  <div className="shrink-0 mt-0.5">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  </div>
  <div className="flex-1">
    <h4 className="font-semibold mb-1">
      Information Update
    </h4>
    <p className="${descClass}">
      Please review the new features we added to the dashboard.
    </p>
  </div>
</div>`;
}

export function generateModalCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const padding = mapPadding(styles.padding);
  
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);
  const activeBg = mapBgColor(styles.bgColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `bg-white dark:bg-slate-950 ${textColor} ${padding} ${radius}`;
      break;
    case 'secondary':
      classes = `bg-slate-50 dark:bg-slate-900 ${textColor} ${padding} ${radius}`;
      break;
    case 'outline':
      classes = `bg-white dark:bg-slate-950 border-2 ${mapBorderColor(styles.bgColor)} ${textColor} ${padding} ${radius}`;
      break;
  }

  return `<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
  <div className="${classes} w-full max-w-md shadow-xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Modal Title</h3>
      <button className="opacity-50 hover:opacity-100 transition-opacity text-xl leading-none">&times;</button>
    </div>
    <p className="opacity-80 mb-6 text-sm">This is the modal body content. You can place forms or information here.</p>
    <div className="flex justify-end gap-3">
      <button className="px-4 py-2 rounded-md font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
      <button className="px-4 py-2 ${activeBg} text-white rounded-md font-medium text-sm hover:opacity-90 transition-opacity">Confirm</button>
    </div>
  </div>
</div>`;
}

export function generateTabsCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const activeBg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  return `<div className="w-full max-w-md">
  <div className="flex p-1 gap-1 bg-slate-100 dark:bg-slate-800/50 ${radius}">
    <button className="flex-1 py-1.5 px-3 ${activeBg} text-white shadow-sm ${radius} font-medium text-sm transition-all">Account</button>
    <button className="flex-1 py-1.5 px-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all rounded-md">Password</button>
    <button className="flex-1 py-1.5 px-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all rounded-md">Settings</button>
  </div>
  <div className="p-4 mt-2 ${textColor}">
    <h3 className="font-semibold mb-1">Account Info</h3>
    <p className="text-sm opacity-80">Make changes to your account here.</p>
  </div>
</div>`;
}

export function generateNavbarCode(styles: Styles, variant: Variant): string {
  const padding = mapPaddingXY(styles.padding);
  const activeBg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);
  const radius = mapBorderRadius(styles.borderRadius);
  
  return `<nav className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="flex h-14 items-center ${padding} w-full max-w-7xl mx-auto">
    <div className="mr-4 hidden md:flex">
      <a className="mr-6 flex items-center space-x-2" href="#">
        <div className="w-6 h-6 rounded-full ${activeBg}"></div>
        <span className="hidden font-bold sm:inline-block ${textColor}">Brand</span>
      </a>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <a className="transition-colors hover:text-foreground/80 ${textColor}" href="#">Products</a>
        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#">Pricing</a>
        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#">About</a>
      </nav>
    </div>
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full md:w-40 lg:w-64 text-sm text-muted-foreground justify-start">
           Search...
        </button>
      </div>
      <button className="inline-flex items-center justify-center ${radius} ${activeBg} text-white h-9 px-4 py-2 font-medium hover:opacity-90 text-sm">Sign In</button>
    </div>
  </div>
</nav>`;
}

export function generateToastCode(styles: Styles, variant: Variant): string {
  const radius = mapBorderRadius(styles.borderRadius);
  const padding = mapPadding(styles.padding);
  const bg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);

  let classes: string;
  switch (variant) {
    case 'primary':
      classes = `${bg} text-white`;
      break;
    case 'secondary':
      classes = `bg-white dark:bg-slate-900 border ${mapBorderColor(styles.bgColor)} ${textColor}`;
      break;
    case 'outline':
      classes = `bg-transparent border-2 ${mapBorderColor(styles.bgColor)} ${textColor}`;
      break;
  }

  return `<div className="fixed bottom-4 right-4 ${classes} ${padding} ${radius} shadow-lg flex items-center gap-3 min-w-[300px] animate-in slide-in-from-bottom-5 z-50">
  <svg className="w-5 h-5 opacity-80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <div className="flex-1">
    <h3 className="font-semibold text-sm">Update available</h3>
    <p className="text-sm opacity-90">A new software version is ready.</p>
  </div>
  <button className="opacity-70 hover:opacity-100 transition-opacity shrink-0">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>`;
}

export function generateCode(
  component: string,
  styles: Styles,
  variant: Variant
): string {
  switch (component) {
    case 'button':
      return generateButtonCode(styles, variant);
    case 'card':
      return generateCardCode(styles, variant);
    case 'input':
      return generateInputCode(styles, variant);
    case 'badge':
      return generateBadgeCode(styles, variant);
    case 'avatar':
      return generateAvatarCode(styles, variant);
    case 'select':
      return generateSelectCode(styles, variant);
    case 'checkbox':
      return generateCheckboxCode(styles, variant);
    case 'alert':
      return generateAlertCode(styles, variant);
    case 'modal':
      return generateModalCode(styles, variant);
    case 'tabs':
      return generateTabsCode(styles, variant);
    case 'navbar':
      return generateNavbarCode(styles, variant);
    case 'toast':
      return generateToastCode(styles, variant);
    default:
      return '';
  }
}
