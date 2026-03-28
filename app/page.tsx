'use client';

import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import ComponentSelector from '@/components/ComponentSelector';
import ControlsPanel from '@/components/ControlsPanel';
import LivePreview from '@/components/LivePreview';
import CodePanel from '@/components/CodePanel';
import ThemeToggle from '@/components/ThemeToggle';
import ActionBar from '@/components/ActionBar';
import { useKeyboardShortcuts } from '@/components/useKeyboardShortcuts';
import { Layers } from 'lucide-react';

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const { loadFromParams, loadFromLocalStorage } = usePlaygroundStore();

  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  const [ready, setReady] = useState(false);
  const [codePanelHeight, setCodePanelHeight] = useState(280);
  const [isLg, setIsLg] = useState(false);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  useEffect(() => {
    if (searchParams.toString()) {
      loadFromParams(searchParams);
    } else {
      loadFromLocalStorage();
    }
    setReady(true);
  }, [searchParams, loadFromParams, loadFromLocalStorage]);

  // Track screen size for conditional height
  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
    startHeight.current = codePanelHeight;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, [codePanelHeight]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = startY.current - e.clientY;
      const newHeight = Math.min(600, Math.max(100, startHeight.current + delta));
      setCodePanelHeight(newHeight);
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
    <div className="min-h-screen flex flex-col animate-fade-in h-screen overflow-hidden">
      {/* ── Header ── */}
      <header className="min-h-[64px] flex-shrink-0 border-b border-border flex flex-wrap items-center justify-between px-4 lg:px-6 py-3 gap-4 bg-surface/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Layers size={20} className="text-accent" />
          </div>
          <div>
            <h1 className="text-sm font-bold gradient-text whitespace-nowrap">Compora</h1>
            <p className="text-xs text-muted hidden sm:block">Visual UI Builder</p>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto pb-1 lg:pb-0 hide-scrollbar">
          <ActionBar />
          <div className="w-px h-6 bg-border mx-1" />
          <ThemeToggle />
        </div>
      </header>

      {/* ── Main Content flex container ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative">

        {/* Left: Component Selector */}
        <aside className="w-full lg:w-[240px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-surface/50 lg:overflow-y-auto">
          <ComponentSelector />
        </aside>

        {/* Center: Live Preview & Code Panel */}
        <div className="flex-1 flex flex-col min-w-0 lg:overflow-hidden relative">
          <main className="flex-1 min-h-[400px] lg:min-h-0 relative dot-grid flex flex-col overflow-hidden">
            <LivePreview />
          </main>

          {/* Drag Handle */}
          <div
            className="hidden lg:flex items-center justify-center flex-shrink-0 cursor-row-resize group z-20 select-none border-t border-border hover:border-accent/40 transition-colors"
            style={{ height: '8px' }}
            onMouseDown={handleMouseDown}
          >
            <div className="w-10 h-1 rounded-full bg-border group-hover:bg-accent/60 group-active:bg-accent transition-colors" />
          </div>

          {/* Bottom: Code Panel (Storybook Addons area) */}
          <div
            className="flex-shrink-0 bg-surface z-10 overflow-hidden"
            style={{ height: isLg ? `${codePanelHeight}px` : 'auto' }}
          >
            <CodePanel />
          </div>
        </div>

        {/* Right: Controls Panel */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 border-t lg:border-t-0 lg:border-l border-border bg-surface/50 lg:overflow-y-auto">
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
