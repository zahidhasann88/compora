import type { Styles, Variant } from '@/store/usePlaygroundStore';
import { mapBorderRadius, mapPaddingXY, mapBgColor, mapTextColor } from '../tailwind';

export function generateNavbarCode(styles: Styles, variant: Variant, props: Record<string, any> = {}): string {
  const padding = mapPaddingXY(styles.padding);
  const activeBg = mapBgColor(styles.bgColor);
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';
  const textColor = isWhiteText ? 'text-slate-900 dark:text-white' : mapTextColor(styles.textColor);
  const radius = mapBorderRadius(styles.borderRadius);
  
  const stickyClass = props.sticky ? 'sticky top-0 z-50 ' : '';
  const bgClass = props.transparent 
    ? 'bg-transparent border-transparent' 
    : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60';
  const borderClass = props.transparent ? 'border-transparent' : 'border-border/40';

  let childrenContent = `<div className="mr-4 hidden md:flex">
      <a className="mr-6 flex items-center space-x-2" href="#">
        <div className="w-6 h-6 rounded-full \${activeBg}"></div>
        <span className="hidden font-bold sm:inline-block \${textColor}">Brand</span>
      </a>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <a className="transition-colors hover:text-foreground/80 \${textColor}" href="#">Products</a>
        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#">Pricing</a>
        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#">About</a>
      </nav>
    </div>`;

  if (props.mobileMenu) {
    childrenContent = `<button className="md:hidden mr-4 p-2 -ml-2 \${textColor}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>\\n    <a className="mr-6 flex items-center space-x-2 md:hidden" href="#">
      <div className="w-6 h-6 rounded-full \${activeBg}"></div>
      <span className="font-bold sm:inline-block \${textColor}">Brand</span>
    </a>\\n    ` + childrenContent;
  }

  return `<nav className="\${stickyClass}w-full border-b \${borderClass} \${bgClass}">
  <div className="flex h-14 items-center justify-between \${padding} w-full max-w-7xl mx-auto">
    <div className="flex items-center">
      \${childrenContent}
    </div>
    <div className="flex items-center space-x-2 md:justify-end">
      <div className="hidden md:flex w-full md:w-auto">
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full md:w-40 lg:w-64 text-sm text-muted-foreground justify-start">
           Search...
        </button>
      </div>
      <button className="inline-flex items-center justify-center \${radius} \${activeBg} text-white h-9 px-4 py-2 font-medium hover:opacity-90 text-sm">Sign In</button>
    </div>
  </div>
</nav>`;
}
