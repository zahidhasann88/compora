'use client';

import { usePlaygroundStore, type Device } from '@/store/usePlaygroundStore';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import PreviewComponents from './PreviewComponents';

const devices: { id: Device; label: string; icon: React.ReactNode; width: string }[] = [
  { id: 'mobile', label: 'Mobile', icon: <Smartphone size={16} />, width: '375px' },
  { id: 'tablet', label: 'Tablet', icon: <Tablet size={16} />, width: '768px' },
  { id: 'desktop', label: 'Desktop', icon: <Monitor size={16} />, width: '100%' },
];

export default function LivePreview() {
  const { device, setDevice } = usePlaygroundStore();
  const currentDevice = devices.find((d) => d.id === device)!;

  return (
    <div className="glass-panel flex flex-col h-full overflow-hidden">
      {/* Device Switcher Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Preview
        </h2>
        <div className="flex gap-1 p-1 bg-background rounded-lg">
          {devices.map((d) => (
            <button
              key={d.id}
              id={`device-${d.id}`}
              onClick={() => setDevice(d.id)}
              title={d.label}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                transition-all duration-200 cursor-pointer
                ${
                  device === d.id
                    ? 'bg-accent text-white shadow-md'
                    : 'text-muted hover:text-foreground'
                }
              `}
            >
              {d.icon}
              <span className="hidden sm:inline">{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-6 dot-grid">
        <div
          className="transition-all duration-300 ease-out flex items-center justify-center min-h-[300px]"
          style={{
            width: currentDevice.width,
            maxWidth: '100%',
          }}
        >
          <div className="glass-panel glow-accent p-8 w-full flex items-center justify-center min-h-[250px]">
            <PreviewComponents />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted">
          {currentDevice.width === '100%' ? 'Full width' : currentDevice.width}
        </span>
        <span className="text-xs text-muted capitalize">{device}</span>
      </div>
    </div>
  );
}
