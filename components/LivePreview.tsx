'use client';

import { usePlaygroundStore, type Device, type PreviewBg } from '@/store/usePlaygroundStore';
import { Smartphone, Tablet, Monitor, Grid, CheckSquare, Square, Moon, Sun } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import PreviewComponents from './PreviewComponents';

const devices: { id: Device; label: string; icon: React.ReactNode; width: string }[] = [
  { id: 'mobile', label: 'Mobile', icon: <Smartphone size={16} />, width: '375px' },
  { id: 'tablet', label: 'Tablet', icon: <Tablet size={16} />, width: '768px' },
  { id: 'desktop', label: 'Desktop', icon: <Monitor size={16} />, width: '100%' },
];

const backgrounds: { id: PreviewBg; label: string; icon: React.ReactNode; className: string }[] = [
  { id: 'dots', label: 'Dot Grid', icon: <Grid size={14} />, className: 'bg-surface dot-grid' },
  { id: 'checkered', label: 'Checkered', icon: <CheckSquare size={14} />, className: 'checkered-bg' },
  { id: 'surface', label: 'Theme Default', icon: <Square size={14} className="text-muted" />, className: 'bg-surface' },
  { id: 'white', label: 'Solid White', icon: <Sun size={14} />, className: 'bg-white' },
  { id: 'dark', label: 'Solid Dark', icon: <Moon size={14} />, className: 'bg-[#09090b]' },
];

export default function LivePreview() {
  const { device, setDevice, previewBg, setPreviewBg } = usePlaygroundStore();
  const currentDevice = devices.find((d) => d.id === device)!;
  const currentBg = backgrounds.find((b) => b.id === previewBg) || backgrounds[0];

  const [bgMenuOpen, setBgMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setBgMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center p-1 bg-surface/90 backdrop-blur-md border border-border shadow-sm rounded-lg z-20 gap-2">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-surface-hover/50 p-0.5 rounded-md border border-border/50">
          {devices.map((d) => (
            <button
              key={d.id}
              id={`device-${d.id}`}
              onClick={() => setDevice(d.id)}
              title={d.label}
              className={`
                flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 cursor-pointer
                ${device === d.id
                  ? 'bg-accent/15 text-accent shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-surface-hover'
                }
              `}
            >
              {d.icon}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-border mx-1"></div>

        {/* Background Switcher */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setBgMenuOpen(!bgMenuOpen)}
            title="Canvas Background"
            className="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 cursor-pointer text-muted hover:text-foreground hover:bg-surface-hover border border-transparent hover:border-border/50"
          >
            {currentBg.icon}
          </button>

          {bgMenuOpen && (
            <div className="absolute top-10 right-0 w-40 bg-surface border border-border rounded-lg shadow-xl shadow-black/10 p-1 z-30 animate-in fade-in slide-in-from-top-2 flex flex-col gap-0.5">
              <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">Background</div>
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    setPreviewBg(bg.id);
                    setBgMenuOpen(false);
                  }}
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 w-full text-left rounded-md text-xs font-medium cursor-pointer transition-colors
                    ${previewBg === bg.id
                      ? 'bg-accent/15 text-accent'
                      : 'text-foreground/80 hover:bg-surface-hover hover:text-foreground'
                    }
                  `}
                >
                  <div className={`w-4 h-4 rounded-sm border ${previewBg === bg.id ? 'border-accent/40' : 'border-border'} flex items-center justify-center`}>
                    {bg.icon}
                  </div>
                  {bg.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col items-center p-6 mt-12 overflow-y-auto w-full">
        <div
          className="transition-all duration-300 ease-out flex items-center mx-auto"
          style={{
            width: currentDevice.width,
            maxWidth: '100%',
          }}
        >
          {/* Inner Content Wrapper */}
          <div className={`relative w-full min-h-[400px] flex items-center justify-center overflow-x-hidden transition-colors duration-300 border border-border/50 shadow-sm ${currentBg.className}`}>
            <PreviewComponents />
          </div>
        </div>
      </div>
    </div>
  );
}
