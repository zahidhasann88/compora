import type { Styles, Variant } from '@/store/usePlaygroundStore';

import { generateButtonCode } from './generators/components/button';
import { generateCardCode } from './generators/components/card';
import { generateInputCode } from './generators/components/input';
import { generateBadgeCode } from './generators/components/badge';
import { generateAvatarCode } from './generators/components/avatar';
import { generateSelectCode } from './generators/components/select';
import { generateCheckboxCode } from './generators/components/checkbox';
import { generateAlertCode } from './generators/components/alert';
import { generateModalCode } from './generators/components/modal';
import { generateTabsCode } from './generators/components/tabs';
import { generateNavbarCode } from './generators/components/navbar';
import { generateToastCode } from './generators/components/toast';
import { generateTableCode } from './generators/components/table';
import { generateDropdownCode } from './generators/components/dropdown';
import { generateCommandCode } from './generators/components/command';
import { generateDatepickerCode } from './generators/components/datepicker';

export function generateCode(
  component: string,
  styles: Styles,
  variant: Variant,
  props: Record<string, any> = {}
): string {
  switch (component) {
    case 'button':
      return generateButtonCode(styles, variant, props);
    case 'card':
      return generateCardCode(styles, variant, props);
    case 'input':
      return generateInputCode(styles, variant, props);
    case 'badge':
      return generateBadgeCode(styles, variant, props);
    case 'avatar':
      return generateAvatarCode(styles, variant); // props ignored for now
    case 'select':
      return generateSelectCode(styles, variant);
    case 'checkbox':
      return generateCheckboxCode(styles, variant);
    case 'alert':
      return generateAlertCode(styles, variant);
    case 'modal':
      return generateModalCode(styles, variant, props);
    case 'tabs':
      return generateTabsCode(styles, variant);
    case 'navbar':
      return generateNavbarCode(styles, variant, props);
    case 'toast':
      return generateToastCode(styles, variant);
    case 'table':
      return generateTableCode(styles, variant, props);
    case 'dropdown':
      return generateDropdownCode(styles, variant);
    case 'command':
      return generateCommandCode(styles, variant);
    case 'datepicker':
      return generateDatepickerCode(styles, variant);
    default:
      return '';
  }
}
