'use client';

import { useState, useCallback } from 'react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { Share2, Check, Save, Undo2, Redo2 } from 'lucide-react';

export default function ActionBar() {
  const { toQueryString, saveToLocalStorage, undo, redo, past, future } = usePlaygroundStore();
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}?${toQueryString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2000);
    });
  }, [toQueryString]);

  const handleSave = useCallback(() => {
    saveToLocalStorage();
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 2000);
  }, [saveToLocalStorage]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 bg-surface px-1 py-1 rounded-lg border border-border mr-2">
        <button
          onClick={undo}
          disabled={past.length === 0}
          title="Undo"
          className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-accent/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={redo}
          disabled={future.length === 0}
          title="Redo"
          className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-accent/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
        >
          <Redo2 size={16} />
        </button>
      </div>

      <button
        id="save-btn"
        onClick={handleSave}
        title="Save to browser"
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
          transition-all duration-200 cursor-pointer border
          ${
            saveState === 'saved'
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : 'bg-surface text-muted hover:text-foreground border-border hover:border-accent/30'
          }
        `}
      >
        {saveState === 'saved' ? <Check size={14} /> : <Save size={14} />}
        {saveState === 'saved' ? 'Saved!' : 'Save'}
      </button>

      <button
        id="share-btn"
        onClick={handleShare}
        title="Copy share link"
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
          transition-all duration-200 cursor-pointer border
          ${
            shareState === 'copied'
              ? 'bg-accent/15 text-accent border-accent/30'
              : 'bg-surface text-muted hover:text-foreground border-border hover:border-accent/30'
          }
        `}
      >
        {shareState === 'copied' ? <Check size={14} /> : <Share2 size={14} />}
        {shareState === 'copied' ? 'Copied!' : 'Share'}
      </button>
    </div>
  );
}
