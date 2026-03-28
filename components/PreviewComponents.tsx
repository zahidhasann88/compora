'use client';

import { usePlaygroundStore } from '@/store/usePlaygroundStore';

import { ButtonPreview } from './previews/ButtonPreview';
import { CardPreview } from './previews/CardPreview';
import { InputPreview } from './previews/InputPreview';
import { BadgePreview } from './previews/BadgePreview';
import { AvatarPreview } from './previews/AvatarPreview';
import { SelectPreview } from './previews/SelectPreview';
import { CheckboxPreview } from './previews/CheckboxPreview';
import { AlertPreview } from './previews/AlertPreview';
import { ModalPreview } from './previews/ModalPreview';
import { TabsPreview } from './previews/TabsPreview';
import { NavbarPreview } from './previews/NavbarPreview';
import { ToastPreview } from './previews/ToastPreview';
import { TablePreview } from './previews/TablePreview';
import { DropdownPreview } from './previews/DropdownPreview';
import { CommandPreview } from './previews/CommandPreview';
import { DatepickerPreview } from './previews/DatepickerPreview';

export default function PreviewComponents() {
  const { selectedComponent } = usePlaygroundStore();

  return (
    <div className="flex items-center justify-center min-h-[200px] w-full p-2 md:p-4">
      {selectedComponent === 'button' && <ButtonPreview />}
      {selectedComponent === 'card' && <CardPreview />}
      {selectedComponent === 'input' && <InputPreview />}
      {selectedComponent === 'badge' && <BadgePreview />}
      {selectedComponent === 'avatar' && <AvatarPreview />}
      {selectedComponent === 'select' && <SelectPreview />}
      {selectedComponent === 'checkbox' && <CheckboxPreview />}
      {selectedComponent === 'alert' && <AlertPreview />}
      {selectedComponent === 'modal' && <ModalPreview />}
      {selectedComponent === 'tabs' && <TabsPreview />}
      {selectedComponent === 'navbar' && <NavbarPreview />}
      {selectedComponent === 'toast' && <ToastPreview />}
      {selectedComponent === 'table' && <TablePreview />}
      {selectedComponent === 'dropdown' && <DropdownPreview />}
      {selectedComponent === 'command' && <CommandPreview />}
      {selectedComponent === 'datepicker' && <DatepickerPreview />}
    </div>
  );
}
