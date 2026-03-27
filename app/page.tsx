'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import ComponentSelector from '@/components/ComponentSelector';
import ControlsPanel from '@/components/ControlsPanel';
import LivePreview from '@/components/LivePreview';
import CodePanel from '@/components/CodePanel';
import ThemeToggle from '@/components/ThemeToggle';
import ActionBar from '@/components/ActionBar';
import { Layers } from 'lucide-react';

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const { loadFromParams, loadFromLocalStorage } = usePlaygroundStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (searchParams.toString()) {
      loadFromParams(searchParams);
    } else {
      loadFromLocalStorage();
    }
    setReady(true);
  }, [searchParams, loadFromParams, loadFromLocalStorage]);

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="h-16 border-b border-border flex items-center px-6">
          <div className="skeleton h-6 w-48" />
        </div>
        <div className="flex-1 grid grid-cols-[220px_1fr_280px] gap-4 p-4">
          <div className="skeleton h-full" />
          <div className="skeleton h-full" />
          <div className="skeleton h-full" />
        </div>
        <div className="p-4 pt-0">
          <div className="skeleton h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* ── Header ── */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Layers size={20} className="text-accent" />
          </div>
          <div>
            <h1 className="text-sm font-bold gradient-text">Component Playground</h1>
            <p className="text-xs text-muted">Visual UI Builder</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ActionBar />
          <div className="w-px h-6 bg-border" />
          <ThemeToggle />
        </div>
      </header>

      {/* ── Main Content flex container ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Component Selector */}
        <aside className="w-full lg:w-[240px] flex-shrink-0 border-r border-border bg-surface/50 overflow-y-auto hidden lg:block">
          <ComponentSelector />
        </aside>

        {/* Center: Live Preview & Code Panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <main className="flex-1 min-h-0 relative dot-grid">
            <LivePreview />
          </main>
          
          {/* Bottom: Code Panel (Storybook Addons area) */}
          <div className="h-[280px] flex-shrink-0 border-t border-border bg-surface z-10 overflow-hidden">
            <CodePanel />
          </div>
        </div>

        {/* Right: Controls Panel */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 border-l border-border bg-surface/50 overflow-y-auto hidden lg:block">
          <ControlsPanel />
        </aside>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="skeleton h-8 w-48" />
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
