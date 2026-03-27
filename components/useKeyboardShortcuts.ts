import { useEffect } from 'react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function useKeyboardShortcuts() {
  const { undo, redo, past, future } = usePlaygroundStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        // If Shift is also pressed, it's Redo (Cmd+Shift+Z)
        if (e.shiftKey) {
          if (future.length > 0) redo();
        } else {
          if (past.length > 0) undo();
        }
        return;
      }

      // Redo: Ctrl+Y or Cmd+Y
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        if (future.length > 0) redo();
        return;
      }

      // Copy: Ctrl+C or Cmd+C (only if no text is selected)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (window.getSelection()?.toString()) {
          // User is explicitly copying selected text, let default behavior happen
          return;
        }
        e.preventDefault();
        document.getElementById('copy-code-btn')?.click();
        return;
      }

      // Save: Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        document.getElementById('save-btn')?.click();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, past, future]);
}
